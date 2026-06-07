import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import {
  defaultCaseStudiesData,
  type CaseStudiesData,
  type CaseStudyItem,
  type CaseStudyMetric,
  type CaseStudyMetricIcon,
} from "@/lib/caseStudiesData";

export const runtime = "nodejs";

const dataDir = path.join(process.cwd(), "data");
const dataFilePath = path.join(dataDir, "case-studies.json");
const uploadDir = path.join(process.cwd(), "public", "case-study-images");

const allowedIcons: CaseStudyMetricIcon[] = [
  "message",
  "users",
  "line",
  "bar",
  "rocket",
  "report",
];

function isProduction() {
  return process.env.NODE_ENV === "production" || process.env.VERCEL === "1";
}

async function readCaseStudiesData(): Promise<CaseStudiesData> {
  try {
    const file = await fs.readFile(dataFilePath, "utf8");
    return JSON.parse(file) as CaseStudiesData;
  } catch {
    return defaultCaseStudiesData;
  }
}

function sanitizeFileName(value: string) {
  return (
    value
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9.-]+/g, "-")
      .replace(/-+/g, "-")
      .replace(/^-|-$/g, "") || "case-study"
  );
}

function getSafeExtension(fileName: string) {
  const ext = path.extname(fileName).toLowerCase();

  if ([".png", ".jpg", ".jpeg", ".webp"].includes(ext)) {
    return ext;
  }

  return ".jpg";
}

function cleanIcon(icon: unknown): CaseStudyMetricIcon {
  if (typeof icon === "string" && allowedIcons.includes(icon as CaseStudyMetricIcon)) {
    return icon as CaseStudyMetricIcon;
  }

  return "message";
}

function cleanMetric(metric: CaseStudyMetric, index: number): CaseStudyMetric {
  return {
    id: metric.id?.trim() || `metric-${index + 1}`,
    value: metric.value?.trim() || "-",
    labelVi: metric.labelVi?.trim() || "Chỉ số",
    labelEn: metric.labelEn?.trim() || metric.labelVi?.trim() || "Metric",
    icon: cleanIcon(metric.icon),
  };
}

function cleanItem(item: CaseStudyItem, index: number): CaseStudyItem {
  const nameVi = item.nameVi?.trim() || `Case Study ${index + 1}`;
  const nameEn = item.nameEn?.trim() || nameVi;

  const metrics = (item.metrics ?? [])
    .slice(0, 3)
    .map((metric, metricIndex) => cleanMetric(metric, metricIndex));

  while (metrics.length < 3) {
    metrics.push({
      id: `metric-${metrics.length + 1}`,
      value: "-",
      labelVi: "Chỉ số",
      labelEn: "Metric",
      icon: "message",
    });
  }

  return {
    id: item.id?.trim() || sanitizeFileName(nameVi),
    nameVi,
    nameEn,
    categoryVi: item.categoryVi?.trim() || "Campaign",
    categoryEn: item.categoryEn?.trim() || item.categoryVi?.trim() || "Campaign",
    image: item.image?.trim() || "",
    tags: (item.tags ?? [])
      .map((tag) => tag.trim())
      .filter(Boolean)
      .slice(0, 3),
    metrics,
  };
}

async function saveImageFile(
  file: FormDataEntryValue | null,
  item: CaseStudyItem
) {
  if (!(file instanceof File) || file.size === 0) {
    return item.image;
  }

  if (!file.type.startsWith("image/")) {
    return item.image;
  }

  await fs.mkdir(uploadDir, { recursive: true });

  const safeId = sanitizeFileName(item.id || item.nameVi || "case-study");
  const ext = getSafeExtension(file.name);
  const fileName = `${safeId}-${Date.now()}${ext}`;
  const filePath = path.join(uploadDir, fileName);

  const buffer = Buffer.from(await file.arrayBuffer());
  await fs.writeFile(filePath, buffer);

  return `/case-study-images/${fileName}`;
}

export async function GET() {
  try {
    const data = await readCaseStudiesData();

    return NextResponse.json({
      ok: true,
      editable: !isProduction(),
      data,
    });
  } catch {
    return NextResponse.json(
      {
        ok: false,
        message: "Không đọc được dữ liệu Case Studies.",
      },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  if (isProduction()) {
    return NextResponse.json(
      {
        ok: false,
        message:
          "Admin Case Studies chỉ hoạt động ở local. Trên Vercel không cho ghi file.",
      },
      { status: 403 }
    );
  }

  try {
    const formData = await request.formData();
    const rawData = formData.get("data");

    if (typeof rawData !== "string") {
      return NextResponse.json(
        {
          ok: false,
          message: "Thiếu dữ liệu Case Studies.",
        },
        { status: 400 }
      );
    }

    const parsed = JSON.parse(rawData) as CaseStudiesData;
    const nextItems: CaseStudyItem[] = [];

    for (const [index, rawItem] of (parsed.caseStudies ?? []).slice(0, 6).entries()) {
      const item = cleanItem(rawItem, index);
      const image = await saveImageFile(formData.get(`image_${item.id}`), item);

      nextItems.push({
        ...item,
        image,
      });
    }

    const nextData: CaseStudiesData = {
      caseStudies: nextItems,
    };

    await fs.mkdir(dataDir, { recursive: true });
    await fs.writeFile(
      dataFilePath,
      JSON.stringify(nextData, null, 2),
      "utf8"
    );

    return NextResponse.json({
      ok: true,
      message: "Đã lưu Case Studies.",
      data: nextData,
    });
  } catch {
    return NextResponse.json(
      {
        ok: false,
        message: "Không lưu được dữ liệu Case Studies.",
      },
      { status: 500 }
    );
  }
}