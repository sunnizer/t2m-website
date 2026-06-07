import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import {
  defaultInsightsData,
  getDefaultInsightContent,
  type InsightCategory,
  type InsightPost,
  type InsightPostType,
  type InsightsData,
} from "@/lib/insightsData";

export const runtime = "nodejs";

const dataDir = path.join(process.cwd(), "data");
const dataFilePath = path.join(dataDir, "insights.json");
const uploadDir = path.join(process.cwd(), "public", "insight-images");

const allowedPostTypes: InsightPostType[] = ["featured", "trend", "caseStudy", "normal"];

function isProductionLike() {
  return process.env.NODE_ENV === "production" || process.env.VERCEL === "1";
}

async function readInsightsData(): Promise<InsightsData> {
  try {
    const file = await fs.readFile(dataFilePath, "utf8");
    return JSON.parse(file) as InsightsData;
  } catch {
    return defaultInsightsData;
  }
}

function slugify(value: string) {
  return (
    value
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/đ/g, "d")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/-+/g, "-")
      .replace(/^-|-$/g, "") || `item-${Date.now()}`
  );
}

function getSafeExtension(fileName: string) {
  const ext = path.extname(fileName).toLowerCase();
  if ([".png", ".jpg", ".jpeg", ".webp", ".svg"].includes(ext)) return ext;
  return ".jpg";
}

async function saveImageFile(file: FormDataEntryValue | null, prefix: string, currentImage = "") {
  if (!(file instanceof File) || file.size === 0) return currentImage;
  if (!file.type.startsWith("image/")) return currentImage;

  await fs.mkdir(uploadDir, { recursive: true });

  const ext = getSafeExtension(file.name);
  const fileName = `${slugify(prefix)}-${Date.now()}${ext}`;
  const filePath = path.join(uploadDir, fileName);
  const buffer = Buffer.from(await file.arrayBuffer());

  await fs.writeFile(filePath, buffer);
  return `/insight-images/${fileName}`;
}

function cleanCategory(category: InsightCategory, index: number): InsightCategory {
  const nameVi = category.nameVi?.trim() || `Chủ đề ${index + 1}`;
  return {
    id: slugify(category.id?.trim() || nameVi),
    nameVi,
    nameEn: category.nameEn?.trim() || nameVi,
    icon: category.icon?.trim() || "grid",
  };
}

function cleanPostType(type: unknown): InsightPostType {
  if (typeof type === "string" && allowedPostTypes.includes(type as InsightPostType)) {
    return type as InsightPostType;
  }

  return "normal";
}

function cleanPost(post: InsightPost, index: number): InsightPost {
  const titleVi = post.titleVi?.trim() || `Bài viết ${index + 1}`;
  const slug = slugify(post.slug?.trim() || titleVi);

  return {
    id: slugify(post.id?.trim() || slug),
    titleVi,
    titleEn: post.titleEn?.trim() || titleVi,
    excerptVi: post.excerptVi?.trim() || "Mô tả ngắn của bài viết.",
    excerptEn: post.excerptEn?.trim() || post.excerptVi?.trim() || "Article excerpt.",
    contentVi: post.contentVi?.trim() || getDefaultInsightContent("vi"),
    contentEn: post.contentEn?.trim() || getDefaultInsightContent("en"),
    categoryId: slugify(post.categoryId?.trim() || "all"),
    type: cleanPostType(post.type),
    image: post.image?.trim() || "/visuals/insights/insight-hero.svg",
    author: post.author?.trim() || "T2M Team",
    dateVi: post.dateVi?.trim() || "01 Thg 1, 2026",
    dateEn: post.dateEn?.trim() || "Jan 1, 2026",
    readTimeVi: post.readTimeVi?.trim() || "5 phút đọc",
    readTimeEn: post.readTimeEn?.trim() || "5 min read",
    slug,
    isFeatured: Boolean(post.isFeatured),
    isPopular: Boolean(post.isPopular),
  };
}

function cleanData(rawData: InsightsData): InsightsData {
  const settings = rawData.settings || defaultInsightsData.settings;

  return {
    settings: {
      ...defaultInsightsData.settings,
      ...settings,
      heroImage: settings.heroImage?.trim() || defaultInsightsData.settings.heroImage,
    },
    categories: (rawData.categories ?? defaultInsightsData.categories).map(cleanCategory),
    posts: (rawData.posts ?? defaultInsightsData.posts).map(cleanPost),
  };
}

export async function GET() {
  try {
    const data = await readInsightsData();

    return NextResponse.json({
      ok: true,
      editable: !isProductionLike(),
      data,
    });
  } catch {
    return NextResponse.json(
      { ok: false, message: "Không đọc được dữ liệu Insights." },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  if (isProductionLike()) {
    return NextResponse.json(
      {
        ok: false,
        message: "Admin Insights chỉ hoạt động ở local. Trên Vercel không cho ghi file.",
      },
      { status: 403 }
    );
  }

  try {
    const formData = await request.formData();
    const rawData = formData.get("data");

    if (typeof rawData !== "string") {
      return NextResponse.json({ ok: false, message: "Thiếu dữ liệu Insights." }, { status: 400 });
    }

    const parsed = JSON.parse(rawData) as InsightsData;
    const nextData = cleanData(parsed);

    nextData.settings.heroImage = await saveImageFile(
      formData.get("heroImageFile"),
      "hero-image",
      nextData.settings.heroImage
    );

    for (const post of nextData.posts) {
      post.image = await saveImageFile(
        formData.get(`postImage:${post.id}`),
        post.id,
        post.image
      );
    }

    await fs.mkdir(dataDir, { recursive: true });
    await fs.writeFile(dataFilePath, JSON.stringify(nextData, null, 2), "utf8");

    return NextResponse.json({
      ok: true,
      message: "Đã lưu dữ liệu Insights.",
      data: nextData,
    });
  } catch {
    return NextResponse.json(
      { ok: false, message: "Không lưu được dữ liệu Insights." },
      { status: 500 }
    );
  }
}
