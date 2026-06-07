import { NextResponse, type NextRequest } from "next/server";

const adminCookieName = "t2m_admin_session";

function isProductionLike() {
  return process.env.NODE_ENV === "production" || process.env.VERCEL === "1";
}

function isAdminAuthed(request: NextRequest) {
  const token = process.env.ADMIN_SESSION_TOKEN;

  if (!token) {
    return false;
  }

  return request.cookies.get(adminCookieName)?.value === token;
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isAdminPage = pathname.startsWith("/admin");
  const isAdminApi = pathname.startsWith("/api/admin");
  const isAuthApi = pathname.startsWith("/api/admin/auth");

  // Không cho mở admin UI trên Vercel / production.
  if (isProductionLike() && isAdminPage) {
    return new NextResponse("Not found", { status: 404 });
  }

  // Cho phép auth API hoạt động ở local.
  if (isAuthApi) {
    return NextResponse.next();
  }

  // Bảo vệ admin pages ở local.
  if (isAdminPage) {
    if (pathname === "/admin/login") {
      return NextResponse.next();
    }

    if (!isAdminAuthed(request)) {
      const loginUrl = request.nextUrl.clone();
      loginUrl.pathname = "/admin/login";
      loginUrl.searchParams.set("next", pathname);

      return NextResponse.redirect(loginUrl);
    }

    return NextResponse.next();
  }

  // API admin:
  // GET vẫn cho phép để website production đọc data đã commit.
  // PUT/POST/PATCH/DELETE chỉ cho local đã login.
  if (isAdminApi && request.method !== "GET") {
    if (isProductionLike()) {
      return NextResponse.json({ ok: false, message: "Not found" }, { status: 404 });
    }

    if (!isAdminAuthed(request)) {
      return NextResponse.json(
        { ok: false, message: "Unauthorized admin request." },
        { status: 401 }
      );
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};