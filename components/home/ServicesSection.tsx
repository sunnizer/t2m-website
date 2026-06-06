import Container from "@/components/layout/Container";
import Button from "@/components/ui/Button";
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
    title: "Performance Marketing",
    subtitle: "Tối ưu traffic, lead, engagement hoặc conversion.",
    icon: BarChart3,
    gradient: "from-blue-500 to-cyan-400",
    tags: ["Meta", "TikTok", "Google"],
    visual: "growth",
  },
  {
    title: "Media Planning",
    subtitle: "Lập kế hoạch kênh, ngân sách, KPI và timeline.",
    icon: CalendarRange,
    gradient: "from-cyan-500 to-teal-400",
    tags: ["Channel Mix", "Budget", "KPI"],
    visual: "plan",
  },
  {
    title: "Social Media & Seeding",
    subtitle: "Kích hoạt social proof, comment và tín hiệu cộng đồng.",
    icon: MessagesSquare,
    gradient: "from-blue-600 to-indigo-500",
    tags: ["Seeding", "Community", "Social Proof"],
    visual: "social",
  },
  {
    title: "Tracking, Report & Automation",
    subtitle: "Theo dõi dữ liệu, báo cáo và tự động hóa vận hành.",
    icon: Workflow,
    gradient: "from-cyan-500 to-blue-600",
    tags: ["Dashboard", "Report", "Automation"],
    visual: "automation",
  },
];

function ServiceVisual({ type }: { type: string }) {
  if (type === "growth") {
    return (
      <div className="mt-6 rounded-3xl border border-slate-100 bg-slate-50 p-4">
        <div className="grid grid-cols-3 gap-3">
          {[
            { label: "Reach", value: "82%" },
            { label: "Lead", value: "2.4K" },
            { label: "CPA", value: "-18%" },
          ].map((item) => (
            <div key={item.label} className="rounded-2xl bg-white p-3 shadow-sm">
              <p className="text-[11px] font-semibold text-slate-400">{item.label}</p>
              <p className="mt-1 text-lg font-bold text-slate-950">{item.value}</p>
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
    return (
      <div className="mt-6 rounded-3xl border border-slate-100 bg-slate-50 p-4">
        <div className="rounded-2xl bg-white p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-400">
              Channel Mix
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
              {["Meta", "Google", "TikTok", "Social"].map((item, index) => (
                <div key={item} className="flex items-center justify-between text-xs">
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
                    {item}
                  </span>
                  <span className="font-semibold text-slate-700">
                    {[38, 26, 18, 18][index]}%
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
    return (
      <div className="mt-6 rounded-3xl border border-slate-100 bg-slate-50 p-4">
        <div className="rounded-2xl bg-white p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-400">
              Social Signals
            </p>
            <Megaphone className="h-4 w-4 text-blue-600" />
          </div>

          <div className="mt-4 grid grid-cols-4 gap-2">
            {["FB", "TT", "YT", "ZL"].map((item) => (
              <div
                key={item}
                className="flex h-10 items-center justify-center rounded-xl bg-slate-50 text-xs font-bold text-slate-700"
              >
                {item}
              </div>
            ))}
          </div>

          <div className="mt-4 grid grid-cols-3 gap-2">
            {[
              { label: "Comments", value: "2.6K" },
              { label: "Shares", value: "3.7K" },
              { label: "Engage", value: "8.9%" },
            ].map((item) => (
              <div key={item.label} className="rounded-xl bg-slate-50 p-3">
                <p className="text-[10px] text-slate-400">{item.label}</p>
                <p className="mt-1 text-sm font-bold text-slate-950">{item.value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-6 rounded-3xl border border-slate-100 bg-slate-50 p-4">
      <div className="rounded-2xl bg-white p-4 shadow-sm">
        <div className="flex items-center justify-between">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-400">
            Workflow
          </p>
          <Zap className="h-4 w-4 text-blue-600" />
        </div>

        <div className="mt-5 flex items-center justify-between gap-2">
          {[
            { label: "Data", icon: BarChart3 },
            { label: "Track", icon: MousePointerClick },
            { label: "Report", icon: CheckCircle2 },
          ].map((item, index) => {
            const Icon = item.icon;

            return (
              <div key={item.label} className="flex flex-1 items-center gap-2">
                <div className="flex flex-1 flex-col items-center">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
                    <Icon className="h-5 w-5" />
                  </div>
                  <p className="mt-2 text-xs font-semibold text-slate-600">{item.label}</p>
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
  return (
    <section className="relative overflow-hidden bg-white py-16 text-slate-950 sm:py-20 lg:py-24">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,rgba(37,99,235,0.08),transparent_32%),radial-gradient(circle_at_bottom_right,rgba(34,211,238,0.14),transparent_34%)]" />

      <Container>
        <div className="mx-auto max-w-4xl text-center">
          <div className="mx-auto mb-5 inline-flex rounded-full border border-blue-100 bg-white px-5 py-2 text-xs font-bold uppercase tracking-[0.28em] text-blue-600 shadow-sm">
            Services
          </div>

          <h2 className="text-3xl font-bold tracking-tight text-slate-950 sm:text-5xl">
            Giải pháp{" "}
            <span className="bg-gradient-to-r from-cyan-500 to-blue-600 bg-clip-text text-transparent">
              Digital Marketing
            </span>{" "}
            cho campaign cần hiệu quả
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-slate-600 sm:text-lg">
            T2M tập trung vào các hạng mục cốt lõi giúp chiến dịch được lập kế
            hoạch, triển khai, đo lường và tối ưu rõ ràng.
          </p>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-2">
          {services.map((service) => {
            const Icon = service.icon;

            return (
              <article
                key={service.title}
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
                    {service.title}
                  </h3>

                  <p className="mt-3 text-sm leading-7 text-slate-600">
                    {service.subtitle}
                  </p>

                  <div className="mt-5 flex flex-wrap gap-2">
                    {service.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-semibold text-slate-600"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <ServiceVisual type={service.visual} />
                </div>
              </article>
            );
          })}
        </div>

        <div className="mt-8 rounded-[2rem] border border-blue-100 bg-gradient-to-r from-blue-50 via-white to-cyan-50 p-6 shadow-sm sm:p-8">
          <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <h3 className="text-xl font-bold text-slate-950">
                Không chỉ là chạy ads, mà là vận hành campaign có hệ thống.
              </h3>
              <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-600">
                T2M kết hợp planning, execution, social seeding, tracking và
                reporting để giúp chiến dịch rõ việc, rõ dữ liệu và dễ tối ưu hơn.
              </p>
            </div>

            <Button
              href="/contact"
              size="lg"
              className="w-full bg-blue-600 text-white shadow-[0_16px_32px_rgba(37,99,235,0.20)] hover:bg-blue-500 sm:w-auto"
            >
              Trao đổi nhu cầu
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}