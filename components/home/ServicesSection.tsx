"use client";

import Container from "@/components/layout/Container";
import Button from "@/components/ui/Button";
import { useLanguage } from "@/components/providers/LanguageProvider";
import {
  ArrowRight,
  BarChart3,
  CalendarRange,
  CheckCircle2,
  Megaphone,
  MessagesSquare,
  MousePointerClick,
  PieChart,
  Workflow,
  Zap,
} from "lucide-react";

const services = [
  {
    titleKey: "home.services.items.performanceMarketing.title",
    titleFallback: "Performance Marketing",
    subtitleKey: "home.services.items.performanceMarketing.subtitle",
    subtitleFallback: "Tối ưu traffic, lead, engagement hoặc conversion.",
    icon: BarChart3,
    gradient: "from-blue-500 to-cyan-400",
    tags: [
      { key: "home.services.items.performanceMarketing.tags.meta", fallback: "Meta" },
      { key: "home.services.items.performanceMarketing.tags.tiktok", fallback: "TikTok" },
      { key: "home.services.items.performanceMarketing.tags.google", fallback: "Google" },
    ],
    visual: "growth",
  },
  {
    titleKey: "home.services.items.mediaPlanning.title",
    titleFallback: "Media Planning",
    subtitleKey: "home.services.items.mediaPlanning.subtitle",
    subtitleFallback: "Lập kế hoạch kênh, ngân sách, KPI và timeline.",
    icon: CalendarRange,
    gradient: "from-cyan-500 to-teal-400",
    tags: [
      { key: "home.services.items.mediaPlanning.tags.channelMix", fallback: "Channel Mix" },
      { key: "home.services.items.mediaPlanning.tags.budget", fallback: "Budget" },
      { key: "home.services.items.mediaPlanning.tags.kpi", fallback: "KPI" },
    ],
    visual: "plan",
  },
  {
    titleKey: "home.services.items.socialMediaSeeding.title",
    titleFallback: "Social Media & Seeding",
    subtitleKey: "home.services.items.socialMediaSeeding.subtitle",
    subtitleFallback: "Kích hoạt social proof, comment và tín hiệu cộng đồng.",
    icon: MessagesSquare,
    gradient: "from-blue-600 to-indigo-500",
    tags: [
      { key: "home.services.items.socialMediaSeeding.tags.seeding", fallback: "Seeding" },
      { key: "home.services.items.socialMediaSeeding.tags.community", fallback: "Community" },
      { key: "home.services.items.socialMediaSeeding.tags.socialProof", fallback: "Social Proof" },
    ],
    visual: "social",
  },
  {
    titleKey: "home.services.items.trackingReportAutomation.title",
    titleFallback: "Tracking, Report & Automation",
    subtitleKey: "home.services.items.trackingReportAutomation.subtitle",
    subtitleFallback: "Theo dõi dữ liệu, báo cáo và tự động hóa vận hành.",
    icon: Workflow,
    gradient: "from-cyan-500 to-blue-600",
    tags: [
      { key: "home.services.items.trackingReportAutomation.tags.dashboard", fallback: "Dashboard" },
      { key: "home.services.items.trackingReportAutomation.tags.report", fallback: "Report" },
      { key: "home.services.items.trackingReportAutomation.tags.automation", fallback: "Automation" },
    ],
    visual: "automation",
  },
];

