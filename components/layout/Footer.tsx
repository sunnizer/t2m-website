"use client";

import Image from "next/image";
import Link from "next/link";
import Container from "@/components/layout/Container";
import {
  ArrowUp,
  Building2,
  LockKeyhole,
  Mail,
  MessageCircle,
  Phone,
  Rocket,
  Send,
  ShieldCheck,
  Target,
  UsersRound,
  type LucideIcon,
} from "lucide-react";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { getSiteContentValue } from "@/lib/siteContentData";

const websiteLinks = [
  { labelKey: "footer.websiteLinks.home", labelFallback: "Trang chủ", href: "/" },
  { labelKey: "footer.websiteLinks.about", labelFallback: "Giới thiệu", href: "/#about" },
  { labelKey: "footer.websiteLinks.services", labelFallback: "Dịch vụ", href: "/services" },
  { labelKey: "footer.websiteLinks.caseStudies", labelFallback: "Case Study", href: "/case-studies" },
  { labelKey: "footer.websiteLinks.insight", labelFallback: "Insight", href: "/insights" },
  { labelKey: "footer.websiteLinks.news", labelFallback: "Tin tức", href: "/insights" },
  { labelKey: "footer.websiteLinks.contact", labelFallback: "Liên hệ", href: "/contact" },
];

const serviceLinks = [
  { labelKey: "footer.serviceLinks.performanceMarketing", labelFallback: "Performance Marketing", href: "/services#performance-marketing" },
  { labelKey: "footer.serviceLinks.mediaPlanning", labelFallback: "Media Planning", href: "/services#media-planning" },
  { labelKey: "footer.serviceLinks.socialMediaSeeding", labelFallback: "Social Media & Seeding", href: "/services#social-seeding" },
  { labelKey: "footer.serviceLinks.trackingReportAutomation", labelFallback: "Tracking, Report & Automation", href: "/services#tracking-reporting" },
];

const resourceLinks = [
  { labelKey: "footer.resourceLinks.blog", labelFallback: "Blog", href: "/insights" },
  { labelKey: "footer.resourceLinks.documents", labelFallback: "Tài liệu", href: "/insights" },
  { labelKey: "footer.resourceLinks.glossary", labelFallback: "Glossary", href: "/insights" },
  { labelKey: "footer.resourceLinks.events", labelFallback: "Sự kiện", href: "/case-studies" },
];

const trustPoints = [
  { icon: Target, labelKey: "footer.trust.measurement", labelFallback: "Hiệu quả đo lường được" },
  { icon: UsersRound, labelKey: "footer.trust.strategy", labelFallback: "Chiến lược dựa trên dữ liệu" },
  { icon: Rocket, labelKey: "footer.trust.execution", labelFallback: "Triển khai nhanh & linh hoạt" },
  { icon: ShieldCheck, labelKey: "footer.trust.companion", labelFallback: "Minh bạch & đồng hành" },
];

const partnerBadges = [
  { name: "Google", subtitle: "Partner" },
  { name: "Meta", subtitle: "Business Partner" },
  { name: "TikTok", subtitle: "Partner" },
  { name: "Zalo", subtitle: "Official Partner" },
  { name: "iab.", subtitle: "Member" },
];

