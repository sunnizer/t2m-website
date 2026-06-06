"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Container from "@/components/layout/Container";
import Button from "@/components/ui/Button";

const navItems = [
  {
    label: "Dịch vụ",
    href: "/services",
  },
  {
    label: "Case Study",
    href: "/case-studies",
  },
  {
    label: "Insight",
    href: "/insights",
  },
  {
    label: "Liên hệ",
    href: "/contact",
  },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/90 shadow-sm backdrop-blur-xl">
      <Container>
        <div className="flex h-20 items-center justify-between">
          <Link href="/" className="flex items-center">
            <div className="relative h-14 w-[210px] overflow-hidden sm:h-16 sm:w-[240px]">
			  <Image
				src="/brand/t2m-logo.png"
				alt="T2M Media Logo"
				fill
				priority
				className="object-contain object-left"
			  />
			</div>
          </Link>

          <nav className="hidden items-center gap-8 md:flex">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm font-semibold text-slate-700 transition hover:text-blue-600"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="hidden md:block">
            <Button
              href="/contact"
              size="sm"
              className="bg-blue-600 text-white shadow-[0_12px_28px_rgba(37,99,235,0.20)] hover:bg-blue-500"
            >
              Gửi brief
            </Button>
          </div>

          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-800 shadow-sm md:hidden"
            onClick={() => setIsOpen((prev) => !prev)}
            aria-label="Toggle menu"
          >
            <span className="sr-only">Mở menu</span>
            {isOpen ? (
              <span className="text-xl">×</span>
            ) : (
              <span className="text-xl">☰</span>
            )}
          </button>
        </div>

        {isOpen && (
          <div className="border-t border-slate-200 py-4 md:hidden">
            <nav className="flex flex-col gap-2">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded-xl px-3 py-3 text-sm font-semibold text-slate-700 transition hover:bg-blue-50 hover:text-blue-600"
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </Link>
              ))}

              <Button
                href="/contact"
                className="mt-3 w-full bg-blue-600 text-white hover:bg-blue-500"
                onClick={() => setIsOpen(false)}
              >
                Gửi brief cho T2M
              </Button>
            </nav>
          </div>
        )}
      </Container>
    </header>	
  );
}