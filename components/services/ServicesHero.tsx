"use client";

import Image from "next/image";
import Container from "@/components/layout/Container";
import Button from "@/components/ui/Button";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { ArrowDownRight, ArrowRight, Sparkles } from "lucide-react";

const previews = [
  { src: "/visuals/services/performance-marketing.svg", vi: "Quảng cáo", en: "Ads" },
  { src: "/visuals/services/media-planning.svg", vi: "Kế hoạch", en: "Planning" },
  { src: "/visuals/services/social-seeding.svg", vi: "Cộng đồng", en: "Community" },
  { src: "/visuals/services/tracking-reporting.svg", vi: "Đo lường", en: "Measurement" },
];

export default function ServicesHero() {
  const { locale, tr } = useLanguage();

  return (
    <section className="relative overflow-hidden bg-[#f3f8ff] py-14 text-slate-950 sm:py-20 lg:py-24">
      <div className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-cyan-200/50 blur-3xl" />
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-[0.88fr_1.12fr] lg:gap-16">
          <div className="relative">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-100 bg-white px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-blue-700 shadow-sm">
              <Sparkles className="h-4 w-4" />
              {tr("services.hero.badge", "Dịch vụ T2M")}
            </div>
            <h1 className="max-w-xl text-4xl font-bold leading-[1.1] tracking-tight sm:text-5xl lg:text-[3.65rem]">
              {locale === "vi" ? "Từ ý tưởng đến " : "From idea to "}
              <span className="text-blue-600">
                {locale === "vi" ? "chiến dịch có thể đo lường." : "measurable campaigns."}
              </span>
            </h1>
            <p className="mt-6 max-w-lg text-base leading-8 text-slate-600 sm:text-lg">
              {locale === "vi"
                ? "Chọn đúng việc bạn cần. T2M giúp lên kế hoạch, triển khai, tạo thảo luận và theo dõi kết quả."
                : "Choose the support you need. T2M plans, runs, sparks conversations and tracks your campaign."}
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button href="#service-pillars" size="lg" className="bg-blue-600 text-white hover:bg-blue-500">
                {locale === "vi" ? "Khám phá 4 dịch vụ" : "Explore 4 services"}
                <ArrowDownRight className="ml-2 h-4 w-4" />
              </Button>
              <Button href="/contact" variant="secondary" size="lg" className="border-blue-200 bg-white text-blue-700 hover:bg-blue-50">
                {tr("services.hero.primaryCta", "Gửi brief cho T2M")}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="relative grid grid-cols-2 gap-3 rounded-[2rem] border border-white bg-white/60 p-3 shadow-[0_30px_90px_rgba(30,64,175,0.12)] sm:gap-4 sm:p-4">
            {previews.map((preview, index) => (
              <div key={preview.src} className="relative aspect-[1.15] overflow-hidden rounded-2xl bg-blue-50 sm:rounded-3xl">
                <Image
                  src={preview.src}
                  alt={locale === "vi" ? `Minh họa dịch vụ ${preview.vi}` : `${preview.en} service illustration`}
                  fill
                  priority={index === 0}
                  sizes="(max-width: 640px) 44vw, (max-width: 1024px) 42vw, 25vw"
                  className="object-cover"
                />
                <span className="absolute bottom-2 left-2 rounded-full bg-white/95 px-3 py-1.5 text-[11px] font-bold text-slate-800 shadow-sm sm:bottom-3 sm:left-3 sm:text-xs">
                  {locale === "vi" ? preview.vi : preview.en}
                </span>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
