"use client";

import Container from "@/components/layout/Container";
import { useLanguage } from "@/components/providers/LanguageProvider";
import {
  ArrowRight,
  BarChart3,
  CalendarRange,
  CheckCircle2,
  MessagesSquare,
  Workflow,
} from "lucide-react";

const services = [
  {
    titleKey: "services.pillars.items.performanceMarketing.title",
    titleFallback: "Performance Marketing",
    subtitleKey: "services.pillars.items.performanceMarketing.subtitle",
    subtitleFallback:
      "Triển khai và tối ưu quảng cáo theo mục tiêu traffic, lead, engagement hoặc conversion.",
    icon: BarChart3,
    tags: [
      { key: "services.pillars.items.performanceMarketing.tags.metaAds", fallback: "Meta Ads" },
      { key: "services.pillars.items.performanceMarketing.tags.tiktokAds", fallback: "TikTok Ads" },
      { key: "services.pillars.items.performanceMarketing.tags.googleAds", fallback: "Google Ads" },
      { key: "services.pillars.items.performanceMarketing.tags.lead", fallback: "Lead" },
      { key: "services.pillars.items.performanceMarketing.tags.conversion", fallback: "Conversion" },
    ],
    suitable: [
      { key: "services.pillars.items.performanceMarketing.suitable.productLaunch", fallback: "Campaign launch sản phẩm" },
      { key: "services.pillars.items.performanceMarketing.suitable.leadGeneration", fallback: "Lead generation" },
      { key: "services.pillars.items.performanceMarketing.suitable.trafficEngagement", fallback: "Tăng traffic / engagement" },
      { key: "services.pillars.items.performanceMarketing.suitable.mediaBudgetOptimization", fallback: "Tối ưu ngân sách media" },
    ],
    output: [
      { key: "services.pillars.items.performanceMarketing.output.campaignSetup", fallback: "Campaign setup" },
      { key: "services.pillars.items.performanceMarketing.output.audienceRecommendation", fallback: "Audience recommendation" },
      { key: "services.pillars.items.performanceMarketing.output.optimizationNote", fallback: "Optimization note" },
      { key: "services.pillars.items.performanceMarketing.output.performanceReport", fallback: "Performance report" },
    ],
  },
  {
    titleKey: "services.pillars.items.mediaPlanning.title",
    titleFallback: "Media Planning",
    subtitleKey: "services.pillars.items.mediaPlanning.subtitle",
    subtitleFallback:
      "Xây dựng kế hoạch kênh, ngân sách, KPI và timeline theo từng giai đoạn chiến dịch.",
    icon: CalendarRange,
    tags: [
      { key: "services.pillars.items.mediaPlanning.tags.channelMix", fallback: "Channel Mix" },
      { key: "services.pillars.items.mediaPlanning.tags.budget", fallback: "Budget" },
      { key: "services.pillars.items.mediaPlanning.tags.kpi", fallback: "KPI" },
      { key: "services.pillars.items.mediaPlanning.tags.timeline", fallback: "Timeline" },
      { key: "services.pillars.items.mediaPlanning.tags.proposal", fallback: "Proposal" },
    ],
    suitable: [
      { key: "services.pillars.items.mediaPlanning.suitable.brandCampaign", fallback: "Brand campaign" },
      { key: "services.pillars.items.mediaPlanning.suitable.productLaunch", fallback: "Product launch" },
      { key: "services.pillars.items.mediaPlanning.suitable.alwaysOnMedia", fallback: "Always-on media" },
      { key: "services.pillars.items.mediaPlanning.suitable.agencyProposal", fallback: "Agency cần media proposal" },
    ],
    output: [
      { key: "services.pillars.items.mediaPlanning.output.mediaPlan", fallback: "Media plan" },
      { key: "services.pillars.items.mediaPlanning.output.budgetAllocation", fallback: "Budget allocation" },
      { key: "services.pillars.items.mediaPlanning.output.kpiFramework", fallback: "KPI framework" },
      { key: "services.pillars.items.mediaPlanning.output.timelineByPhase", fallback: "Timeline by phase" },
    ],
  },
  {
    titleKey: "services.pillars.items.socialMediaSeeding.title",
    titleFallback: "Social Media & Seeding",
    subtitleKey: "services.pillars.items.socialMediaSeeding.subtitle",
    subtitleFallback:
      "Hỗ trợ social content direction, seeding cộng đồng, comment và social proof cho campaign.",
    icon: MessagesSquare,
    tags: [
      { key: "services.pillars.items.socialMediaSeeding.tags.comment", fallback: "Comment" },
      { key: "services.pillars.items.socialMediaSeeding.tags.community", fallback: "Community" },
      { key: "services.pillars.items.socialMediaSeeding.tags.socialProof", fallback: "Social Proof" },
      { key: "services.pillars.items.socialMediaSeeding.tags.group", fallback: "Group" },
      { key: "services.pillars.items.socialMediaSeeding.tags.engagement", fallback: "Engagement" },
    ],
    suitable: [
      { key: "services.pillars.items.socialMediaSeeding.suitable.communityDiscussion", fallback: "Campaign cần thảo luận cộng đồng" },
      { key: "services.pillars.items.socialMediaSeeding.suitable.socialActivation", fallback: "Event / social activation" },
      { key: "services.pillars.items.socialMediaSeeding.suitable.socialProofLaunch", fallback: "Launch cần social proof" },
      { key: "services.pillars.items.socialMediaSeeding.suitable.socialFeedback", fallback: "Theo dõi phản hồi social" },
    ],
    output: [
      { key: "services.pillars.items.socialMediaSeeding.output.seedingPlan", fallback: "Seeding plan" },
      { key: "services.pillars.items.socialMediaSeeding.output.commentGuideline", fallback: "Comment guideline" },
      { key: "services.pillars.items.socialMediaSeeding.output.communityTracking", fallback: "Community tracking" },
      { key: "services.pillars.items.socialMediaSeeding.output.summaryReport", fallback: "Summary report" },
    ],
  },
  {
    titleKey: "services.pillars.items.trackingReportAutomation.title",
    titleFallback: "Tracking, Report & Automation",
    subtitleKey: "services.pillars.items.trackingReportAutomation.subtitle",
    subtitleFallback:
      "Thiết lập tracking, dashboard, report và workflow automation để giảm thao tác thủ công.",
    icon: Workflow,
    tags: [
      { key: "services.pillars.items.trackingReportAutomation.tags.dashboard", fallback: "Dashboard" },
      { key: "services.pillars.items.trackingReportAutomation.tags.googleSheet", fallback: "Google Sheet" },
      { key: "services.pillars.items.trackingReportAutomation.tags.appsScript", fallback: "Apps Script" },
      { key: "services.pillars.items.trackingReportAutomation.tags.api", fallback: "API" },
      { key: "services.pillars.items.trackingReportAutomation.tags.report", fallback: "Report" },
    ],
    suitable: [
      { key: "services.pillars.items.trackingReportAutomation.suitable.manyTasks", fallback: "Campaign nhiều đầu việc" },
      { key: "services.pillars.items.trackingReportAutomation.suitable.periodicReport", fallback: "Team cần báo cáo định kỳ" },
      { key: "services.pillars.items.trackingReportAutomation.suitable.executionTracking", fallback: "Agency cần tracking execution" },
      { key: "services.pillars.items.trackingReportAutomation.suitable.reduceManualErrors", fallback: "Giảm lỗi vận hành thủ công" },
    ],
    output: [
      { key: "services.pillars.items.trackingReportAutomation.output.trackingSheet", fallback: "Tracking sheet" },
      { key: "services.pillars.items.trackingReportAutomation.output.reportTemplate", fallback: "Report template" },
      { key: "services.pillars.items.trackingReportAutomation.output.automationWorkflow", fallback: "Automation workflow" },
      { key: "services.pillars.items.trackingReportAutomation.output.dataChecklist", fallback: "Data checklist" },
    ],
  },
];

