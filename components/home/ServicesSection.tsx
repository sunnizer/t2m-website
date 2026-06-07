"use client";

import Link from "next/link";
import Container from "@/components/layout/Container";
import { useLanguage } from "@/components/providers/LanguageProvider";
import {
  ArrowRight,
  CheckCircle2,
  ClipboardList,
  LineChart,
  Megaphone,
  Rocket,
  ShieldCheck,
  Target,
  UsersRound,
  Workflow,
} from "lucide-react";

const services = [
  {
    titleKey: "home.services.items.performanceMarketing.title",
    titleFallback: "Performance Marketing",
    subtitleKey: "home.services.items.performanceMarketing.subtitle",
    subtitleFallback:
      "Tối ưu traffic, lead và hiệu quả media theo KPI rõ ràng.",
    icon: Target,
    image: "/visuals/services/performance-marketing.svg",
    accent: "from-blue-600 to-cyan-400",
    tags: [
      {
        key: "home.services.items.performanceMarketing.tags.foundation",
        fallback: "Đa nền tảng",
      },
      {
        key: "home.services.items.performanceMarketing.tags.kpi",
        fallback: "Theo KPI",
      },
      {
        key: "home.services.items.performanceMarketing.tags.cost",
        fallback: "Kiểm soát chi phí",
      },
    ],
  },
  {
    titleKey: "home.services.items.mediaPlanning.title",
    titleFallback: "Media Planning",
    subtitleKey: "home.services.items.mediaPlanning.subtitle",
    subtitleFallback: "Lập kế hoạch kênh, KPI, ngân sách và timeline rõ ràng.",
    icon: ClipboardList,
    image: "/visuals/services/media-planning.svg",
    accent: "from-cyan-500 to-teal-400",
    tags: [
      {
        key: "home.services.items.mediaPlanning.tags.channelMix",
        fallback: "Channel mix",
      },
      {
        key: "home.services.items.mediaPlanning.tags.budget",
        fallback: "Budget split",
      },
      {
        key: "home.services.items.mediaPlanning.tags.timeline",
        fallback: "Timeline rõ ràng",
      },
    ],
  },
  {
    titleKey: "home.services.items.socialMediaSeeding.title",
    titleFallback: "Social Seeding & Community",
    subtitleKey: "home.services.items.socialMediaSeeding.subtitle",
    subtitleFallback: "Kích hoạt thảo luận và social proof cho campaign.",
    icon: UsersRound,
    image: "/visuals/services/social-seeding.svg",
    accent: "from-sky-500 to-blue-600",
    tags: [
      {
        key: "home.services.items.socialMediaSeeding.tags.discussion",
        fallback: "Tạo thảo luận",
      },
      {
        key: "home.services.items.socialMediaSeeding.tags.signal",
        fallback: "Tăng tín hiệu cộng đồng",
      },
      {
        key: "home.services.items.socialMediaSeeding.tags.amplification",
        fallback: "Hỗ trợ amplification",
      },
    ],
  },
  {
    titleKey: "home.services.items.trackingReportAutomation.title",
    titleFallback: "Tracking, Reporting & Automation",
    subtitleKey: "home.services.items.trackingReportAutomation.subtitle",
    subtitleFallback:
      "Theo dõi dữ liệu, giảm thao tác thủ công và tối ưu nhanh hơn.",
    icon: Workflow,
    image: "/visuals/services/tracking-reporting.svg",
    accent: "from-teal-400 to-blue-600",
    tags: [
      {
        key: "home.services.items.trackingReportAutomation.tags.dashboard",
        fallback: "Dashboard gọn",
      },
      {
        key: "home.services.items.trackingReportAutomation.tags.report",
        fallback: "Report dễ đọc",
      },
      {
        key: "home.services.items.trackingReportAutomation.tags.workflow",
        fallback: "Workflow tự động",
      },
    ],
  },
];

