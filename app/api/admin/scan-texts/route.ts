import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

type ScanStatus = "missingBoth" | "missingVi" | "missingEn" | "complete";

type ScanCandidate = {
  file: string;
  page: string;
  key: string;
  text: string;
  fallback: string;
  source: "tr" | "hardcoded";
  vi: string;
  en: string;
  hasVi: boolean;
  hasEn: boolean;
  status: ScanStatus;
};

type Dictionary = {
  vi?: Record<string, unknown>;
  en?: Record<string, unknown>;
};

const scanRoots = ["app", "components"];
const dictionaryPath = path.join(process.cwd(), "data", "i18n.json");

function isProduction() {
  return process.env.NODE_ENV === "production" || process.env.VERCEL === "1";
}

async function walk(dir: string): Promise<string[]> {
  const entries = await fs.readdir(dir, { withFileTypes: true });

  const files = await Promise.all(
    entries.map(async (entry) => {
      const fullPath = path.join(dir, entry.name);

      if (entry.isDirectory()) {
        if (
          entry.name === "node_modules" ||
          entry.name === ".next" ||
          entry.name === ".git"
        ) {
          return [];
        }

        return walk(fullPath);
      }

      if (
        entry.isFile() &&
        (entry.name.endsWith(".tsx") || entry.name.endsWith(".ts"))
      ) {
        return [fullPath];
      }

      return [];
    })
  );

  return files.flat();
}

