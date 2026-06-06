import Container from "@/components/layout/Container";
import Button from "@/components/ui/Button";
import {
  ArrowRight,
  Mail,
  MessageCircle,
  Phone,
  Send,
  Sparkles,
} from "lucide-react";

const contactCards = [
  {
    title: "Gửi brief",
    description: "Phù hợp khi anh/chị đã có campaign hoặc nhu cầu sơ bộ.",
    icon: Send,
  },
  {
    title: "Nhắn Zalo",
    description: "Trao đổi nhanh scope, timeline hoặc ngân sách dự kiến.",
    icon: MessageCircle,
  },
  {
    title: "Gửi email",
    description: "Gửi proposal, brief, file plan hoặc thông tin dự án.",
    icon: Mail,
  },
];

export default function ContactHero() {
  return (
    <section className="relative overflow-hidden bg-slate-50 py-16 text-slate-950 sm:py-20 lg:py-24">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_right,rgba(37,99,235,0.12),transparent_34%),radial-gradient(circle_at_bottom_left,rgba(34,211,238,0.18),transparent_34%)]" />

      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-blue-100 bg-white px-5 py-2 text-xs font-bold uppercase tracking-[0.24em] text-blue-600 shadow-sm">
              <Sparkles className="h-3.5 w-3.5" />
              Contact T2M
            </div>

            <h1 className="max-w-3xl text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
              Gửi brief hoặc nhu cầu{" "}
              <span className="bg-gradient-to-r from-cyan-500 to-blue-600 bg-clip-text text-transparent">
                cần triển khai
              </span>
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-8 text-slate-600 sm:text-lg">
              Anh/chị để lại thông tin ngắn gọn. T2M sẽ xem nhu cầu và chủ động
              liên hệ lại để làm rõ mục tiêu, phạm vi công việc, timeline và
              phương án triển khai phù hợp.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button
                href="#contact-form"
                size="lg"
                className="w-full bg-blue-600 text-white shadow-[0_16px_32px_rgba(37,99,235,0.20)] hover:bg-blue-500 sm:w-auto"
              >
                Điền form liên hệ
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>

              <Button
                href="mailto:contact@t2m.vn"
                variant="secondary"
                size="lg"
                className="w-full border-blue-200 bg-white/80 text-blue-700 hover:border-blue-400 hover:bg-white sm:w-auto"
              >
                <Mail className="mr-2 h-4 w-4" />
                Gửi email
              </Button>
            </div>

            <div className="mt-8 grid gap-3 text-sm text-slate-600 sm:grid-cols-2">
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-blue-600" />
                <span>Zalo: [Điền số Zalo]</span>
              </div>

              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-blue-600" />
                <span>Email: contact@t2m.vn</span>
              </div>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
            {contactCards.map((card) => {
              const Icon = card.icon;

              return (
                <div
                  key={card.title}
                  className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-[0_20px_60px_rgba(15,23,42,0.07)]"
                >
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 text-white shadow-lg shadow-blue-500/20">
                    <Icon className="h-7 w-7" />
                  </div>

                  <h3 className="mt-5 text-lg font-bold text-slate-950">
                    {card.title}
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    {card.description}
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