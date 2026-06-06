import Container from "@/components/layout/Container";
import SectionTitle from "@/components/ui/SectionTitle";
import Button from "@/components/ui/Button";
import {
  BarChart3,
  CalendarRange,
  MessagesSquare,
  Workflow,
  ArrowRight,
  BadgeCheck,
} from "lucide-react";

const services = [
  {
    title: "Performance Marketing",
    description:
      "Triển khai và tối ưu quảng cáo theo mục tiêu traffic, lead, engagement hoặc conversion.",
    icon: BarChart3,
    tags: ["Meta", "TikTok", "Google", "Lead", "Conversion"],
  },
  {
    title: "Media Planning",
    description:
      "Xây dựng kế hoạch kênh, ngân sách, KPI và timeline phù hợp với mục tiêu chiến dịch.",
    icon: CalendarRange,
    tags: ["Channel Mix", "Budget", "KPI", "Timeline"],
  },
  {
    title: "Social Media & Seeding",
    description:
      "Hỗ trợ social content direction, seeding cộng đồng và tạo social proof cho campaign.",
    icon: MessagesSquare,
    tags: ["Seeding", "Community", "Comment", "Social Proof"],
  },
  {
    title: "Tracking, Report & Automation",
    description:
      "Thiết lập tracking, dashboard, báo cáo và workflow automation để giảm lỗi thủ công.",
    icon: Workflow,
    tags: ["Dashboard", "Google Sheet", "Apps Script", "API Workflow"],
  },
];

export default function ServicesSection() {
  return (
    <section className="border-y border-white/10 bg-slate-900/40 py-14 sm:py-20 lg:py-24">
      <Container>
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <SectionTitle
            eyebrow="Services"
            title="Dịch vụ chính của T2M"
            description="Các hạng mục cốt lõi giúp campaign được lập kế hoạch, triển khai, theo dõi và tối ưu rõ ràng."
          />

          <Button href="/services" variant="secondary">
            Xem tất cả dịch vụ
          </Button>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-2 lg:gap-5">
          {services.map((service) => {
            const Icon = service.icon;

            return (
              <div
                key={service.title}
                className="group relative overflow-hidden rounded-3xl border border-white/10 bg-slate-950/80 p-5 transition duration-300 hover:-translate-y-1 hover:border-cyan-400/40 hover:shadow-2xl hover:shadow-cyan-950/20 sm:p-6"
              >
                <div className="absolute right-0 top-0 h-28 w-28 rounded-full bg-cyan-400/10 blur-3xl transition group-hover:bg-cyan-400/20" />

                <div className="relative">
                  <div className="flex items-start justify-between gap-4">
                    <div className="rounded-2xl border border-cyan-400/20 bg-cyan-400/10 p-3 text-cyan-300">
                      <Icon className="h-6 w-6" />
                    </div>

                    <ArrowRight className="h-5 w-5 text-slate-600 transition group-hover:text-cyan-300" />
                  </div>

                  <h3 className="mt-5 text-lg font-semibold text-white sm:text-xl">
                    {service.title}
                  </h3>

                  <p className="mt-4 text-sm leading-7 text-slate-400">
                    {service.description}
                  </p>

                  <div className="mt-6 flex flex-wrap gap-2">
                    {service.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs text-slate-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="mt-6 flex items-center gap-2 text-sm text-slate-300">
                    <BadgeCheck className="h-4 w-4 text-cyan-300" />
                    Phù hợp với campaign cần triển khai rõ ràng
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-8 rounded-[2rem] border border-white/10 bg-white/[0.03] p-6 sm:p-8">
          <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <h3 className="text-xl font-semibold text-white">
                Campaign operation có hệ thống
              </h3>
              <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-400">
                T2M kết hợp planning, media execution, social seeding, tracking
                và reporting để giúp chiến dịch vận hành gọn hơn, rõ hơn và dễ
                kiểm soát hơn.
              </p>
            </div>

            <Button href="/contact" size="lg" className="w-full sm:w-auto">
              Trao đổi nhu cầu
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}