const flow = [
  {
    titleKey: "home.services.flow.plan.title",
    titleFallback: "Plan",
    subtitleKey: "home.services.flow.plan.subtitle",
    subtitleFallback: "Lập kế hoạch",
    icon: ClipboardList,
  },
  {
    titleKey: "home.services.flow.launch.title",
    titleFallback: "Launch",
    subtitleKey: "home.services.flow.launch.subtitle",
    subtitleFallback: "Triển khai",
    icon: Rocket,
  },
  {
    titleKey: "home.services.flow.amplify.title",
    titleFallback: "Amplify",
    subtitleKey: "home.services.flow.amplify.subtitle",
    subtitleFallback: "Kích hoạt",
    icon: Megaphone,
  },
  {
    titleKey: "home.services.flow.track.title",
    titleFallback: "Track",
    subtitleKey: "home.services.flow.track.subtitle",
    subtitleFallback: "Đo lường & tối ưu",
    icon: LineChart,
  },
];

export default function ServicesSection() {
  const { tr } = useLanguage();

  return (
    <section className="relative overflow-hidden bg-white py-14 text-slate-950 sm:py-20 lg:py-20">
      <div className="absolute inset-x-0 top-0 -z-10 h-[520px] bg-[radial-gradient(circle_at_18%_5%,rgba(59,130,246,0.12),transparent_32%),radial-gradient(circle_at_82%_10%,rgba(45,212,191,0.16),transparent_30%)]" />

      <Container>
        <div className="mx-auto max-w-5xl text-center">
          <div className="mx-auto mb-4 inline-flex rounded-full bg-blue-50 px-6 py-2 text-xs font-extrabold uppercase tracking-[0.32em] text-blue-600 shadow-sm ring-1 ring-blue-100/80">
            {tr("home.services.badge", "Dịch vụ cốt lõi")}
          </div>

          <h2 className="text-3xl font-black tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
            {tr(
              "home.services.title",
              "Giải pháp giúp campaign vận hành hiệu quả hơn",
            )}
          </h2>

          <p className="mx-auto mt-5 max-w-3xl text-base leading-8 text-slate-600 sm:text-lg">
            {tr(
              "home.services.description",
              "Từ planning đến tracking, T2M giúp chiến dịch rõ hơn, gọn hơn và dễ kiểm soát hơn.",
            )}
          </p>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {services.map((service) => {
            const Icon = service.icon;

            return (
              <article
                key={service.titleKey}
                className="group relative overflow-hidden rounded-[1.75rem] border border-slate-200 bg-white shadow-[0_22px_70px_rgba(15,23,42,0.08)] transition duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-[0_26px_80px_rgba(37,99,235,0.16)]"
              >
                <div className="relative h-44 overflow-hidden bg-slate-100">
                  <img
                    src={service.image}
                    alt={tr(service.titleKey, service.titleFallback)}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/20 via-transparent to-white/5" />
                </div>

                <div className="relative p-5 sm:p-6">
                  <div className="-mt-12 mb-4 flex items-end justify-between gap-3">
                    <div
                      className={`flex h-16 w-16 items-center justify-center rounded-3xl bg-gradient-to-br ${service.accent} text-white shadow-[0_16px_34px_rgba(37,99,235,0.25)] ring-4 ring-white`}
                    >
                      <Icon className="h-8 w-8" />
                    </div>
                    <Link
                      href="/services"
                      className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-blue-600 shadow-sm transition group-hover:translate-x-1 group-hover:border-blue-200 group-hover:bg-blue-50"
                      aria-label={tr("home.services.cardCta", "Xem chi tiết")}
                    >
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>

                  <h3 className="line-clamp-2 min-h-[3.25rem] text-xl font-extrabold leading-tight text-slate-950">
                    {tr(service.titleKey, service.titleFallback)}
                  </h3>

                  <p className="mt-2 min-h-[3rem] text-sm leading-6 text-slate-600">
                    {tr(service.subtitleKey, service.subtitleFallback)}
                  </p>

                  <div className="mt-5 flex flex-wrap gap-2">
                    {service.tags.map((tag) => (
                      <span
                        key={tag.key}
                        className="inline-flex items-center gap-1.5 rounded-xl border border-blue-100 bg-blue-50/60 px-3 py-2 text-[11px] font-bold text-slate-700"
                      >
                        <CheckCircle2 className="h-3.5 w-3.5 text-blue-600" />
                        {tr(tag.key, tag.fallback)}
                      </span>
                    ))}
                  </div>

                  <Link
                    href="/services"
                    className="mt-5 inline-flex items-center text-sm font-extrabold text-blue-600 transition hover:text-blue-500"
                  >
                    {tr("home.services.cardCta", "Xem chi tiết")}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </div>
              </article>
            );
          })}
        </div>

        <div className="mt-8 hidden items-center justify-center gap-4 lg:flex">
          {flow.map((item, index) => {
            const Icon = item.icon;
            return (
              <div key={item.titleKey} className="flex items-center gap-4">
                <div className="flex min-w-[230px] items-center gap-4 rounded-[1.4rem] border border-slate-200 bg-white px-7 py-4 shadow-[0_18px_50px_rgba(15,23,42,0.06)]">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-50 text-cyan-600">
                    <Icon className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-lg font-extrabold text-slate-950">
                      {tr(item.titleKey, item.titleFallback)}
                    </p>
                    <p className="text-sm font-medium text-slate-500">
                      {tr(item.subtitleKey, item.subtitleFallback)}
                    </p>
                  </div>
                </div>
                {index < flow.length - 1 && (
                  <div className="flex w-20 items-center justify-center text-blue-400">
                    <span className="h-px flex-1 border-t border-dashed border-blue-300" />
                    <ArrowRight className="h-5 w-5" />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="relative mt-10 overflow-hidden rounded-[2rem] bg-gradient-to-r from-blue-600 via-blue-500 to-teal-400 p-7 text-white shadow-[0_28px_90px_rgba(37,99,235,0.24)] sm:p-9">
          <div className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-white/20 blur-3xl" />
          <div className="absolute bottom-0 right-8 hidden h-32 w-48 rounded-t-[2rem] border border-white/25 bg-white/10 backdrop-blur-md lg:block" />
          <div className="relative grid gap-7 lg:grid-cols-[1.1fr_1.4fr] lg:items-center">
            <div>
              <h3 className="max-w-xl text-2xl font-black leading-tight sm:text-3xl">
                {tr(
                  "home.services.operation.title",
                  "Cần một partner triển khai campaign rõ hơn và gọn hơn?",
                )}
              </h3>
              <p className="mt-3 max-w-xl text-sm leading-7 text-blue-50 sm:text-base">
                {tr(
                  "home.services.operation.description",
                  "T2M phù hợp với brand, SME và agency cần đội ngũ hỗ trợ từ planning đến execution.",
                )}
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row lg:justify-center">
              <Link
                href="/contact"
                className="inline-flex h-14 items-center justify-center rounded-2xl bg-white px-8 text-base font-extrabold text-blue-600 shadow-[0_18px_40px_rgba(15,23,42,0.16)] transition hover:-translate-y-0.5 hover:bg-blue-50"
              >
                {tr(
                  "home.services.operation.primaryCta",
                  "Gửi brief nhận tư vấn",
                )}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link
                href="/case-studies"
                className="inline-flex h-14 items-center justify-center rounded-2xl border border-white/40 bg-white/10 px-8 text-base font-extrabold text-white backdrop-blur transition hover:-translate-y-0.5 hover:bg-white/15"
              >
                {tr("home.services.operation.secondaryCta", "Xem case studies")}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </div>

            <div className="flex items-center gap-3 text-sm font-semibold text-blue-50 lg:col-start-2 lg:-mt-4 lg:justify-center">
              <ShieldCheck className="h-5 w-5 shrink-0" />
              <span>
                {tr(
                  "home.services.operation.note",
                  "Có thể triển khai theo từng hạng mục hoặc đồng hành toàn campaign.",
                )}
              </span>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
