"use client";

import Link from "next/link";
import { adminModules } from "@/lib/admin/adminModules";
import {
  ExternalLink,
  Globe2,
  LockKeyhole,
  LogOut,
  ShieldCheck,
} from "lucide-react";

export default function AdminDashboard() {
  async function handleLogout() {
    try {
      await fetch("/api/admin/auth/logout", {
        method: "POST",
      });

      window.location.href = "/admin/login";
    } catch {
      alert("Không đăng xuất được. Anh thử reload lại trang nhé.");
    }
  }

  return (
    <main className="min-h-screen bg-slate-50 px-5 py-10 text-slate-950">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-blue-50 px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-blue-700">
                <ShieldCheck className="h-4 w-4" />
                T2M Local Admin
              </div>

              <h1 className="text-3xl font-black tracking-tight text-slate-950 sm:text-5xl">
                Admin Dashboard
              </h1>

              <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-600 sm:text-base">
                Trung tâm quản lý local cho website T2M. Chỉnh dữ liệu ở local,
                kiểm tra giao diện, sau đó commit lên Git để Vercel deploy.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Link
                href="/"
                className="inline-flex items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-5 py-4 text-sm font-black text-slate-700 shadow-sm transition hover:border-blue-200 hover:text-blue-700"
              >
                <Globe2 className="h-4 w-4" />
                Xem website
              </Link>

              <button
                type="button"
                onClick={handleLogout}
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-slate-950 px-5 py-4 text-sm font-black text-white shadow-lg shadow-slate-950/15 transition hover:bg-red-600"
              >
                <LogOut className="h-4 w-4" />
                Đăng xuất
              </button>
            </div>
          </div>
        </div>

        <div className="mb-8 grid gap-4 md:grid-cols-3">
          <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="text-3xl font-black text-blue-700">3</div>
            <div className="mt-1 text-sm font-bold text-slate-600">
              Admin đang hoạt động
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="text-3xl font-black text-blue-700">Local</div>
            <div className="mt-1 text-sm font-bold text-slate-600">
              Không chỉnh trực tiếp trên Vercel
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="text-3xl font-black text-blue-700">Git</div>
            <div className="mt-1 text-sm font-bold text-slate-600">
              Commit data sau khi chỉnh
            </div>
          </div>
        </div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {adminModules.map((module) => {
            const Icon = module.icon;
            const isActive = module.status === "active";

            const cardClassName = [
              "group rounded-[2rem] border bg-white p-6 shadow-sm transition duration-300",
              isActive
                ? "border-slate-200 hover:-translate-y-1 hover:border-blue-200 hover:shadow-[0_24px_80px_rgba(37,99,235,0.12)]"
                : "border-slate-200 opacity-60",
            ].join(" ");

            const content = (
              <div className={cardClassName}>
                <div className="mb-5 flex items-start justify-between gap-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-blue-700 ring-1 ring-blue-100">
                    <Icon className="h-6 w-6" />
                  </div>

                  <span
                    className={[
                      "rounded-full px-3 py-1 text-xs font-black uppercase tracking-[0.12em]",
                      isActive
                        ? "bg-emerald-50 text-emerald-700"
                        : "bg-slate-100 text-slate-500",
                    ].join(" ")}
                  >
                    {module.badge}
                  </span>
                </div>

                <h2 className="text-2xl font-black tracking-tight text-slate-950">
                  {module.title}
                </h2>

                <p className="mt-3 min-h-[3.5rem] text-sm leading-7 text-slate-600">
                  {module.description}
                </p>

                <div className="mt-6 flex items-center gap-2 text-sm font-black text-blue-700">
                  {isActive ? (
                    <>
                      Mở admin
                      <ExternalLink className="h-4 w-4 transition group-hover:translate-x-1" />
                    </>
                  ) : (
                    <>
                      Đang chuẩn bị
                      <LockKeyhole className="h-4 w-4" />
                    </>
                  )}
                </div>
              </div>
            );

            if (!isActive) {
              return <div key={module.id}>{content}</div>;
            }

            return (
              <Link key={module.id} href={module.href}>
                {content}
              </Link>
            );
          })}
        </div>

        <div className="mt-8 rounded-[2rem] border border-blue-100 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-black text-slate-950">
            Gợi ý kiến trúc mở rộng sau này
          </h2>

          <div className="mt-4 grid gap-3 md:grid-cols-3">
            <div className="rounded-2xl bg-slate-50 p-4">
              <div className="text-sm font-black text-slate-950">
                1. CMS Content
              </div>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Quản lý bài viết, landing page, case detail và FAQ.
              </p>
            </div>

            <div className="rounded-2xl bg-slate-50 p-4">
              <div className="text-sm font-black text-slate-950">
                2. Website Settings
              </div>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Quản lý SEO, social links, CTA, thông tin công ty.
              </p>
            </div>

            <div className="rounded-2xl bg-slate-50 p-4">
              <div className="text-sm font-black text-slate-950">
                3. Roles & Permissions
              </div>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Tách quyền Owner, Editor, Viewer khi admin lớn hơn.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}