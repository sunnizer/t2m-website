import { NextResponse } from "next/server";

const adminCookieName = "t2m_admin_session";

function isProductionLike() {
  return process.env.NODE_ENV === "production" || process.env.VERCEL === "1";
}

export async function POST(request: Request) {
  if (isProductionLike()) {
    return NextResponse.json({ ok: false, message: "Not found" }, { status: 404 });
  }

  const { password } = await request.json().catch(() => ({ password: "" }));

  const adminPassword = process.env.ADMIN_PASSWORD;
  const adminToken = process.env.ADMIN_SESSION_TOKEN;

  if (!adminPassword || !adminToken) {
    return NextResponse.json(
      {
        ok: false,
        message:
          "Thiếu ADMIN_PASSWORD hoặc ADMIN_SESSION_TOKEN trong file .env.local.",
      },
      { status: 500 }
    );
  }

  if (password !== adminPassword) {
    return NextResponse.json(
      { ok: false, message: "Sai mật khẩu admin." },
      { status: 401 }
    );
  }

  const response = NextResponse.json({
    ok: true,
    message: "Đăng nhập admin thành công.",
  });

  response.cookies.set(adminCookieName, adminToken, {
    httpOnly: true,
    sameSite: "strict",
    secure: false,
    path: "/",
    maxAge: 60 * 60 * 8,
  });

  return response;
}