export default function ServicePillars() {
  const { tr } = useLanguage();

  return (
    <section
      id="service-pillars"
      className="relative overflow-hidden bg-white py-16 text-slate-950 sm:py-20 lg:py-24"
    >
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,rgba(37,99,235,0.08),transparent_32%),radial-gradient(circle_at_bottom_right,rgba(34,211,238,0.12),transparent_34%)]" />

      <Container>
        <div className="mx-auto max-w-4xl text-center">
          <div className="mx-auto mb-5 inline-flex rounded-full border border-blue-100 bg-white px-5 py-2 text-xs font-bold uppercase tracking-[0.28em] text-blue-600 shadow-sm">
            {tr("services.pillars.badge", "Core Services")}
          </div>

          <h2 className="text-3xl font-bold tracking-tight text-slate-950 sm:text-5xl">
            {tr("services.pillars.title", "4 nhóm dịch vụ chính của T2M")}
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-slate-600 sm:text-lg">
            {tr(
              "services.pillars.description",
              "T2M không cố làm mọi thứ. Chúng tôi tập trung vào những hạng mục giúp campaign được triển khai rõ, theo dõi rõ và tối ưu rõ."
            )}
          </p>
        </div>

        <div className="mt-12 grid gap-5 lg:grid-cols-2">
          {services.map((service) => {
            const Icon = service.icon;

            return (
              <article
                key={service.titleKey}
                className="group overflow-hidden rounded-[2rem] border border-slate-200 bg-white p-5 shadow-[0_20px_60px_rgba(15,23,42,0.07)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_24px_70px_rgba(37,99,235,0.14)] sm:p-6"
              >
                <div className="flex items-start justify-between gap-5">
                  <div className="flex gap-4">
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 text-white shadow-lg shadow-blue-500/20">
                      <Icon className="h-7 w-7" />
                    </div>

                    <div>
                      <h3 className="text-xl font-bold text-slate-950">
                        {tr(service.titleKey, service.titleFallback)}
                      </h3>
                      <p className="mt-2 text-sm leading-7 text-slate-600">
                        {tr(service.subtitleKey, service.subtitleFallback)}
                      </p>
                    </div>
                  </div>

                  <div className="hidden h-10 w-10 shrink-0 items-center justify-center rounded-full border border-slate-200 bg-slate-50 text-blue-600 transition group-hover:translate-x-1 sm:flex">
                    <ArrowRight className="h-4 w-4" />
                  </div>
                </div>

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

                <div className="mt-6 grid gap-4 md:grid-cols-2">
                  <div className="rounded-3xl border border-slate-100 bg-slate-50 p-4">
                    <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-400">
                      {tr("services.pillars.suitableLabel", "Phù hợp cho")}
                    </p>

                    <div className="mt-4 grid gap-2">
                      {service.suitable.map((item) => (
                        <div key={item.key} className="flex gap-2">
                          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-blue-600" />
                          <span className="text-sm leading-6 text-slate-600">
                            {tr(item.key, item.fallback)}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="rounded-3xl border border-blue-100 bg-blue-50/70 p-4">
                    <p className="text-xs font-bold uppercase tracking-[0.18em] text-blue-500">
                      {tr("services.pillars.outputLabel", "Output")}
                    </p>

                    <div className="mt-4 grid gap-2">
                      {service.output.map((item) => (
                        <div
                          key={item.key}
                          className="rounded-2xl bg-white px-3 py-2 text-sm font-semibold text-slate-700 shadow-sm"
                        >
                          {tr(item.key, item.fallback)}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