function normalizeText(text: string) {
  return text
    .replace(/\\n/g, "\n")
    .replace(/\\t/g, "\t")
    .replace(/\\"/g, '"')
    .replace(/\\'/g, "'")
    .replace(/\s+/g, " ")
    .trim();
}

function normalizeFallback(text: string) {
  return text
    .replace(/\\n/g, "\n")
    .replace(/\\t/g, "\t")
    .replace(/\\"/g, '"')
    .replace(/\\'/g, "'")
    .trim();
}

function hasUsefulText(text: string) {
  const normalized = normalizeText(text);

  if (normalized.length < 2) return false;
  if (/^[0-9\s.,:%+\-/]+$/.test(normalized)) return false;

  const ignored = [
    "use client",
    "className",
    "children",
    "ReactNode",
    "lucide-react",
    "next/image",
    "next/link",
    "next/navigation",
    "@/",
  ];

  if (ignored.some((item) => normalized.includes(item))) return false;

  return /[a-zA-ZÀ-ỹ]/.test(normalized);
}

function slugify(input: string) {
  return input
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/Đ/g, "d")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, ".")
    .replace(/^\.+|\.+$/g, "")
    .split(".")
    .filter(Boolean)
    .slice(0, 6)
    .join(".");
}

function getPageFromFile(filePath: string) {
  const normalized = filePath.replace(/\\/g, "/");

  if (normalized.includes("/admin/")) return "admin";
  if (normalized.includes("components/services") || normalized.includes("/services/")) {
    return "services";
  }
  if (
    normalized.includes("components/case-studies") ||
    normalized.includes("/case-studies/")
  ) {
    return "caseStudies";
  }
  if (normalized.includes("components/contact") || normalized.includes("/contact/")) {
    return "contact";
  }
  if (normalized.includes("components/home") || normalized.endsWith("app/page.tsx")) {
    return "home";
  }
  if (normalized.includes("Footer")) return "footer";
  if (normalized.includes("Header")) return "nav";
  if (normalized.includes("layout")) return "layout";

  return "common";
}

function getNestedValue(source: Record<string, unknown> | undefined, key: string) {
  if (!source) return "";

  const value = key.split(".").reduce<unknown>((current, part) => {
    if (current && typeof current === "object" && part in current) {
      return (current as Record<string, unknown>)[part];
    }

    return undefined;
  }, source);

  return typeof value === "string" ? value : "";
}

function getStatus(hasVi: boolean, hasEn: boolean): ScanStatus {
  if (!hasVi && !hasEn) return "missingBoth";
  if (!hasVi) return "missingVi";
  if (!hasEn) return "missingEn";
  return "complete";
}

function extractTrCalls(content: string) {
  const results: Array<{ key: string; fallback: string }> = [];

  const trRegex = /\btr\s*\(\s*(["'`])([^"'`]+)\1\s*,\s*(["'`])([\s\S]*?)\3/g;

  let match: RegExpExecArray | null;
  while ((match = trRegex.exec(content)) !== null) {
    const key = match[2].trim();
    const fallback = normalizeFallback(match[4]);

    if (key && hasUsefulText(fallback)) {
      results.push({ key, fallback });
    }
  }

  return results;
}

function stripTrCalls(content: string) {
  return content.replace(/\btr\s*\([\s\S]*?\)/g, "");
}

function extractHardcodedTexts(content: string) {
  const cleanedContent = stripTrCalls(content);
  const results = new Set<string>();

  const jsxTextRegex = />\s*([^<>{}][^<>]*?)\s*</g;

  let jsxMatch: RegExpExecArray | null;
  while ((jsxMatch = jsxTextRegex.exec(cleanedContent)) !== null) {
    const text = normalizeText(jsxMatch[1]);

    if (hasUsefulText(text)) {
      results.add(text);
    }
  }

  const attributeRegex = /(?:placeholder|aria-label|alt|title)=(["'])([^"']+)\1/g;

  let attributeMatch: RegExpExecArray | null;
  while ((attributeMatch = attributeRegex.exec(cleanedContent)) !== null) {
    const text = normalizeText(attributeMatch[2]);

    if (hasUsefulText(text)) {
      results.add(text);
    }
  }

  return Array.from(results);
}

async function readDictionary(): Promise<Dictionary> {
  try {
    const file = await fs.readFile(dictionaryPath, "utf8");
    return JSON.parse(file) as Dictionary;
  } catch {
    return { vi: {}, en: {} };
  }
}

export async function GET(request: Request) {
  if (isProduction()) {
    return NextResponse.json(
      {
        ok: false,
        message: "Scan text chỉ chạy ở local, không chạy trên Vercel.",
      },
      { status: 403 }
    );
  }

  const { searchParams } = new URL(request.url);
  const selectedPage = searchParams.get("page") || "all";
  const includeHardcoded = searchParams.get("includeHardcoded") === "1";

  try {
    const cwd = process.cwd();
    const dictionary = await readDictionary();

    const allFilesNested = await Promise.all(
      scanRoots.map(async (root) => {
        const rootPath = path.join(cwd, root);

        try {
          return await walk(rootPath);
        } catch {
          return [];
        }
      })
    );

    const allFiles = allFilesNested.flat();
    const candidatesMap = new Map<string, ScanCandidate>();

    for (const file of allFiles) {
      const relativeFile = path.relative(cwd, file).replace(/\\/g, "/");

      if (relativeFile.includes("app/admin")) continue;
      if (relativeFile.includes("app/api")) continue;
      if (relativeFile.includes("components/providers")) continue;

      const page = getPageFromFile(relativeFile);

      if (selectedPage !== "all" && page !== selectedPage) {
        continue;
      }

      const content = await fs.readFile(file, "utf8");
      const trCalls = extractTrCalls(content);

      trCalls.forEach((item) => {
        const vi = getNestedValue(dictionary.vi, item.key);
        const en = getNestedValue(dictionary.en, item.key);
        const hasVi = Boolean(vi.trim());
        const hasEn = Boolean(en.trim());

        candidatesMap.set(item.key, {
          file: relativeFile,
          page,
          key: item.key,
          text: item.fallback,
          fallback: item.fallback,
          source: "tr",
          vi,
          en,
          hasVi,
          hasEn,
          status: getStatus(hasVi, hasEn),
        });
      });

      if (includeHardcoded) {
        const hardcodedTexts = extractHardcodedTexts(content);

        hardcodedTexts.forEach((text, index) => {
          const slug = slugify(text) || `text.${index + 1}`;
          const key = `${page}.${slug}`;

          if (candidatesMap.has(key)) return;

          const vi = getNestedValue(dictionary.vi, key);
          const en = getNestedValue(dictionary.en, key);
          const hasVi = Boolean(vi.trim());
          const hasEn = Boolean(en.trim());

          candidatesMap.set(`${key}:${relativeFile}:${index}`, {
            file: relativeFile,
            page,
            key,
            text,
            fallback: text,
            source: "hardcoded",
            vi,
            en,
            hasVi,
            hasEn,
            status: getStatus(hasVi, hasEn),
          });
        });
      }
    }

    const candidates = Array.from(candidatesMap.values()).sort((a, b) =>
      a.key.localeCompare(b.key)
    );

    return NextResponse.json({
      ok: true,
      count: candidates.length,
      summary: {
        missingBoth: candidates.filter((item) => item.status === "missingBoth").length,
        missingVi: candidates.filter((item) => item.status === "missingVi").length,
        missingEn: candidates.filter((item) => item.status === "missingEn").length,
        complete: candidates.filter((item) => item.status === "complete").length,
      },
      candidates,
    });
  } catch (error) {
    return NextResponse.json(
      {
        ok: false,
        message: "Không scan được source code.",
      },
      { status: 500 }
    );
  }
}
