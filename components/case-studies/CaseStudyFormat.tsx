"use client";

import Container from "@/components/layout/Container";
import { useLanguage } from "@/components/providers/LanguageProvider";
import {
  CheckCircle2,
  FileText,
  Layers3,
  LineChart,
  Target,
  Sparkles,
} from "lucide-react";

const formats = [
  {
    titleKey: "caseStudies.format.items.clientCampaign.title",
    titleFallback: "Client / Campaign",
    descriptionKey: "caseStudies.format.items.clientCampaign.description",
    descriptionFallback: "Tên khách hàng, tên event hoặc tên chiến dịch.",
    icon: Target,
  },
  {
    titleKey: "caseStudies.format.items.scopeOfWork.title",
    titleFallback: "Scope of Work",
    descriptionKey: "caseStudies.format.items.scopeOfWork.description",
    descriptionFallback:
      "Phạm vi T2M hỗ trợ: seeding, media, tracking, reporting.",
    icon: Layers3,
  },
  {
    titleKey: "caseStudies.format.items.executionSummary.title",
    titleFallback: "Execution Summary",
    descriptionKey: "caseStudies.format.items.executionSummary.description",
    descriptionFallback: "Tóm tắt cách triển khai và các đầu việc chính.",
    icon: FileText,
  },
  {
    titleKey: "caseStudies.format.items.keyMetricsLearning.title",
    titleFallback: "Key Metrics / Learning",
    descriptionKey: "caseStudies.format.items.keyMetricsLearning.description",
    descriptionFallback:
      "Chỉ số vận hành hoặc learning có thể chia sẻ công khai.",
    icon: LineChart,
  },
];

const principles = [
  {
    key: "caseStudies.format.principles.noSensitiveData",
    fallback: "Không công khai số liệu nhạy cảm",
  },
  {
    key: "caseStudies.format.principles.clientConfidentiality",
    fallback: "Tôn trọng bảo mật khách hàng",
  },
  {
    key: "caseStudies.format.principles.executionRole",
    fallback: "Tập trung vào vai trò triển khai",
  },
  {
    key: "caseStudies.format.principles.proposalFriendly",
    fallback: "Dễ scan khi gửi proposal",
  },
];

export default function CaseStudyFormat() {
  const { tr } = useLanguage();

  return (
    <section className="bg-white py-16 text-slate-950 sm:py-20 lg:py-24">
      <Container>
        <div className="mx-auto max-w-4xl text-center">
          <div className="mx-auto mb-5 inline-flex items-center gap-2 rounded-full border border-blue-100 bg-white px-5 py-2 text-xs font-bold uppercase tracking-[0.24em] text-blue-600 shadow-sm">
            <Sparkles className="h-3.5 w-3.5" />
            {tr("caseStudies.format.badge", "Case Format")}
          </div>

          <h2 className="text-3xl font-bold tracking-tight text-slate-950 sm:text-5xl">
            {tr(
              "caseStudies.format.title",
              "Cách T2M trình bày case study"
            )}
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-slate-600 sm:text-lg">
            {tr(
              "caseStudies.format.description",
              "Với những dự án chưa được phép công khai chi tiết, T2M ưu tiên trình bày gọn theo scope, vai trò triển khai và learning chính."
            )}
          </p>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {formats.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.titleKey}
                className="rounded-[2rem] border border-slate-200 bg-slate-50 p-6 shadow-sm"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 text-white shadow-lg shadow-blue-500/20">
                  <Icon className="h-7 w-7" />
                </div>

                <h3 className="mt-6 text-lg font-bold text-slate-950">
                  {tr(item.titleKey, item.titleFallback)}
                </h3>

                <p className="mt-3 text-sm leading-7 text-slate-600">
                  {tr(item.descriptionKey, item.descriptionFallback)}
                </p>
              </div>
            );
          })}
        </div>

        <div className="mt-8 rounded-[2rem] border border-blue-100 bg-gradient-to-r from-blue-50 via-white to-cyan-50 p-6 shadow-sm sm:p-8">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {principles.map((item) => (
              <div key={item.key} className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-blue-600" />
                <span className="text-sm font-semibold text-slate-700">
                  {tr(item.key, item.fallback)}
                </span>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}