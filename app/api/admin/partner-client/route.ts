import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import {
  defaultPartnerClientData,
  type PartnerClientData,
  type PartnerClientLogo,
  type PartnerClientLogoSize,
} from "@/lib/partnerClientData";

export const runtime = "nodejs";

const dataDir = path.join(process.cwd(), "data");
const dataFilePath = path.join(dataDir, "partner-client.json");
const uploadDir = path.join(process.cwd(), "public", "partner-logos");

const allowedSizes: PartnerClientLogoSize[] = [
  "small",
  "medium",
  "large",
  "wide",
];

function isProduction() {
  return process.env.NODE_ENV === "production";
}

async function readPartnerClientData(): Promise<PartnerClientData> {
  try {
    const file = await fs.readFile(dataFilePath, "utf8");
    return JSON.parse(file) as PartnerClientData;
  } catch {
    return defaultPartnerClientData;
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
      .replace(/^-|-$/g, "") || "logo"
  );
}

function getSafeExtension(fileName: string) {
  const ext = path.extname(fileName).toLowerCase();

  if ([".png", ".jpg", ".jpeg", ".webp", ".svg"].includes(ext)) {
    return ext;
  }

  return ".png";
}

function cleanSize(size: unknown): PartnerClientLogoSize {
  if (typeof size === "string" && allowedSizes.includes(size as PartnerClientLogoSize)) {
    return size as PartnerClientLogoSize;
  }

  return "medium";
}

function cleanItem(item: PartnerClientLogo): PartnerClientLogo {
  const name = item.name?.trim() || "Unnamed";

  return {
    id: item.id?.trim() || sanitizeFileName(name),
    name,
    shortName: item.shortName?.trim() || name,
    image: item.image?.trim() || "",
    className: item.className?.trim() || "",
    size: cleanSize(item.size),
  };
}

async function saveLogoFile(
  file: FormDataEntryValue | null,
  group: "clients" | "partners",
  item: PartnerClientLogo
) {
  if (!(file instanceof File) || file.size === 0) {
    return item.image;
  }

  if (!file.type.startsWith("image/")) {
    return item.image;
  }

  await fs.mkdir(uploadDir, { recursive: true });

  const safeId = sanitizeFileName(item.id || item.name || "logo");
  const ext = getSafeExtension(file.name);
  const fileName = `${group}-${safeId}-${Date.now()}${ext}`;
  const filePath = path.join(uploadDir, fileName);

  const buffer = Buffer.from(await file.arrayBuffer());
  await fs.writeFile(filePath, buffer);

  return `/partner-logos/${fileName}`;
}

export async function GET() {
  try {
    const data = await readPartnerClientData();

    return NextResponse.json({
      ok: true,
      editable: !isProduction(),
      data,
    });
  } catch {
    return NextResponse.json(
      {
        ok: false,
        message: "Không đọc được dữ liệu Partner & Client.",
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
          "Admin Partner & Client chỉ hoạt động ở local. Trên Vercel không cho ghi file.",
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
          message: "Thiếu dữ liệu Partner & Client.",
        },
        { status: 400 }
      );
    }

    const parsed = JSON.parse(rawData) as PartnerClientData;

    const nextData: PartnerClientData = {
      clients: [],
      partners: [],
    };

    for (const rawItem of parsed.clients ?? []) {
      const item = cleanItem(rawItem);
      const image = await saveLogoFile(
        formData.get(`logo_clients_${item.id}`),
        "clients",
        item
      );

      nextData.clients.push({
        ...item,
        image,
      });
    }

    for (const rawItem of parsed.partners ?? []) {
      const item = cleanItem(rawItem);
      const image = await saveLogoFile(
        formData.get(`logo_partners_${item.id}`),
        "partners",
        item
      );

      nextData.partners.push({
        ...item,
        image,
      });
    }

    await fs.mkdir(dataDir, { recursive: true });
    await fs.writeFile(
      dataFilePath,
      JSON.stringify(nextData, null, 2),
      "utf8"
    );

    return NextResponse.json({
      ok: true,
      message: "Đã lưu Partner & Client.",
      data: nextData,
    });
  } catch {
    return NextResponse.json(
      {
        ok: false,
        message: "Không lưu được dữ liệu Partner & Client.",
      },
      { status: 500 }
    );
  }
}