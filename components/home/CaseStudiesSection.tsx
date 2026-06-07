"use client";

import { useEffect, useMemo, useState } from "react";
import Container from "@/components/layout/Container";
import { useLanguage } from "@/components/providers/LanguageProvider";
import {
  BarChart3,
  ClipboardCheck,
  LineChart,
  MessageSquareText,
  Rocket,
  ShieldCheck,
  UsersRound,
  type LucideIcon,
} from "lucide-react";
import {
  defaultCaseStudiesData,
  type CaseStudiesData,
  type CaseStudyItem,
  type CaseStudyMetricIcon,
} from "@/lib/caseStudiesData";

type TranslatedText = {
  key: string;
  fallback: string;
};

type ImpactMetric = {
  value: TranslatedText;
  label: TranslatedText;
  icon: LucideIcon;
};

const maxHomepageCaseStudies = 6;

const impactMetrics: ImpactMetric[] = [
  {
    value: {
      key: "home.caseStudies.impact.campaigns.value",
      fallback: "30+",
    },
    label: {
      key: "home.caseStudies.impact.campaigns.label",
      fallback: "chiến dịch / sự kiện đã hỗ trợ",
    },
    icon: Rocket,
  },
  {
    value: {
      key: "home.caseStudies.impact.interactions.value",
      fallback: "500K+",
    },
    label: {
      key: "home.caseStudies.impact.interactions.label",
      fallback: "tương tác social được kích hoạt",
    },
    icon: MessageSquareText,
  },
  {
    value: {
      key: "home.caseStudies.impact.communities.value",
      fallback: "20+",
    },
    label: {
      key: "home.caseStudies.impact.communities.label",
      fallback: "cộng đồng được theo dõi",
    },
    icon: UsersRound,
  },
  {
    value: {
      key: "home.caseStudies.impact.reporting.value",
      fallback: "Báo cáo",
    },
    label: {
      key: "home.caseStudies.impact.reporting.label",
      fallback: "theo ngày / tuần",
    },
    icon: ClipboardCheck,
  },
];

const metricIconMap: Record<CaseStudyMetricIcon, LucideIcon> = {
  message: MessageSquareText,
  users: UsersRound,
  line: LineChart,
  bar: BarChart3,
  rocket: Rocket,
  report: ClipboardCheck,
};

function pickText(locale: "vi" | "en", vi: string, en: string) {
  if (locale === "en") {
    return en?.trim() || vi?.trim() || "";
  }

  return vi?.trim() || en?.trim() || "";
}

