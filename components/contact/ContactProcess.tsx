"use client";

import Container from "@/components/layout/Container";
import { useLanguage } from "@/components/providers/LanguageProvider";
import {
  ClipboardList,
  MessageCircle,
  Route,
  Sparkles,
} from "lucide-react";

const steps = [
  {
    number: "01",
    titleKey: "contact.process.steps.receiveInfo.title",
    titleFallback: "T2M nhận thông tin",
    descriptionKey: "contact.process.steps.receiveInfo.description",
    descriptionFallback:
      "Tổng hợp nhu cầu, dịch vụ quan tâm, timeline và ngân sách dự kiến.",
    icon: ClipboardList,
  },
  {
    number: "02",
    titleKey: "contact.process.steps.clarify.title",
    titleFallback: "Liên hệ làm rõ",
    descriptionKey: "contact.process.steps.clarify.description",
    descriptionFallback:
      "Trao đổi thêm qua Zalo, email hoặc call ngắn để hiểu đúng brief.",
    icon: MessageCircle,
  },
  {
    number: "03",
    titleKey: "contact.process.steps.proposal.title",
    titleFallback: "Đề xuất hướng triển khai",
    descriptionKey: "contact.process.steps.proposal.description",
    descriptionFallback:
      "T2M đề xuất scope, output và cách triển khai phù hợp với mục tiêu.",
    icon: Route,
  },
];

export default function ContactProcess() {
  const { tr } = useLanguage();

  return (
    <section className="bg-slate-50 py-16 text-slate-950 sm:py-20 lg:py-24">
      <Container>
        <div className="mx-auto max-w-4xl text-center">
          <div className="mx-auto mb-5 inline-flex items-center gap-2 rounded-full border border-blue-100 bg-white px-5 py-2 text-xs font-bold uppercase tracking-[0.24em] text-blue-600 shadow-sm">
            <Sparkles className="h-3.5 w-3.5" />
            {tr("contact.process.badge", "Next Steps")}
          </div>

          <h2 className="text-3xl font-bold tracking-tight text-slate-950 sm:text-5xl">
            {tr(
              "contact.process.title",
              "Sau khi gửi thông tin thì sao?"
            )}
          </h2>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-3">
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