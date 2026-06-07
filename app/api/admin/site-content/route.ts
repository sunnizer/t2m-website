import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import {
  defaultSiteContentData,
  type SiteContentData,
  type SiteContentField,
  type SiteContentFieldType,
} from "@/lib/siteContentData";

export const runtime = "nodejs";

const dataDir = path.join(process.cwd(), "data");
const dataFilePath = path.join(dataDir, "site-content.json");

const allowedTypes: SiteContentFieldType[] = [
  "text",
  "textarea",
  "number",
  "email",
  "phone",
  "url",
];

function isProductionLike() {
  return process.env.NODE_ENV === "production" || process.env.VERCEL === "1";
}

async function readSiteContentData(): Promise<SiteContentData> {
  try {
    const file = await fs.readFile(dataFilePath, "utf8");
    return JSON.parse(file) as SiteContentData;
  } catch {
    return defaultSiteContentData;
  }
}

function slugify(value: string) {
  return (
    value
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/-+/g, "-")
      .replace(/^-|-$/g, "") || `item-${Date.now()}`
  );
}

function cleanField(rawField: SiteContentField): SiteContentField {
  const label = rawField.label?.trim() || "Field chưa đặt tên";
  const id = rawField.id?.trim() || slugify(label);
  const type = allowedTypes.includes(rawField.type) ? rawField.type : "text";

  return {
    id: slugify(id),
    label,
    type,
    valueVi: rawField.valueVi ?? "",
    valueEn: rawField.valueEn ?? "",
    placeholder: rawField.placeholder?.trim() || "",
    note: rawField.note?.trim() || "",
  };
}

function cleanData(rawData: SiteContentData): SiteContentData {
  return {
    pages: (rawData.pages ?? []).map((rawPage) => {
      const title = rawPage.title?.trim() || "Page chưa đặt tên";

      return {
        id: slugify(rawPage.id?.trim() || title),
        title,
        description: rawPage.description?.trim() || "",
        fields: (rawPage.fields ?? []).map(cleanField),
      };
    }),
  };
}

export async function GET() {
  try {
    const data = await readSiteContentData();

    return NextResponse.json({
      ok: true,
      editable: !isProductionLike(),
      data,
    });
  } catch {
    return NextResponse.json(
      { ok: false, message: "Không đọc được dữ liệu Site Content." },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  if (isProductionLike()) {
    return NextResponse.json(
      {
        ok: false,
        message:
          "Admin Site Content chỉ hoạt động ở local. Trên Vercel không cho ghi file.",
      },
      { status: 403 }
    );
  }

  try {
    const body = (await request.json()) as SiteContentData;
    const nextData = cleanData(body);

    await fs.mkdir(dataDir, { recursive: true });
    await fs.writeFile(dataFilePath, JSON.stringify(nextData, null, 2), "utf8");

    return NextResponse.json({
      ok: true,
      message: "Đã lưu Site Content.",
      data: nextData,
    });
  } catch {
    return NextResponse.json(
      { ok: false, message: "Không lưu được dữ liệu Site Content." },
      { status: 500 }
    );
  }
}
