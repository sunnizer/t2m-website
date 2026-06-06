import Container from "@/components/layout/Container";
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
    title: "Performance Marketing",
    subtitle:
      "Triển khai và tối ưu quảng cáo theo mục tiêu traffic, lead, engagement hoặc conversion.",
    icon: BarChart3,
    tags: ["Meta Ads", "TikTok Ads", "Google Ads", "Lead", "Conversion"],
    suitable: [
      "Campaign launch sản phẩm",
      "Lead generation",
      "Tăng traffic / engagement",
      "Tối ưu ngân sách media",
    ],
    output: ["Campaign setup", "Audience recommendation", "Optimization note", "Performance report"],
  },
  {
    title: "Media Planning",
    subtitle:
      "Xây dựng kế hoạch kênh, ngân sách, KPI và timeline theo từng giai đoạn chiến dịch.",
    icon: CalendarRange,
    tags: ["Channel Mix", "Budget", "KPI", "Timeline", "Proposal"],
    suitable: [
      "Brand campaign",
      "Product launch",
      "Always-on media",
      "Agency cần media proposal",
    ],
    output: ["Media plan", "Budget allocation", "KPI framework", "Timeline by phase"],
  },
  {
    title: "Social Media & Seeding",
    subtitle:
      "Hỗ trợ social content direction, seeding cộng đồng, comment và social proof cho campaign.",
    icon: MessagesSquare,
    tags: ["Comment", "Community", "Social Proof", "Group", "Engagement"],
    suitable: [
      "Campaign cần thảo luận cộng đồng",
      "Event / social activation",
      "Launch cần social proof",
      "Theo dõi phản hồi social",
    ],
    output: ["Seeding plan", "Comment guideline", "Community tracking", "Summary report"],
  },
  {
    title: "Tracking, Report & Automation",
    subtitle:
      "Thiết lập tracking, dashboard, report và workflow automation để giảm thao tác thủ công.",
    icon: Workflow,
    tags: ["Dashboard", "Google Sheet", "Apps Script", "API", "Report"],
    suitable: [
      "Campaign nhiều đầu việc",
      "Team cần báo cáo định kỳ",
      "Agency cần tracking execution",
      "Giảm lỗi vận hành thủ công",
    ],
    output: ["Tracking sheet", "Report template", "Automation workflow", "Data checklist"],
  },
];

export default function ServicePillars() {
  return (
    <section
      id="service-pillars"
      className="relative overflow-hidden bg-white py-16 text-slate-950 sm:py-20 lg:py-24"
    >
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,rgba(37,99,235,0.08),transparent_32%),radial-gradient(circle_at_bottom_right,rgba(34,211,238,0.12),transparent_34%)]" />

      <Container>
        <div className="mx-auto max-w-4xl text-center">
          <div className="mx-auto mb-5 inline-flex rounded-full border border-blue-100 bg-white px-5 py-2 text-xs font-bold uppercase tracking-[0.28em] text-blue-600 shadow-sm">
            Core Services
          </div>

          <h2 className="text-3xl font-bold tracking-tight text-slate-950 sm:text-5xl">
            4 nhóm dịch vụ chính của T2M
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-slate-600 sm:text-lg">
            T2M không cố làm mọi thứ. Chúng tôi tập trung vào những hạng mục
            giúp campaign được triển khai rõ, theo dõi rõ và tối ưu rõ.
          </p>
        </div>

        <div className="mt-12 grid gap-5 lg:grid-cols-2">
          {services.map((service) => {
            const Icon = service.icon;

            return (
              <article
                key={service.title}
                className="group overflow-hidden rounded-[2rem] border border-slate-200 bg-white p-5 shadow-[0_20px_60px_rgba(15,23,42,0.07)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_24px_70px_rgba(37,99,235,0.14)] sm:p-6"
              >
                <div className="flex items-start justify-between gap-5">
                  <div className="flex gap-4">
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 text-white shadow-lg shadow-blue-500/20">
                      <Icon className="h-7 w-7" />
                    </div>

                    <div>
                      <h3 className="text-xl font-bold text-slate-950">
                        {service.title}
                      </h3>
                      <p className="mt-2 text-sm leading-7 text-slate-600">
                        {service.subtitle}
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
                      key={tag}
                      className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-semibold text-slate-600"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="mt-6 grid gap-4 md:grid-cols-2">
                  <div className="rounded-3xl border border-slate-100 bg-slate-50 p-4">
                    <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-400">
                      Phù hợp cho
                    </p>

                    <div className="mt-4 grid gap-2">
                      {service.suitable.map((item) => (
                        <div key={item} className="flex gap-2">
                          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-blue-600" />
                          <span className="text-sm leading-6 text-slate-600">
                            {item}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="rounded-3xl border border-blue-100 bg-blue-50/70 p-4">
                    <p className="text-xs font-bold uppercase tracking-[0.18em] text-blue-500">
                      Output
                    </p>

                    <div className="mt-4 grid gap-2">
                      {service.output.map((item) => (
                        <div key={item} className="rounded-2xl bg-white px-3 py-2 text-sm font-semibold text-slate-700 shadow-sm">
                          {item}
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