"use client";

import Link from "next/link";
import { useLanguage } from "@/components/providers/LanguageProvider";

export default function Header() {
  const { t, locale, toggleLocale } = useLanguage();

  return (
    <header className="fixed left-0 top-0 z-50 w-full">
      <div className="mx-auto flex h-24 max-w-7xl items-center justify-between px-6 lg:px-10">
        {/* Logo */}
        <Link
          href="/"
          className="group flex items-center gap-3 rounded-full border border-white/50 bg-white/40 px-5 py-3 shadow-sm backdrop-blur-xl transition hover:bg-white/70"
        >
          <div className="leading-none">
            <div className="text-[32px] font-black tracking-[-0.08em] text-slate-950 lg:text-[40px]">
              T2M
            </div>

            <div className="mt-1 flex justify-center gap-1">
              <span className="h-1 w-1 rounded-full bg-blue-600" />
              <span className="h-1 w-1 rounded-full bg-cyan-500" />
              <span className="h-1 w-1 rounded-full bg-sky-400" />
            </div>
          </div>

          <div className="hidden border-l border-slate-300/70 pl-3 text-[11px] font-bold uppercase leading-tight tracking-[0.18em] text-slate-700 lg:block">
            Growth
            <br />
            System
          </div>
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden items-center gap-9 rounded-full border border-white/50 bg-white/40 px-8 py-4 text-[17px] font-bold text-slate-950 shadow-sm backdrop-blur-xl md:flex">
          <Link href="/services" className="transition hover:text-blue-600">
            {t.nav.services}
          </Link>

          <Link href="/case-studies" className="transition hover:text-blue-600">
            {t.nav.caseStudies}
          </Link>

          <Link href="/insights" className="transition hover:text-blue-600">
            {t.nav.insight}
          </Link>

          <Link href="/contact" className="transition hover:text-blue-600">
            {t.nav.contact}
          </Link>
        </nav>

        {/* Right Actions */}
        <div className="hidden items-center gap-3 md:flex">
          <button
            type="button"
            onClick={toggleLocale}
            className="rounded-full border border-white/50 bg-white/40 px-4 py-2 text-sm font-bold text-slate-900 shadow-sm backdrop-blur-xl transition hover:bg-white/70"
            aria-label="Switch language"
          >
            {locale === "vi" ? "VI / EN" : "EN / VI"}
          </button>

          <Link
            href="/contact"
            className="rounded-full bg-blue-600 px-7 py-4 text-[16px] font-bold text-white shadow-lg shadow-blue-600/25 transition hover:bg-blue-700"
          >
            {t.nav.cta}
          </Link>
        </div>

        {/* Mobile Button */}
        <button className="flex h-11 w-11 items-center justify-center rounded-full border border-white/50 bg-white/40 text-slate-900 backdrop-blur-xl md:hidden">
          ☰
        </button>
      </div>
    </header>
  );
}