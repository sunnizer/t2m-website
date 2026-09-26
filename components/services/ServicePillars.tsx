"use client";

import Image from "next/image";
import Link from "next/link";
import Container from "@/components/layout/Container";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { ArrowUpRight, Check } from "lucide-react";

const services = [
  {
    titleKey: "services.pillars.items.performanceMarketing.title",
    title: "Performance Marketing",
    image: "/visuals/services/performance-marketing.svg",
    vi: { need: "Cần quảng cáo tạo ra khách hàng tiềm năng?", action: "Chạy và tối ưu quảng cáo trên các kênh phù hợp.", output: "Kế hoạch chạy ads · Báo cáo hiệu quả" },
    en: { need: "Need ads that bring in potential customers?", action: "Launch and optimize ads on the right channels.", output: "Ad plan · Performance report" },
  },
  {
    titleKey: "services.pillars.items.mediaPlanning.title",
    title: "Media Planning",
    image: "/visuals/services/media-planning.svg",
    vi: { need: "Chưa biết phân bổ ngân sách và kênh?", action: "Lên lộ trình, kênh, ngân sách và KPI cho từng giai đoạn.", output: "Media plan · Timeline · KPI" },
    en: { need: "Unsure where your budget should go?", action: "Map out channels, budget, timing and KPIs.", output: "Media plan · Timeline · KPIs" },
  },
  {
    titleKey: "services.pillars.items.socialMediaSeeding.title",
    title: "Social Media & Seeding",
    image: "/visuals/services/social-seeding.svg",
    vi: { need: "Muốn chiến dịch có thêm thảo luận?", action: "Định hướng nội dung và triển khai tương tác cộng đồng.", output: "Seeding plan · Theo dõi thảo luận" },
    en: { need: "Want more conversation around your campaign?", action: "Shape content and engage relevant communities.", output: "Seeding plan · Conversation tracking" },
  },
  {
    titleKey: "services.pillars.items.trackingReportAutomation.title",
    title: "Tracking, Report & Automation",
    image: "/visuals/services/tracking-reporting.svg",
    vi: { need: "Số liệu rời rạc, báo cáo mất thời gian?", action: "Gom dữ liệu, thiết lập dashboard và tự động hóa việc lặp lại.", output: "Tracking sheet · Dashboard · Báo cáo" },
    en: { need: "Scattered data and slow reporting?", action: "Bring data together with dashboards and useful automation.", output: "Tracking sheet · Dashboard · Report" },
  },
];

export default function ServicePillars() {
  const { locale, tr } = useLanguage();

  return (
    <section id="service-pillars" className="scroll-mt-20 bg-white py-16 text-slate-950 sm:py-20 lg:py-24">
      <Container>
        <div className="max-w-3xl">
          <span className="text-xs font-bold uppercase tracking-[0.22em] text-blue-600">
            {tr("services.pillars.badge", "Dịch vụ cốt lõi")}
          </span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-5xl">
            {locale === "vi" ? "Bạn đang cần giải quyết điều gì?" : "What do you need to solve?"}
          </h2>
          <p className="mt-5 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
            {locale === "vi"
              ? "Nhìn nhu cầu, chọn dịch vụ. Mỗi hạng mục đều có đầu ra rõ ràng."
              : "Start with your need. Each service has a clear deliverable."}
          </p>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:gap-8">
          {services.map((service, index) => {
            const copy = service[locale];
            return (
              <article key={service.image} className="group overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-[0_18px_55px_rgba(15,23,42,0.07)] transition-shadow hover:shadow-[0_24px_65px_rgba(37,99,235,0.14)]">
                <div className="relative aspect-[1.7] overflow-hidden bg-blue-50">
                  <Image
                    src={service.image}
                    alt={locale === "vi" ? `Minh họa ${service.title}` : `${service.title} illustration`}
                    fill
                    sizes="(max-width: 767px) 100vw, 50vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.035]"
                  />
                  <span className="absolute left-5 top-5 rounded-full bg-white/95 px-3 py-1 text-xs font-bold text-blue-700 shadow-sm">0{index + 1} / 04</span>
                </div>
                <div className="p-6 sm:p-8">
                  <span className="text-xs font-bold uppercase tracking-[0.17em] text-blue-600">
                    {tr(service.titleKey, service.title)}
                  </span>
                  <h3 className="mt-3 text-2xl font-bold leading-snug tracking-tight sm:text-[1.7rem]">{copy.need}</h3>
                  <p className="mt-3 text-sm leading-7 text-slate-600 sm:text-base">{copy.action}</p>
                  <div className="mt-6 flex flex-wrap items-center gap-2 border-t border-slate-100 pt-5 text-sm font-semibold text-slate-700">
                    <Check className="h-4 w-4 shrink-0 text-blue-600" />
                    <span>{locale === "vi" ? "Bạn nhận:" : "You get:"} {copy.output}</span>
                  </div>
                  <Link href="/contact" className="mt-5 inline-flex items-center gap-1 text-sm font-bold text-blue-700 underline-offset-4 hover:underline">
                    {locale === "vi" ? "Trao đổi về dịch vụ này" : "Discuss this service"}
                    <ArrowUpRight className="h-4 w-4" />
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
