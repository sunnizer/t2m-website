"use client";

import Container from "@/components/layout/Container";
import Button from "@/components/ui/Button";
import { useLanguage } from "@/components/providers/LanguageProvider";
import {
  ArrowRight,
  CalendarDays,
  ImageIcon,
  MessageCircle,
  Sparkles,
} from "lucide-react";

const stats = [
  {
    labelKey: "caseStudies.hero.stats.eventCampaign.label",
    labelFallback: "Event / Campaign",
    valueKey: "caseStudies.hero.stats.eventCampaign.value",
    valueFallback: "4+",
    icon: CalendarDays,
  },
  {
    labelKey: "caseStudies.hero.stats.agencyPartners.label",
    labelFallback: "Agency Partners",
    valueKey: "caseStudies.hero.stats.agencyPartners.value",
    valueFallback: "7+",
    icon: ImageIcon,
  },
  {
    labelKey: "caseStudies.hero.stats.socialActivation.label",
    labelFallback: "Social Activation",
    valueKey: "caseStudies.hero.stats.socialActivation.value",
    valueFallback: "Active",
    icon: MessageCircle,
  },
];

export default function CaseStudiesHero() {
  const { tr } = useLanguage();

  return (
    <section className="relative overflow-hidden bg-slate-50 py-16 text-slate-950 sm:py-20 lg:py-24">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_right,rgba(37,99,235,0.12),transparent_34%),radial-gradient(circle_at_bottom_left,rgba(34,211,238,0.18),transparent_34%)]" />

      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-[0.95fr_1.05fr]">
          <div>
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-blue-100 bg-white px-5 py-2 text-xs font-bold uppercase tracking-[0.24em] text-blue-600 shadow-sm">
              <Sparkles className="h-3.5 w-3.5" />
              {tr("caseStudies.hero.badge", "Case Studies")}
            </div>

            <h1 className="max-w-3xl text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
              {tr(
                "caseStudies.hero.titlePrefix",
                "Kinh nghiệm triển khai qua các"
              )}{" "}
              <span className="bg-gradient-to-r from-cyan-500 to-blue-600 bg-clip-text text-transparent">
                {tr("caseStudies.hero.titleHighlight", "event & campaign")}
              </span>
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-8 text-slate-600 sm:text-lg">
              {tr(
                "caseStudies.hero.description",
                "Một số dự án tiêu biểu T2M từng hỗ trợ triển khai theo hướng social activation, seeding, amplification, campaign operation và reporting. Các thông tin được trình bày gọn để đảm bảo tính bảo mật."
              )}
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button
                href="/contact"
                size="lg"
                className="w-full bg-blue-600 text-white shadow-[0_16px_32px_rgba(37,99,235,0.20)] hover:bg-blue-500 sm:w-auto"
              >
                {tr("caseStudies.hero.primaryCta", "Gửi brief cho T2M")}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>

              <Button
                href="#featured-events"
                variant="secondary"
                size="lg"
                className="w-full border-blue-200 bg-white/80 text-blue-700 hover:border-blue-400 hover:bg-white sm:w-auto"
              >
                {tr("caseStudies.hero.secondaryCta", "Xem case tiêu biểu")}
              </Button>
            </div>
          </div>

          <div className="rounded-[2rem] border border-slate-200 bg-white p-5 shadow-[0_24px_80px_rgba(37,99,235,0.12)]">
            <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
              {stats.map((item) => {
                const Icon = item.icon;
                const label = tr(item.labelKey, item.labelFallback);
                const value = tr(item.valueKey, item.valueFallback);

                return (
                  <div
                    key={item.labelKey}
                    className="rounded-3xl border border-slate-200 bg-slate-50 p-5"
                  >
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <p className="text-sm font-semibold text-slate-500">
                          {label}
                        </p>
                        <p className="mt-2 text-3xl font-black text-slate-950">
                          {value}
                        </p>
                      </div>

                      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 text-white shadow-lg shadow-blue-500/20">
                        <Icon className="h-7 w-7" />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}