import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

type ScanCandidate = {
  file: string;
  page: string;
  key: string;
  text: string;
};

const scanRoots = ["app", "components"];

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
        (entry.name.endsWith(".tsx") || entry.name.endsWith(".jsx"))
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
    .replace(/\s+/g, " ")
    .replace(/[{}"`]/g, "")
    .trim();
}

function hasVietnameseOrUsefulText(text: string) {
  const normalized = normalizeText(text);

  if (normalized.length < 4) return false;
  if (/^[0-9\s.,:%+-]+$/.test(normalized)) return false;

  const ignored = [
    "use client",
    "className",
    "href",
    "src",
    "alt",
    "type",
    "button",
    "submit",
    "return",
    "export default",
  ];

  if (ignored.some((item) => normalized.includes(item))) return false;

  return /[a-zA-ZÀ-ỹ]/.test(normalized);
}

function slugify(input: string) {
  return input
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/đ/g, "d")
    .replace(/[^a-z0-9]+/g, ".")
    .replace(/^\.+|\.+$/g, "")
    .split(".")
    .filter(Boolean)
    .slice(0, 5)
    .join(".");
}

function getPageFromFile(filePath: string) {
  const normalized = filePath.replace(/\\/g, "/");

  if (normalized.includes("/admin/")) return "admin";
  if (normalized.includes("/services")) return "services";
  if (normalized.includes("/case-studies")) return "caseStudies";
  if (normalized.includes("/contact")) return "contact";
  if (normalized.includes("/insights")) return "insights";
  if (normalized.includes("Hero")) return "home";
  if (normalized.includes("Footer")) return "footer";
  if (normalized.includes("Header")) return "nav";

  return "common";
}

function extractTextsFromTsx(content: string) {
  const results = new Set<string>();

  /**
   * Bắt text giữa JSX tags:
   * <h1>Nội dung</h1>
   */
  const jsxTextRegex = />\s*([^<>{}][^<>]*?)\s*</g;

  let jsxMatch;
  while ((jsxMatch = jsxTextRegex.exec(content)) !== null) {
    const text = normalizeText(jsxMatch[1]);

    if (hasVietnameseOrUsefulText(text)) {
      results.add(text);
    }
  }

  /**
   * Bắt text trong string:
   * title: "Nội dung"
   * label="Nội dung"
   */
  const stringRegex = /["'`]([^"'`{}<>]{4,})["'`]/g;

  let stringMatch;
  while ((stringMatch = stringRegex.exec(content)) !== null) {
    const text = normalizeText(stringMatch[1]);

    if (hasVietnameseOrUsefulText(text)) {
      results.add(text);
    }
  }

  return Array.from(results);
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

  try {
    const cwd = process.cwd();

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

    const candidates: ScanCandidate[] = [];

    for (const file of allFiles) {
      const relativeFile = path.relative(cwd, file).replace(/\\/g, "/");

      if (relativeFile.includes("app/admin")) continue;
      if (relativeFile.includes("components/providers")) continue;

      const page = getPageFromFile(relativeFile);

      if (selectedPage !== "all" && page !== selectedPage) {
        continue;
      }

      const content = await fs.readFile(file, "utf8");
      const texts = extractTextsFromTsx(content);

      texts.forEach((text, index) => {
        const textSlug = slugify(text) || `text.${index + 1}`;
        const key = `${page}.${textSlug}`;

        candidates.push({
          file: relativeFile,
          page,
          key,
          text,
        });
      });
    }

    return NextResponse.json({
      ok: true,
      count: candidates.length,
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