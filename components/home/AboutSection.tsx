"use client";

import Container from "@/components/layout/Container";
import { useLanguage } from "@/components/providers/LanguageProvider";
import {
  ClipboardList,
  Rocket,
  MessagesSquare,
  LineChart,
  FileBarChart,
  Workflow,
  TrendingUp,
  ArrowRight,
} from "lucide-react";

const workflow = [
  {
    number: "01",
    titleKey: "home.about.workflow.planning.title",
    titleFallback: "Planning",
    subtitleKey: "home.about.workflow.planning.subtitle",
    subtitleFallback: "strategy setup",
    icon: ClipboardList,
    mini: [
      {
        key: "home.about.workflow.planning.mini.objective",
        fallback: "Objective",
      },
      {
        key: "home.about.workflow.planning.mini.audience",
        fallback: "Audience",
      },
      {
        key: "home.about.workflow.planning.mini.budget",
        fallback: "Budget",
      },
    ],
  },
  {
    number: "02",
    titleKey: "home.about.workflow.campaignExecution.title",
    titleFallback: "Campaign Execution",
    subtitleKey: "home.about.workflow.campaignExecution.subtitle",
    subtitleFallback: "launch & manage",
    icon: Rocket,
    mini: [
      {
        key: "home.about.workflow.campaignExecution.mini.live",
        fallback: "Live",
      },
      {
        key: "home.about.workflow.campaignExecution.mini.monitor",
        fallback: "Monitor",
      },
    ],
  },
  {
    number: "03",
    titleKey: "home.about.workflow.socialEngagement.title",
    titleFallback: "Social Engagement",
    subtitleKey: "home.about.workflow.socialEngagement.subtitle",
    subtitleFallback: "audience signals",
    icon: MessagesSquare,
    mini: [
      {
        key: "home.about.workflow.socialEngagement.mini.comments",
        fallback: "Comments",
      },
      {
        key: "home.about.workflow.socialEngagement.mini.shares",
        fallback: "Shares",
      },
      {
        key: "home.about.workflow.socialEngagement.mini.reach",
        fallback: "Reach",
      },
    ],
  },
  {
    number: "04",
    titleKey: "home.about.workflow.performanceTracking.title",
    titleFallback: "Performance Tracking",
    subtitleKey: "home.about.workflow.performanceTracking.subtitle",
    subtitleFallback: "measure results",
    icon: LineChart,
    mini: [
      {
        key: "home.about.workflow.performanceTracking.mini.ctr",
        fallback: "CTR",
      },
      {
        key: "home.about.workflow.performanceTracking.mini.cpa",
        fallback: "CPA",
      },
      {
        key: "home.about.workflow.performanceTracking.mini.lead",
        fallback: "Lead",
      },
    ],
  },
  {
    number: "05",
    titleKey: "home.about.workflow.reporting.title",
    titleFallback: "Reporting",
    subtitleKey: "home.about.workflow.reporting.subtitle",
    subtitleFallback: "clear insights",
    icon: FileBarChart,
    mini: [
      {
        key: "home.about.workflow.reporting.mini.dashboard",
        fallback: "Dashboard",
      },
      {
        key: "home.about.workflow.reporting.mini.learning",
        fallback: "Learning",
      },
    ],
  },
  {
    number: "06",
    titleKey: "home.about.workflow.automation.title",
    titleFallback: "Automation",
    subtitleKey: "home.about.workflow.automation.subtitle",
    subtitleFallback: "smart workflows",
    icon: Workflow,
    mini: [
      {
        key: "home.about.workflow.automation.mini.sheet",
        fallback: "Sheet",
      },
      {
        key: "home.about.workflow.automation.mini.api",
        fallback: "API",
      },
      {
        key: "home.about.workflow.automation.mini.alert",
        fallback: "Alert",
      },
    ],
  },
  {
    number: "07",
    titleKey: "home.about.workflow.optimization.title",
    titleFallback: "Optimization",
    subtitleKey: "home.about.workflow.optimization.subtitle",
    subtitleFallback: "continuous improvement",
    icon: TrendingUp,
    mini: [
      {
        key: "home.about.workflow.optimization.mini.test",
        fallback: "Test",
      },
      {
        key: "home.about.workflow.optimization.mini.scale",
        fallback: "Scale",
      },
    ],
  },
];

