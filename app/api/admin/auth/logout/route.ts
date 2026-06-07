import { NextResponse } from "next/server";

const adminCookieName = "t2m_admin_session";

export async function POST() {
  const response = NextResponse.json({
    ok: true,
    message: "Đã đăng xuất admin.",
  });

  response.cookies.set(adminCookieName, "", {
    httpOnly: true,
    sameSite: "strict",
    secure: false,
    path: "/",
    maxAge: 0,
  });

  return response;
}