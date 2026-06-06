import Container from "@/components/layout/Container";
import {
  BarChart3,
  CheckCircle2,
  FileSpreadsheet,
  ListChecks,
  Presentation,
  Sparkles,
} from "lucide-react";

const deliverables = [
  {
    title: "Media Plan / Proposal",
    description: "Kế hoạch kênh, ngân sách, KPI và timeline triển khai.",
    icon: Presentation,
  },
  {
    title: "Campaign Setup Checklist",
    description: "Checklist vận hành giúp các bước triển khai rõ ràng hơn.",
    icon: ListChecks,
  },
  {
    title: "Tracking Sheet",
    description: "Bảng theo dõi tiến độ, link, nội dung, KPI hoặc đầu việc.",
    icon: FileSpreadsheet,
  },
  {
    title: "Performance Report",
    description: "Báo cáo kết quả, insight chính và learning sau campaign.",
    icon: BarChart3,
  },
];

export default function ServiceDeliverables() {
  return (
    <section className="bg-white py-16 text-slate-950 sm:py-20 lg:py-24">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
          <div>
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-blue-100 bg-white px-5 py-2 text-xs font-bold uppercase tracking-[0.24em] text-blue-600 shadow-sm">
              <Sparkles className="h-3.5 w-3.5" />
              Deliverables
            </div>

            <h2 className="text-3xl font-bold tracking-tight text-slate-950 sm:text-5xl">
              Khách hàng nhận được gì?
            </h2>

            <p className="mt-5 max-w-xl text-base leading-8 text-slate-600 sm:text-lg">
              T2M ưu tiên output rõ ràng, dễ kiểm tra và có thể dùng ngay trong
              quá trình vận hành campaign.
            </p>

            <div className="mt-8 grid gap-3">
              {[
                "Rõ phạm vi công việc",
                "Rõ đầu mối phối hợp",
                "Rõ KPI / tracking",
                "Rõ báo cáo và learning",
              ].map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <CheckCircle2 className="h-5 w-5 text-blue-600" />
                  <span className="text-sm font-semibold text-slate-700">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            {deliverables.map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.title}
                  className="rounded-[2rem] border border-slate-200 bg-slate-50 p-6 shadow-sm"
                >
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 text-white shadow-lg shadow-blue-500/20">
                    <Icon className="h-7 w-7" />
                  </div>

                  <h3 className="mt-6 text-lg font-bold text-slate-950">
                    {item.title}
                  </h3>

                  <p className="mt-3 text-sm leading-7 text-slate-600">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}