function ServiceVisual({
  type,
  tr,
}: {
  type: string;
  tr: (key: string, fallback?: string) => string;
}) {
  if (type === "growth") {
    const metrics = [
      {
        labelKey: "home.services.visuals.growth.metrics.reach.label",
        labelFallback: "Reach",
        value: "82%",
      },
      {
        labelKey: "home.services.visuals.growth.metrics.lead.label",
        labelFallback: "Lead",
        value: "2.4K",
      },
      {
        labelKey: "home.services.visuals.growth.metrics.cpa.label",
        labelFallback: "CPA",
        value: "-18%",
      },
    ];

    return (
      <div className="mt-6 rounded-3xl border border-slate-100 bg-slate-50 p-4">
        <div className="grid grid-cols-3 gap-3">
          {metrics.map((item) => (
            <div
              key={item.labelKey}
              className="rounded-2xl bg-white p-3 shadow-sm"
            >
              <p className="text-[11px] font-semibold text-slate-400">
                {tr(item.labelKey, item.labelFallback)}
              </p>
              <p className="mt-1 text-lg font-bold text-slate-950">
                {item.value}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-4 flex h-20 items-end gap-2 rounded-2xl bg-white p-3 shadow-sm">
          {[30, 48, 42, 64, 58, 78, 92].map((height, index) => (
            <div
              key={index}
              className="flex-1 rounded-t-lg bg-gradient-to-t from-blue-600 to-cyan-300"
              style={{ height: `${height}%` }}
            />
          ))}
        </div>
      </div>
    );
  }

  if (type === "plan") {
    const channels = [
      {
        key: "home.services.visuals.plan.channels.meta",
        fallback: "Meta",
        percent: 38,
      },
      {
        key: "home.services.visuals.plan.channels.google",
        fallback: "Google",
        percent: 26,
      },
      {
        key: "home.services.visuals.plan.channels.tiktok",
        fallback: "TikTok",
        percent: 18,
      },
      {
        key: "home.services.visuals.plan.channels.social",
        fallback: "Social",
        percent: 18,
      },
    ];

    return (
      <div className="mt-6 rounded-3xl border border-slate-100 bg-slate-50 p-4">
        <div className="rounded-2xl bg-white p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-400">
              {tr("home.services.visuals.plan.title", "Channel Mix")}
            </p>
            <PieChart className="h-4 w-4 text-blue-600" />
          </div>

          <div className="mt-4 grid grid-cols-[88px_1fr] gap-4">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[conic-gradient(#2563eb_0_38%,#06b6d4_38%_64%,#22c55e_64%_82%,#cbd5e1_82%_100%)]">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-[10px] font-bold text-slate-700">
                100%
              </div>
            </div>

            <div className="space-y-2">
              {channels.map((item, index) => (
                <div
                  key={item.key}
                  className="flex items-center justify-between text-xs"
                >
                  <span className="flex items-center gap-2 text-slate-600">
                    <span
                      className={[
                        "h-2 w-2 rounded-full",
                        index === 0 && "bg-blue-600",
                        index === 1 && "bg-cyan-500",
                        index === 2 && "bg-green-500",
                        index === 3 && "bg-slate-300",
                      ]
                        .filter(Boolean)
                        .join(" ")}
                    />
                    {tr(item.key, item.fallback)}
                  </span>
                  <span className="font-semibold text-slate-700">
                    {item.percent}%
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (type === "social") {
    const platforms = [
      { key: "home.services.visuals.social.platforms.facebook", fallback: "FB" },
      { key: "home.services.visuals.social.platforms.tiktok", fallback: "TT" },
      { key: "home.services.visuals.social.platforms.youtube", fallback: "YT" },
      { key: "home.services.visuals.social.platforms.zalo", fallback: "ZL" },
    ];

    const metrics = [
      {
        labelKey: "home.services.visuals.social.metrics.comments.label",
        labelFallback: "Comments",
        value: "2.6K",
      },
      {
        labelKey: "home.services.visuals.social.metrics.shares.label",
        labelFallback: "Shares",
        value: "3.7K",
      },
      {
        labelKey: "home.services.visuals.social.metrics.engage.label",
        labelFallback: "Engage",
        value: "8.9%",
      },
    ];

    return (
      <div className="mt-6 rounded-3xl border border-slate-100 bg-slate-50 p-4">
        <div className="rounded-2xl bg-white p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-400">
              {tr("home.services.visuals.social.title", "Social Signals")}
            </p>
            <Megaphone className="h-4 w-4 text-blue-600" />
          </div>

          <div className="mt-4 grid grid-cols-4 gap-2">
            {platforms.map((item) => (
              <div
                key={item.key}
                className="flex h-10 items-center justify-center rounded-xl bg-slate-50 text-xs font-bold text-slate-700"
              >
                {tr(item.key, item.fallback)}
              </div>
            ))}
          </div>

          <div className="mt-4 grid grid-cols-3 gap-2">
            {metrics.map((item) => (
              <div key={item.labelKey} className="rounded-xl bg-slate-50 p-3">
                <p className="text-[10px] text-slate-400">
                  {tr(item.labelKey, item.labelFallback)}
                </p>
                <p className="mt-1 text-sm font-bold text-slate-950">
                  {item.value}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const workflowSteps = [
    {
      labelKey: "home.services.visuals.automation.steps.data",
      labelFallback: "Data",
      icon: BarChart3,
    },
    {
      labelKey: "home.services.visuals.automation.steps.track",
      labelFallback: "Track",
      icon: MousePointerClick,
    },
    {
      labelKey: "home.services.visuals.automation.steps.report",
      labelFallback: "Report",
      icon: CheckCircle2,
    },
  ];

  return (
    <div className="mt-6 rounded-3xl border border-slate-100 bg-slate-50 p-4">
      <div className="rounded-2xl bg-white p-4 shadow-sm">
        <div className="flex items-center justify-between">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-400">
            {tr("home.services.visuals.automation.title", "Workflow")}
          </p>
          <Zap className="h-4 w-4 text-blue-600" />
        </div>

        <div className="mt-5 flex items-center justify-between gap-2">
          {workflowSteps.map((item, index) => {
            const Icon = item.icon;

            return (
              <div key={item.labelKey} className="flex flex-1 items-center gap-2">
                <div className="flex flex-1 flex-col items-center">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
                    <Icon className="h-5 w-5" />
                  </div>
                  <p className="mt-2 text-xs font-semibold text-slate-600">
                    {tr(item.labelKey, item.labelFallback)}
                  </p>
                </div>

                {index < 2 && <ArrowRight className="h-4 w-4 text-slate-300" />}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default function ServicesSection() {
  const { tr } = useLanguage();

  return (
    <section className="relative overflow-hidden bg-white py-16 text-slate-950 sm:py-20 lg:py-24">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,rgba(37,99,235,0.08),transparent_32%),radial-gradient(circle_at_bottom_right,rgba(34,211,238,0.14),transparent_34%)]" />

      <Container>
        <div className="mx-auto max-w-4xl text-center">
          <div className="mx-auto mb-5 inline-flex rounded-full border border-blue-100 bg-white px-5 py-2 text-xs font-bold uppercase tracking-[0.28em] text-blue-600 shadow-sm">
            {tr("home.services.badge", "Services")}
          </div>

          <h2 className="text-3xl font-bold tracking-tight text-slate-950 sm:text-5xl">
            {tr("home.services.titlePrefix", "Giải pháp")}{" "}
            <span className="bg-gradient-to-r from-cyan-500 to-blue-600 bg-clip-text text-transparent">
              {tr("home.services.titleHighlight", "Digital Marketing")}
            </span>{" "}
            {tr(
              "home.services.titleSuffix",
              "cho campaign cần hiệu quả"
            )}
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-slate-600 sm:text-lg">
            {tr(
              "home.services.description",
              "T2M tập trung vào các hạng mục cốt lõi giúp chiến dịch được lập kế hoạch, triển khai, đo lường và tối ưu rõ ràng."
            )}
          </p>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-2">
          {services.map((service) => {
            const Icon = service.icon;

            return (
              <article
                key={service.titleKey}
                className="group relative overflow-hidden rounded-[2rem] border border-slate-200 bg-white p-5 shadow-[0_20px_60px_rgba(15,23,42,0.07)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_24px_70px_rgba(37,99,235,0.14)] sm:p-6"
              >
                <div className="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-blue-100 blur-3xl transition group-hover:bg-cyan-100" />

                <div className="relative">
                  <div className="flex items-start justify-between gap-4">
                    <div
                      className={`flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${service.gradient} text-white shadow-lg shadow-blue-500/20`}
                    >
                      <Icon className="h-7 w-7" />
                    </div>

                    <div className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-slate-50 text-blue-600 transition group-hover:translate-x-1">
                      <ArrowRight className="h-4 w-4" />
                    </div>
                  </div>

                  <h3 className="mt-6 text-xl font-bold text-slate-950">
                    {tr(service.titleKey, service.titleFallback)}
                  </h3>

                  <p className="mt-3 text-sm leading-7 text-slate-600">
                    {tr(service.subtitleKey, service.subtitleFallback)}
                  </p>

                  <div className="mt-5 flex flex-wrap gap-2">
                    {service.tags.map((tag) => (
                      <span
                        key={tag.key}
                        className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-semibold text-slate-600"
                      >
                        {tr(tag.key, tag.fallback)}
                      </span>
                    ))}
                  </div>

                  <ServiceVisual type={service.visual} tr={tr} />
                </div>
              </article>
            );
          })}
        </div>

        <div className="mt-8 rounded-[2rem] border border-blue-100 bg-gradient-to-r from-blue-50 via-white to-cyan-50 p-6 shadow-sm sm:p-8">
          <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <h3 className="text-xl font-bold text-slate-950">
                {tr(
                  "home.services.operation.title",
                  "Không chỉ là chạy ads, mà là vận hành campaign có hệ thống."
                )}
              </h3>
              <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-600">
                {tr(
                  "home.services.operation.description",
                  "T2M kết hợp planning, execution, social seeding, tracking và reporting để giúp chiến dịch rõ việc, rõ dữ liệu và dễ tối ưu hơn."
                )}
              </p>
            </div>

            <Button
              href="/contact"
              size="lg"
              className="w-full bg-blue-600 text-white shadow-[0_16px_32px_rgba(37,99,235,0.20)] hover:bg-blue-500 sm:w-auto"
            >
              {tr("home.services.operation.cta", "Trao đổi nhu cầu")}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}