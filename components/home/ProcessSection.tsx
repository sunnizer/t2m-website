"use client";

import Container from "@/components/layout/Container";
import SectionTitle from "@/components/ui/SectionTitle";
import Button from "@/components/ui/Button";
import { useLanguage } from "@/components/providers/LanguageProvider";
import {
  BarChart3,
  CalendarRange,
  MessagesSquare,
  Workflow,
  ArrowRight,
  BadgeCheck,
} from "lucide-react";

const services = [
  {
    titleKey: "home.services.items.performanceMarketing.title",
    titleFallback: "Performance Marketing",
    descriptionKey: "home.services.items.performanceMarketing.description",
    descriptionFallback:
      "Triển khai và tối ưu quảng cáo theo mục tiêu traffic, lead, engagement hoặc conversion.",
    icon: BarChart3,
    tags: [
      {
        key: "home.services.items.performanceMarketing.tags.meta",
        fallback: "Meta",
      },
      {
        key: "home.services.items.performanceMarketing.tags.tiktok",
        fallback: "TikTok",
      },
      {
        key: "home.services.items.performanceMarketing.tags.google",
        fallback: "Google",
      },
      {
        key: "home.services.items.performanceMarketing.tags.lead",
        fallback: "Lead",
      },
      {
        key: "home.services.items.performanceMarketing.tags.conversion",
        fallback: "Conversion",
      },
    ],
  },
  {
    titleKey: "home.services.items.mediaPlanning.title",
    titleFallback: "Media Planning",
    descriptionKey: "home.services.items.mediaPlanning.description",
    descriptionFallback:
      "Xây dựng kế hoạch kênh, ngân sách, KPI và timeline phù hợp với mục tiêu chiến dịch.",
    icon: CalendarRange,
    tags: [
      {
        key: "home.services.items.mediaPlanning.tags.channelMix",
        fallback: "Channel Mix",
      },
      {
        key: "home.services.items.mediaPlanning.tags.budget",
        fallback: "Budget",
      },
      {
        key: "home.services.items.mediaPlanning.tags.kpi",
        fallback: "KPI",
      },
      {
        key: "home.services.items.mediaPlanning.tags.timeline",
        fallback: "Timeline",
      },
    ],
  },
  {
    titleKey: "home.services.items.socialMediaSeeding.title",
    titleFallback: "Social Media & Seeding",
    descriptionKey: "home.services.items.socialMediaSeeding.description",
    descriptionFallback:
      "Hỗ trợ social content direction, seeding cộng đồng và tạo social proof cho campaign.",
    icon: MessagesSquare,
    tags: [
      {
        key: "home.services.items.socialMediaSeeding.tags.seeding",
        fallback: "Seeding",
      },
      {
        key: "home.services.items.socialMediaSeeding.tags.community",
        fallback: "Community",
      },
      {
        key: "home.services.items.socialMediaSeeding.tags.comment",
        fallback: "Comment",
      },
      {
        key: "home.services.items.socialMediaSeeding.tags.socialProof",
        fallback: "Social Proof",
      },
    ],
  },
  {
    titleKey: "home.services.items.trackingReportAutomation.title",
    titleFallback: "Tracking, Report & Automation",
    descriptionKey: "home.services.items.trackingReportAutomation.description",
    descriptionFallback:
      "Thiết lập tracking, dashboard, báo cáo và workflow automation để giảm lỗi thủ công.",
    icon: Workflow,
    tags: [
      {
        key: "home.services.items.trackingReportAutomation.tags.dashboard",
        fallback: "Dashboard",
      },
      {
        key: "home.services.items.trackingReportAutomation.tags.googleSheet",
        fallback: "Google Sheet",
      },
      {
        key: "home.services.items.trackingReportAutomation.tags.appsScript",
        fallback: "Apps Script",
      },
      {
        key: "home.services.items.trackingReportAutomation.tags.apiWorkflow",
        fallback: "API Workflow",
      },
    ],
  },
];

export default function ServicesSection() {
  const { tr } = useLanguage();

  return (
    <section className="border-y border-white/10 bg-slate-900/40 py-14 sm:py-20 lg:py-24">
      <Container>
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <SectionTitle
            eyebrow={tr("home.services.eyebrow", "Services")}
            title={tr("home.services.title", "Dịch vụ chính của T2M")}
            description={tr(
              "home.services.description",
              "Các hạng mục cốt lõi giúp campaign được lập kế hoạch, triển khai, theo dõi và tối ưu rõ ràng."
            )}
          />

          <Button href="/services" variant="secondary">
            {tr("home.services.viewAllCta", "Xem tất cả dịch vụ")}
          </Button>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-2 lg:gap-5">
          {services.map((service) => {
            const Icon = service.icon;

            return (
              <div
                key={service.titleKey}
                className="group relative overflow-hidden rounded-3xl border border-white/10 bg-slate-950/80 p-5 transition duration-300 hover:-translate-y-1 hover:border-cyan-400/40 hover:shadow-2xl hover:shadow-cyan-950/20 sm:p-6"
              >
                <div className="absolute right-0 top-0 h-28 w-28 rounded-full bg-cyan-400/10 blur-3xl transition group-hover:bg-cyan-400/20" />

                <div className="relative">
                  <div className="flex items-start justify-between gap-4">
                    <div className="rounded-2xl border border-cyan-400/20 bg-cyan-400/10 p-3 text-cyan-300">
                      <Icon className="h-6 w-6" />
                    </div>

                    <ArrowRight className="h-5 w-5 text-slate-600 transition group-hover:text-cyan-300" />
                  </div>

                  <h3 className="mt-5 text-lg font-semibold text-white sm:text-xl">
                    {tr(service.titleKey, service.titleFallback)}
                  </h3>

                  <p className="mt-4 text-sm leading-7 text-slate-400">
                    {tr(service.descriptionKey, service.descriptionFallback)}
                  </p>

                  <div className="mt-6 flex flex-wrap gap-2">
                    {service.tags.map((tag) => (
                      <span
                        key={tag.key}
                        className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs text-slate-300"
                      >
                        {tr(tag.key, tag.fallback)}
                      </span>
                    ))}
                  </div>

                  <div className="mt-6 flex items-center gap-2 text-sm text-slate-300">
                    <BadgeCheck className="h-4 w-4 text-cyan-300" />
                    {tr(
                      "home.services.cardNote",
                      "Phù hợp với campaign cần triển khai rõ ràng"
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-8 rounded-[2rem] border border-white/10 bg-white/[0.03] p-6 sm:p-8">
          <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <h3 className="text-xl font-semibold text-white">
                {tr(
                  "home.services.operation.title",
                  "Campaign operation có hệ thống"
                )}
              </h3>
              <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-400">
                {tr(
                  "home.services.operation.description",
                  "T2M kết hợp planning, media execution, social seeding, tracking và reporting để giúp chiến dịch vận hành gọn hơn, rõ hơn và dễ kiểm soát hơn."
                )}
              </p>
            </div>

            <Button href="/contact" size="lg" className="w-full sm:w-auto">
              {tr("home.services.operation.cta", "Trao đổi nhu cầu")}
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}