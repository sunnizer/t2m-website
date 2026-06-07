"use client";

import { useState } from "react";
import { LockKeyhole, LogIn } from "lucide-react";

export default function AdminLoginPage() {
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("/api/admin/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password }),
      });

      const json = await response.json();

      if (!response.ok || !json?.ok) {
        alert(json?.message || "Không đăng nhập được.");
        return;
      }

      const params = new URLSearchParams(window.location.search);
      const next = params.get("next") || "/admin";

      window.location.href = next;
    } catch {
      alert("Không đăng nhập được. Anh kiểm tra lại local server nhé.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 px-5 py-10 text-slate-950">
      <form
        onSubmit={handleLogin}
        className="w-full max-w-md rounded-[2rem] border border-slate-200 bg-white p-8 shadow-[0_24px_80px_rgba(15,23,42,0.08)]"
      >
        <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-lg shadow-blue-600/20">
          <LockKeyhole className="h-6 w-6" />
        </div>

        <div className="mb-7">
          <div className="mb-3 inline-flex rounded-full bg-blue-50 px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-blue-700">
            T2M Local Admin
          </div>

          <h1 className="text-3xl font-black tracking-tight text-slate-950">
            Đăng nhập Admin
          </h1>

          <p className="mt-3 text-sm leading-7 text-slate-600">
            Khu vực này chỉ dùng ở local để chỉnh nội dung, dữ liệu và cấu hình website.
          </p>
        </div>

        <label className="block">
          <span className="text-xs font-bold uppercase tracking-[0.14em] text-slate-500">
            Mật khẩu admin
          </span>

          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Nhập ADMIN_PASSWORD"
            className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-900 outline-none transition focus:border-blue-400 focus:ring-4 focus:ring-blue-100"
          />
        </label>

        <button
          type="submit"
          disabled={loading || !password.trim()}
          className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-slate-950 px-5 py-4 text-sm font-black text-white shadow-lg shadow-slate-950/15 transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <LogIn className="h-4 w-4" />
          {loading ? "Đang đăng nhập..." : "Đăng nhập"}
        </button>
      </form>
    </main>
  );
}