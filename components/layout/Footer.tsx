import Image from "next/image";
import Link from "next/link";
import Container from "@/components/layout/Container";
import { Mail, MessageCircle, Building2 } from "lucide-react";

const websiteLinks = [
  { label: "Trang chủ", href: "/" },
  { label: "Dịch vụ", href: "/services" },
  { label: "Case Study", href: "/case-studies" },
  { label: "Insight", href: "/insights" },
  { label: "Liên hệ", href: "/contact" },
];

const serviceLinks = [
  { label: "Performance Marketing", href: "/services" },
  { label: "Media Planning", href: "/services" },
  { label: "Social Media & Seeding", href: "/services" },
  { label: "Tracking, Report & Automation", href: "/services" },
];

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white text-slate-900">
      <Container>
        <div className="grid gap-8 py-6 lg:grid-cols-[1fr_1.35fr] lg:items-start">
          <div>
            <Link href="/" className="inline-flex items-center">
              <Image
                src="/brand/t2m-logo.png"
                alt="T2M Media Logo"
                width={260}
                height={90}
                className="h-auto w-[170px] sm:w-[200px]"
              />
            </Link>

            <p className="mt-3 max-w-md text-sm leading-6 text-slate-600">
              Digital marketing partner chuyên Performance, Media Planning,
              Social Seeding, Tracking & Automation.
            </p>
          </div>

          <div className="grid gap-8 sm:grid-cols-2">
            <div>
              <h3 className="text-sm font-bold text-slate-950">Website</h3>

              <ul className="mt-3 grid gap-2">
                {websiteLinks.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-slate-600 transition hover:text-blue-600"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-bold text-slate-950">Dịch vụ</h3>

              <ul className="mt-3 grid gap-2">
                {serviceLinks.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-slate-600 transition hover:text-blue-600"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-200 py-5">
          <div className="grid gap-4 text-sm text-slate-600 lg:grid-cols-[1fr_auto] lg:items-center">
            <div className="flex flex-wrap gap-x-6 gap-y-3">
              <div className="flex items-center gap-2">
                <Building2 className="h-4 w-4 text-blue-600" />
                <span className="font-semibold text-slate-900">
                  Công ty TNHH Giải Pháp và Truyền Thông T2M
                </span>
                <span>MST: [Điền MST]</span>
              </div>

              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-blue-600" />
                <span>[Điền email]</span>
              </div>

              <div className="flex items-center gap-2">
                <MessageCircle className="h-4 w-4 text-blue-600" />
                <span>[Điền số Zalo]</span>
              </div>
            </div>

            <p className="text-slate-500">
              © {new Date().getFullYear()} T2M Media & Solutions.
            </p>
          </div>
        </div>
      </Container>
    </footer>
  );
}