import Container from "@/components/layout/Container";
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
    title: "Planning",
    subtitle: "strategy setup",
    icon: ClipboardList,
    mini: ["Objective", "Audience", "Budget"],
  },
  {
    number: "02",
    title: "Campaign Execution",
    subtitle: "launch & manage",
    icon: Rocket,
    mini: ["Live", "Monitor"],
  },
  {
    number: "03",
    title: "Social Engagement",
    subtitle: "audience signals",
    icon: MessagesSquare,
    mini: ["Comments", "Shares", "Reach"],
  },
  {
    number: "04",
    title: "Performance Tracking",
    subtitle: "measure results",
    icon: LineChart,
    mini: ["CTR", "CPA", "Lead"],
  },
  {
    number: "05",
    title: "Reporting",
    subtitle: "clear insights",
    icon: FileBarChart,
    mini: ["Dashboard", "Learning"],
  },
  {
    number: "06",
    title: "Automation",
    subtitle: "smart workflows",
    icon: Workflow,
    mini: ["Sheet", "API", "Alert"],
  },
  {
    number: "07",
    title: "Optimization",
    subtitle: "continuous improvement",
    icon: TrendingUp,
    mini: ["Test", "Scale"],
  },
];

export default function AboutSection() {
  return (
    <section className="relative overflow-hidden bg-slate-50 py-16 text-slate-950 sm:py-20 lg:py-24">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,rgba(37,99,235,0.12),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(34,211,238,0.18),transparent_35%)]" />

      <div className="absolute bottom-0 left-0 right-0 -z-10 h-40 bg-gradient-to-r from-cyan-100 via-blue-100 to-blue-500/30" />
      <div className="absolute bottom-0 left-0 right-0 -z-10 h-28 rounded-[100%_100%_0_0] bg-white/60 blur-xl" />

      <Container>
        <div className="mx-auto max-w-4xl text-center">
          <div className="mx-auto mb-5 inline-flex rounded-full border border-blue-100 bg-white px-5 py-2 text-xs font-bold uppercase tracking-[0.28em] text-blue-600 shadow-sm">
            About T2M
          </div>

          <h2 className="text-3xl font-bold tracking-tight text-slate-950 sm:text-5xl">
            Your{" "}
            <span className="bg-gradient-to-r from-cyan-500 to-blue-600 bg-clip-text text-transparent">
              Digital Growth
            </span>{" "}
            Partner
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-slate-600 sm:text-lg">
            T2M đồng hành cùng doanh nghiệp và agency trong toàn bộ quá trình
            triển khai digital campaign — từ planning, execution, seeding,
            tracking đến reporting và automation.
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
                        {item.title}
                      </h3>
                      <p className="mt-2 text-sm text-slate-500">
                        {item.subtitle}
                      </p>
                    </div>

                    <div className="mt-6 rounded-2xl border border-slate-100 bg-slate-50 p-3">
                      <div className="flex flex-wrap justify-center gap-2">
                        {item.mini.map((mini) => (
                          <span
                            key={mini}
                            className="rounded-full bg-white px-3 py-1 text-[11px] font-semibold text-slate-600 shadow-sm"
                          >
                            {mini}
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
          <div>
            <p className="text-sm font-bold text-slate-950">Thực chiến</p>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Tập trung vào việc có thể triển khai, đo lường và tối ưu được.
            </p>
          </div>

          <div>
            <p className="text-sm font-bold text-slate-950">Linh hoạt</p>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Phù hợp với SME, startup hoặc agency cần outsource execution.
            </p>
          </div>

          <div>
            <p className="text-sm font-bold text-slate-950">Có hệ thống</p>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Kết hợp tracking, reporting và automation để giảm lỗi vận hành.
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}