"use client";

import Container from "@/components/layout/Container";
import { useLanguage } from "@/components/providers/LanguageProvider";
import {
  ClipboardList,
  LineChart,
  Rocket,
  Route,
  Sparkles,
} from "lucide-react";

const steps = [
  {
    number: "01",
    titleKey: "services.process.steps.clarifyBrief.title",
    titleFallback: "Làm rõ brief",
    descriptionKey: "services.process.steps.clarifyBrief.description",
    descriptionFallback: "Mục tiêu, đối tượng, ngân sách, timeline, kênh và KPI.",
    icon: ClipboardList,
  },
  {
    number: "02",
    titleKey: "services.process.steps.proposeScope.title",
    titleFallback: "Đề xuất scope",
    descriptionKey: "services.process.steps.proposeScope.description",
    descriptionFallback: "Chọn dịch vụ phù hợp, phạm vi triển khai và output cần có.",
    icon: Route,
  },
  {
    number: "03",
    titleKey: "services.process.steps.execution.title",
    titleFallback: "Triển khai",
    descriptionKey: "services.process.steps.execution.description",
    descriptionFallback: "Setup, vận hành, phối hợp xử lý và theo dõi tiến độ.",
    icon: Rocket,
  },
  {
    number: "04",
    titleKey: "services.process.steps.reportOptimize.title",
    titleFallback: "Báo cáo & tối ưu",
    descriptionKey: "services.process.steps.reportOptimize.description",
    descriptionFallback: "Tổng hợp kết quả, learning và đề xuất bước tiếp theo.",
    icon: LineChart,
  },
];

export default function ServiceProcess() {
  const { tr } = useLanguage();

  return (
    <section className="relative overflow-hidden bg-slate-50 py-16 text-slate-950 sm:py-20 lg:py-24">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_right,rgba(37,99,235,0.10),transparent_32%),radial-gradient(circle_at_bottom_left,rgba(34,211,238,0.16),transparent_34%)]" />

      <Container>
        <div className="mx-auto max-w-4xl text-center">
          <div className="mx-auto mb-5 inline-flex items-center gap-2 rounded-full border border-blue-100 bg-white px-5 py-2 text-xs font-bold uppercase tracking-[0.24em] text-blue-600 shadow-sm">
            <Sparkles className="h-3.5 w-3.5" />
            {tr("services.process.badge", "Working Process")}
          </div>

          <h2 className="text-3xl font-bold tracking-tight text-slate-950 sm:text-5xl">
            {tr("services.process.title", "Cách T2M triển khai dịch vụ")}
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-slate-600 sm:text-lg">
            {tr(
              "services.process.description",
              "Quy trình đơn giản, rõ việc và phù hợp với cả doanh nghiệp lẫn agency cần outsource execution."
            )}
          </p>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step) => {
            const Icon = step.icon;

            return (
              <div
                key={step.number}
                className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-[0_20px_60px_rgba(15,23,42,0.07)]"
              >
                <div className="flex items-center justify-between">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 text-white shadow-lg shadow-blue-500/20">
                    <Icon className="h-7 w-7" />
                  </div>

                  <span className="text-3xl font-black text-blue-100">
                    {step.number}
                  </span>
                </div>

                <h3 className="mt-6 text-lg font-bold text-slate-950">
                  {tr(step.titleKey, step.titleFallback)}
                </h3>

                <p className="mt-3 text-sm leading-7 text-slate-600">
                  {tr(step.descriptionKey, step.descriptionFallback)}
                </p>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