const principles = [
  {
    titleKey: "home.about.principles.practical.title",
    titleFallback: "Thực chiến",
    descriptionKey: "home.about.principles.practical.description",
    descriptionFallback:
      "Tập trung vào việc có thể triển khai, đo lường và tối ưu được.",
  },
  {
    titleKey: "home.about.principles.flexible.title",
    titleFallback: "Linh hoạt",
    descriptionKey: "home.about.principles.flexible.description",
    descriptionFallback:
      "Phù hợp với SME, startup hoặc agency cần outsource execution.",
  },
  {
    titleKey: "home.about.principles.systematic.title",
    titleFallback: "Có hệ thống",
    descriptionKey: "home.about.principles.systematic.description",
    descriptionFallback:
      "Kết hợp tracking, reporting và automation để giảm lỗi vận hành.",
  },
];

export default function AboutSection() {
  const { tr } = useLanguage();

  return (
    <section className="relative overflow-hidden bg-slate-50 py-16 text-slate-950 sm:py-20 lg:py-24">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,rgba(37,99,235,0.12),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(34,211,238,0.18),transparent_35%)]" />

      <div className="absolute bottom-0 left-0 right-0 -z-10 h-40 bg-gradient-to-r from-cyan-100 via-blue-100 to-blue-500/30" />
      <div className="absolute bottom-0 left-0 right-0 -z-10 h-28 rounded-[100%_100%_0_0] bg-white/60 blur-xl" />

      <Container>
        <div className="mx-auto max-w-4xl text-center">
          <div className="mx-auto mb-5 inline-flex rounded-full border border-blue-100 bg-white px-5 py-2 text-xs font-bold uppercase tracking-[0.28em] text-blue-600 shadow-sm">
            {tr("home.about.badge", "About T2M")}
          </div>

          <h2 className="text-3xl font-bold tracking-tight text-slate-950 sm:text-5xl">
            {tr("home.about.titlePrefix", "Your")}{" "}
            <span className="bg-gradient-to-r from-cyan-500 to-blue-600 bg-clip-text text-transparent">
              {tr("home.about.titleHighlight", "Digital Growth")}
            </span>{" "}
            {tr("home.about.titleSuffix", "Partner")}
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-slate-600 sm:text-lg">
            {tr(
              "home.about.description",
              "T2M đồng hành cùng doanh nghiệp và agency trong toàn bộ quá trình triển khai digital campaign — từ planning, execution, seeding, tracking đến reporting và automation."
            )}
          </p>
        </div>

        <div className="mt-12 overflow-x-auto pb-4">
          <div className="grid min-w-[1180px] grid-cols-7 gap-5">
            {workflow.map((item, index) => {
              const Icon = item.icon;

              return (
                <div key={item.number} className="relative">
                  {index < workflow.length - 1 && (
                    <div className="absolute left-[calc(100%-6px)] top-[92px] z-20 hidden w-10 items-center lg:flex">
                      <div className="h-px flex-1 border-t border-dashed border-blue-200" />
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-white shadow-lg shadow-blue-600/25">
                        <ArrowRight className="h-4 w-4" />
                      </div>
                    </div>
                  )}

                  <div className="group relative min-h-[300px] rounded-[1.75rem] border border-slate-200 bg-white p-5 shadow-[0_20px_60px_rgba(15,23,42,0.08)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_24px_70px_rgba(37,99,235,0.16)]">
                    <div className="absolute left-5 top-5 flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-cyan-400 to-blue-600 text-sm font-bold text-white shadow-lg shadow-blue-500/25">
                      {item.number}
                    </div>

                    <div className="mt-12 flex justify-center">
                      <div className="flex h-24 w-24 items-center justify-center rounded-full bg-slate-50 text-blue-600 shadow-inner">
                        <Icon className="h-11 w-11" />
                      </div>
                    </div>

                    <div className="mt-6 text-center">
                      <h3 className="text-base font-bold text-slate-950">
                        {tr(item.titleKey, item.titleFallback)}
                      </h3>
                      <p className="mt-2 text-sm text-slate-500">
                        {tr(item.subtitleKey, item.subtitleFallback)}
                      </p>
                    </div>

                    <div className="mt-6 rounded-2xl border border-slate-100 bg-slate-50 p-3">
                      <div className="flex flex-wrap justify-center gap-2">
                        {item.mini.map((mini) => (
                          <span
                            key={mini.key}
                            className="rounded-full bg-white px-3 py-1 text-[11px] font-semibold text-slate-600 shadow-sm"
                          >
                            {tr(mini.key, mini.fallback)}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="mt-8 grid gap-4 rounded-[2rem] border border-blue-100 bg-white/80 p-5 shadow-sm backdrop-blur sm:grid-cols-3 sm:p-6">
          {principles.map((item) => (
            <div key={item.titleKey}>
              <p className="text-sm font-bold text-slate-950">
                {tr(item.titleKey, item.titleFallback)}
              </p>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                {tr(item.descriptionKey, item.descriptionFallback)}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}