function CaseStudyCard({
  item,
  locale,
}: {
  item: CaseStudyItem;
  locale: "vi" | "en";
}) {
  const name = pickText(locale, item.nameVi, item.nameEn);
  const category = pickText(locale, item.categoryVi, item.categoryEn);

  return (
    <article className="group overflow-hidden rounded-[1.75rem] border border-slate-200 bg-white shadow-[0_24px_70px_rgba(15,23,42,0.09)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_30px_90px_rgba(37,99,235,0.16)]">
      <div className="relative h-52 overflow-hidden bg-slate-900">
        {item.image ? (
          <>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={item.image}
              alt={name}
              className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
            />
          </>
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-slate-900 to-blue-950 text-4xl font-black text-white/30">
            T2M
          </div>
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/65 via-slate-950/10 to-transparent" />

        <div className="absolute left-4 top-4 flex flex-wrap gap-2">
          {item.tags.slice(0, 3).map((tag) => (
            <span
              key={`${item.id}-${tag}`}
              className="rounded-md bg-blue-600 px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.14em] text-white shadow-lg shadow-blue-950/20"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      <div className="p-6">
        <div className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-blue-700">
          {category}
        </div>

        <h3 className="min-h-[4rem] overflow-hidden text-2xl font-black leading-tight tracking-tight text-slate-950 [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:2]">
          {name}
        </h3>

        <div className="mt-5 grid grid-cols-3 gap-3">
          {item.metrics.slice(0, 3).map((metric) => {
            const Icon = metricIconMap[metric.icon] ?? MessageSquareText;
            const label = pickText(locale, metric.labelVi, metric.labelEn);

            return (
              <div
                key={`${item.id}-${metric.id}`}
                className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-3 text-center"
              >
                <Icon className="mx-auto mb-2 h-5 w-5 text-cyan-600" />
                <div className="text-lg font-black text-blue-700">
                  {metric.value}
                </div>
                <div className="mt-1 text-[11px] font-semibold leading-tight text-slate-600">
                  {label}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </article>
  );
}

export default function CaseStudiesSection() {
  const { tr, locale } = useLanguage();
  const [data, setData] = useState<CaseStudiesData>(defaultCaseStudiesData);

  useEffect(() => {
    async function loadCaseStudiesData() {
      try {
        const response = await fetch("/api/admin/case-studies", {
          cache: "no-store",
        });

        const json = await response.json();

        if (!response.ok || !json?.ok) {
          return;
        }

        setData(json.data as CaseStudiesData);
      } catch {
        setData(defaultCaseStudiesData);
      }
    }

    loadCaseStudiesData();
  }, []);

  const visibleCaseStudies = useMemo(() => {
    return data.caseStudies.slice(0, maxHomepageCaseStudies);
  }, [data.caseStudies]);

  return (
    <section
      id="case-studies"
      className="relative overflow-hidden bg-[#f8fbff] pt-16 pb-8 text-slate-950 sm:pt-20 sm:pb-10 lg:pt-24 lg:pb-12"
    >
      <div className="pointer-events-none absolute left-1/2 top-0 -z-10 h-[520px] w-[900px] -translate-x-1/2 rounded-full bg-cyan-200/35 blur-3xl" />
      <div className="pointer-events-none absolute -right-40 top-36 -z-10 h-80 w-80 rounded-full bg-blue-300/25 blur-3xl" />
      <div className="pointer-events-none absolute -left-40 bottom-10 -z-10 h-80 w-80 rounded-full bg-indigo-200/40 blur-3xl" />

      <Container>
        <div className="mx-auto max-w-4xl text-center">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-blue-100 bg-white/80 px-4 py-2 text-xs font-bold uppercase tracking-[0.22em] text-blue-700 shadow-sm">
            <ShieldCheck className="h-4 w-4" />
            {tr("home.caseStudies.badge", "Case Study")}
          </div>

          <h2 className="text-balance text-4xl font-black tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
            {tr("home.caseStudies.title", "Sự kiện & chiến dịch tiêu biểu")}
          </h2>

          <p className="mx-auto mt-5 max-w-3xl text-pretty text-base leading-8 text-slate-600 sm:text-lg">
            {tr(
              "home.caseStudies.description",
              "Các chiến dịch T2M đã hỗ trợ triển khai từ social activation, seeding, amplification đến tracking và reporting."
            )}
          </p>
        </div>

        <div className="mt-10 overflow-hidden rounded-[2rem] border border-slate-200/80 bg-white/85 shadow-[0_24px_80px_rgba(15,23,42,0.08)] backdrop-blur">
          <div className="grid divide-y divide-slate-200 md:grid-cols-2 md:divide-x md:divide-y-0 xl:grid-cols-4">
            {impactMetrics.map((metric) => {
              const Icon = metric.icon;

              return (
                <div
                  key={metric.label.key}
                  className="group p-7 transition duration-300 hover:bg-blue-50/60"
                >
                  <div className="flex items-start gap-5">
                    <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-blue-50 to-cyan-50 text-blue-600 ring-1 ring-blue-100 transition duration-300 group-hover:scale-105 group-hover:shadow-lg">
                      <Icon className="h-8 w-8" />
                    </div>

                    <div>
                      <div className="text-4xl font-black tracking-[0.12em] text-blue-700 sm:text-5xl">
                        {tr(metric.value.key, metric.value.fallback)}
                      </div>
                      <div className="mt-2 text-base font-extrabold leading-snug text-slate-950">
                        {tr(metric.label.key, metric.label.fallback)}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="mt-7 grid gap-6 lg:grid-cols-3">
          {visibleCaseStudies.map((item) => (
            <CaseStudyCard key={item.id} item={item} locale={locale} />
          ))}
        </div>
      </Container>
    </section>
  );
}