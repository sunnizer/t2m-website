import Container from "@/components/layout/Container";
import Button from "@/components/ui/Button";
import {
  ArrowRight,
  BarChart3,
  CalendarRange,
  MessagesSquare,
  Sparkles,
  Workflow,
} from "lucide-react";

const highlights = [
  {
    label: "Performance",
    icon: BarChart3,
  },
  {
    label: "Media Planning",
    icon: CalendarRange,
  },
  {
    label: "Social Seeding",
    icon: MessagesSquare,
  },
  {
    label: "Automation",
    icon: Workflow,
  },
];

export default function ServicesHero() {
  return (
    <section className="relative overflow-hidden bg-slate-50 py-16 text-slate-950 sm:py-20 lg:py-24">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_right,rgba(37,99,235,0.12),transparent_34%),radial-gradient(circle_at_bottom_left,rgba(34,211,238,0.18),transparent_34%)]" />

      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-blue-100 bg-white px-5 py-2 text-xs font-bold uppercase tracking-[0.24em] text-blue-600 shadow-sm">
              <Sparkles className="h-3.5 w-3.5" />
              T2M Services
            </div>

            <h1 className="max-w-3xl text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
              Dịch vụ digital marketing cho campaign cần{" "}
              <span className="bg-gradient-to-r from-cyan-500 to-blue-600 bg-clip-text text-transparent">
                chạy rõ và đo rõ.
              </span>
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-8 text-slate-600 sm:text-lg">
              T2M hỗ trợ doanh nghiệp và agency trong các hạng mục Performance
              Marketing, Media Planning, Social Media & Seeding, Tracking,
              Reporting & Automation.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button
                href="/contact"
                size="lg"
                className="w-full bg-blue-600 text-white shadow-[0_16px_32px_rgba(37,99,235,0.20)] hover:bg-blue-500 sm:w-auto"
              >
                Gửi brief cho T2M
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>

              <Button
                href="#service-pillars"
                variant="secondary"
                size="lg"
                className="w-full border-blue-200 bg-white/80 text-blue-700 hover:border-blue-400 hover:bg-white sm:w-auto"
              >
                Xem nhóm dịch vụ
              </Button>
            </div>
          </div>

          <div className="rounded-[2rem] border border-slate-200 bg-white p-5 shadow-[0_24px_80px_rgba(37,99,235,0.12)]">
            <div className="grid gap-4 sm:grid-cols-2">
              {highlights.map((item, index) => {
                const Icon = item.icon;

                return (
                  <div
                    key={item.label}
                    className="relative overflow-hidden rounded-3xl border border-slate-200 bg-slate-50 p-5"
                  >
                    <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-blue-100 blur-2xl" />

                    <div className="relative">
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 text-white shadow-lg shadow-blue-500/20">
                        <Icon className="h-6 w-6" />
                      </div>

                      <p className="mt-5 text-sm font-bold uppercase tracking-[0.18em] text-slate-400">
                        0{index + 1}
                      </p>

                      <h3 className="mt-2 text-lg font-bold text-slate-950">
                        {item.label}
                      </h3>

                      <div className="mt-5 h-2 rounded-full bg-white">
                        <div
                          className="h-2 rounded-full bg-gradient-to-r from-blue-600 to-cyan-400"
                          style={{ width: `${72 + index * 6}%` }}
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-4 rounded-3xl border border-blue-100 bg-gradient-to-r from-blue-50 to-cyan-50 p-5">
              <p className="text-sm font-bold text-slate-950">
                Một workflow dịch vụ gọn cho campaign cần triển khai, theo dõi
                và tối ưu liên tục.
              </p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}