export default function Footer() {
  const { tr, locale } = useLanguage();
  const currentYear = new Date().getFullYear();

  const siteText = (
    pageId: string,
    fieldId: string,
    fallback = "",
    params?: Record<string, string | number>
  ) => getSiteContentValue(pageId, fieldId, fallback, locale, params);

  const footerPartnerBadges = partnerBadges.map((partner, index) => ({
    name: siteText("footer", `partner${index + 1}Name`, partner.name),
    subtitle: siteText("footer", `partner${index + 1}Subtitle`, partner.subtitle),
  }));

  const footerSocialLinks = [
    { label: "Facebook", shortLabel: "f", href: siteText("global-social", "facebookUrl", "#") },
    { label: "LinkedIn", shortLabel: "in", href: siteText("global-social", "linkedinUrl", "#") },
    { label: "YouTube", shortLabel: "▶", href: siteText("global-social", "youtubeUrl", "#") },
    { label: "TikTok", shortLabel: "♪", href: siteText("global-social", "tiktokUrl", "#") },
  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative overflow-hidden bg-white px-4 pb-8 pt-16 text-slate-900 sm:px-6 lg:px-8">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-44 bg-[radial-gradient(circle_at_50%_0%,rgba(37,99,235,0.10),transparent_60%)]" />
      <Container>
        <div className="relative overflow-hidden rounded-[2rem] border border-slate-200/80 bg-gradient-to-br from-white via-slate-50 to-blue-50/80 shadow-[0_24px_90px_rgba(15,23,42,0.10)]">
          <div className="pointer-events-none absolute -right-28 bottom-10 h-[360px] w-[520px] rounded-full bg-blue-100/50 blur-3xl" />
          <div className="pointer-events-none absolute bottom-0 right-0 h-2/3 w-1/2 opacity-50 [background-image:repeating-linear-gradient(135deg,rgba(37,99,235,0.16)_0_1px,transparent_1px_14px)]" />

          <div className="relative grid gap-10 px-6 py-10 sm:px-8 lg:grid-cols-[1.3fr_0.8fr_0.95fr_0.85fr_1.55fr] lg:gap-0 lg:px-12 lg:py-14">
            <div className="lg:pr-10">
              <Link
                href="/"
                className="inline-flex items-center"
                aria-label={tr("footer.logoAria", "Về trang chủ T2M")}
              >
                <Image
                  src="/brand/t2m-logo.png"
                  alt={tr("footer.logoAlt", "T2M Media Logo")}
                  width={260}
                  height={90}
                  priority={false}
                  className="h-auto w-[170px] sm:w-[210px]"
                />
              </Link>

              <p className="mt-6 max-w-sm text-[15px] leading-7 text-slate-600">
                {tr(
                  "footer.description",
                  "Digital marketing partner chuyên Performance, Media Planning, Social Seeding, Tracking & Automation."
                )}
              </p>

              <div className="mt-5 h-px w-12 bg-blue-600" />

              <div className="mt-8 grid gap-4">
                {trustPoints.map((item) => {
                  const Icon = item.icon;

                  return (
                    <div key={item.labelKey} className="flex items-center gap-3 text-sm font-medium text-slate-700">
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white text-blue-600 shadow-sm ring-1 ring-blue-100">
                        <Icon className="h-4 w-4" />
                      </span>
                      {tr(item.labelKey, item.labelFallback)}
                    </div>
                  );
                })}
              </div>
            </div>

            <FooterColumn title={tr("footer.websiteTitle", "T2M Media")} className="lg:border-l lg:border-slate-200/80 lg:px-8">
              {websiteLinks.map((link) => (
                <FooterLink key={link.labelKey} href={link.href}>
                  {tr(link.labelKey, link.labelFallback)}
                </FooterLink>
              ))}
            </FooterColumn>

            <FooterColumn title={tr("footer.servicesTitle", "Dịch vụ")} className="lg:border-l lg:border-slate-200/80 lg:px-8">
              {serviceLinks.map((link) => (
                <FooterLink key={link.labelKey} href={link.href}>
                  {tr(link.labelKey, link.labelFallback)}
                </FooterLink>
              ))}
            </FooterColumn>

            <FooterColumn title={tr("footer.resourcesTitle", "Nguồn lực")} className="lg:border-l lg:border-slate-200/80 lg:px-8">
              {resourceLinks.map((link) => (
                <FooterLink key={link.labelKey} href={link.href}>
                  {tr(link.labelKey, link.labelFallback)}
                </FooterLink>
              ))}
            </FooterColumn>

            <div className="lg:border-l lg:border-slate-200/80 lg:pl-8">
              <h3 className="text-xs font-extrabold uppercase tracking-[0.18em] text-slate-950">
                {tr("footer.newsletterTitle", "Nhận insight mới nhất")}
              </h3>
              <p className="mt-5 max-w-sm text-[15px] leading-7 text-slate-600">
                {tr(
                  "footer.newsletterDescription",
                  "Cập nhật xu hướng, insight và case study thực chiến mỗi tuần."
                )}
              </p>

              <form className="mt-6 space-y-4" action="/contact">
                <label className="sr-only" htmlFor="footer-email">
                  {tr("footer.emailInputLabel", "Email của bạn")}
                </label>
                <div className="relative">
                  <input
                    id="footer-email"
                    type="email"
                    name="email"
                    placeholder={tr("footer.emailPlaceholder", "Nhập email của bạn")}
                    className="h-12 w-full rounded-xl border border-slate-200 bg-white/90 px-4 pr-12 text-sm text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-blue-400 focus:ring-4 focus:ring-blue-100"
                  />
                  <Send className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-blue-600" />
                </div>

                <button
                  type="submit"
                  className="h-12 w-full rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 px-5 text-sm font-bold text-white shadow-[0_16px_32px_rgba(37,99,235,0.25)] transition hover:-translate-y-0.5 hover:shadow-[0_20px_42px_rgba(37,99,235,0.30)]"
                >
                  {tr("footer.newsletterButton", "Đăng ký nhận bản tin")}
                </button>
              </form>

              <div className="mt-5 flex items-center gap-2 text-xs text-slate-500">
                <LockKeyhole className="h-4 w-4 text-slate-400" />
                {tr("footer.newsletterNote", "Không spam. Hủy đăng ký bất cứ lúc nào.")}
              </div>
            </div>
          </div>

          <div className="relative border-t border-slate-200/80 px-6 py-7 sm:px-8 lg:px-12">
            <div className="grid gap-6 md:grid-cols-5">
              {footerPartnerBadges.map((partner) => (
                <div
                  key={partner.name}
                  className="flex min-h-12 items-center justify-center border-slate-200/80 text-center md:border-l md:first:border-l-0"
                >
                  <div>
                    <div className="text-2xl font-extrabold tracking-tight text-slate-500/90">{partner.name}</div>
                    <div className="text-xs font-medium text-slate-500">{partner.subtitle}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative mx-4 mb-4 rounded-3xl border border-slate-200/80 bg-white/78 px-5 py-5 shadow-[0_18px_60px_rgba(15,23,42,0.08)] backdrop-blur sm:mx-6 lg:mx-8">
            <div className="grid gap-6 lg:grid-cols-[1.55fr_1.05fr_0.95fr_1.35fr_auto] lg:items-center">
              <div className="flex gap-4">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 ring-1 ring-blue-100">
                  <Building2 className="h-6 w-6" />
                </span>
                <div>
                  <p className="text-sm font-extrabold uppercase tracking-[0.04em] text-slate-950">
                    {siteText("global-company", "companyName", tr("footer.companyName", "Công ty TNHH Giải Pháp và Truyền Thông T2M"))}
                  </p>
                  <p className="mt-2 text-sm text-slate-500">{siteText("global-company", "taxCode", tr("footer.taxCode", "MST: [Điền MST]"))}</p>
                  <p className="mt-1 text-sm text-slate-500">{siteText("global-company", "address", tr("footer.address", "Địa chỉ: [Điền địa chỉ công ty]"))}</p>
                </div>
              </div>

              <div className="space-y-3 border-slate-200/80 lg:border-l lg:pl-8">
                <ContactLine icon={Mail}>{siteText("global-contact", "email", tr("footer.email", "[Điền email]"))}</ContactLine>
                <ContactLine icon={Phone}>{siteText("global-contact", "phone", tr("footer.phone", "[Điền hotline]"))}</ContactLine>
                <ContactLine icon={MessageCircle}>{siteText("global-contact", "zalo", tr("footer.zalo", "[Điền Zalo OA]"))}</ContactLine>
              </div>

              <div className="border-slate-200/80 lg:border-l lg:pl-8">
                <p className="text-sm font-extrabold uppercase tracking-[0.04em] text-slate-950">
                  {tr("footer.socialTitle", "Kết nối với T2M")}
                </p>
                <div className="mt-4 flex flex-wrap gap-3">
                  {footerSocialLinks.map((social) => (
                    <Link
                      key={social.label}
                      href={social.href}
                      aria-label={social.label}
                      className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-sm font-extrabold text-blue-600 shadow-sm transition hover:-translate-y-0.5 hover:border-blue-200 hover:bg-blue-50"
                    >
                      {social.shortLabel}
                    </Link>
                  ))}
                </div>
              </div>

              <div className="border-slate-200/80 text-sm text-slate-500 lg:border-l lg:pl-8">
                <p>{siteText("global-company", "copyright", tr("footer.copyright", "© {{year}} T2M Media & Solutions.", { year: currentYear }), { year: currentYear })}</p>
                <p className="mt-1">{tr("footer.rights", "All rights reserved.")}</p>
              </div>

              <button
                type="button"
                onClick={scrollToTop}
                aria-label={tr("footer.backToTop", "Lên đầu trang")}
                className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-50 text-blue-600 ring-1 ring-blue-100 transition hover:-translate-y-1 hover:bg-blue-600 hover:text-white"
              >
                <ArrowUp className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
}

function FooterColumn({ title, children, className = "" }: { title: string; children: React.ReactNode; className?: string }) {
  return (
    <div className={className}>
      <h3 className="text-xs font-extrabold uppercase tracking-[0.18em] text-slate-950">{title}</h3>
      <nav className="mt-5 grid gap-3">{children}</nav>
    </div>
  );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href} className="text-[15px] font-medium text-slate-600 transition hover:translate-x-1 hover:text-blue-600">
      {children}
    </Link>
  );
}

function ContactLine({ icon: Icon, children }: { icon: LucideIcon; children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3 text-sm text-slate-600">
      <Icon className="h-4 w-4 shrink-0 text-blue-600" />
      <span>{children}</span>
    </div>
  );
}
