import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

const filePath = path.join(process.cwd(), "data", "i18n.json");

function isProduction() {
  return process.env.NODE_ENV === "production";
}

export async function GET() {
  try {
    const file = await fs.readFile(filePath, "utf8");
    const data = JSON.parse(file);

    return NextResponse.json({
      ok: true,
      editable: !isProduction(),
      data,
    });
  } catch (error) {
    return NextResponse.json(
      {
        ok: false,
        message: "Không đọc được file data/i18n.json",
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
          "Admin sửa text chỉ hoạt động ở local. Trên Vercel không cho ghi file để tránh lỗi.",
      },
      { status: 403 }
    );
  }

  try {
    const body = await request.json();

    if (!body?.vi || !body?.en) {
      return NextResponse.json(
        {
          ok: false,
          message: "Dữ liệu không hợp lệ. Cần có vi và en.",
        },
        { status: 400 }
      );
    }

    const formatted = JSON.stringify(body, null, 2);

    await fs.writeFile(filePath, formatted, "utf8");

    return NextResponse.json({
      ok: true,
      message: "Đã lưu nội dung song ngữ vào data/i18n.json",
    });
  } catch (error) {
    return NextResponse.json(
      {
        ok: false,
        message: "Không lưu được file data/i18n.json",
      },
      { status: 500 }
    );
  }
}