"use client";

import Image from "next/image";
import Container from "@/components/layout/Container";
import { useLanguage } from "@/components/providers/LanguageProvider";
import {
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  Sparkles,
} from "lucide-react";

const events = [
  {
    nameKey: "caseStudies.featured.events.songMotDoiCoLai.name",
    nameFallback: "Sống 1 đời có lãi",
    categoryKey: "caseStudies.featured.events.songMotDoiCoLai.category",
    categoryFallback: "Social Campaign / Community",
    titleKey: "caseStudies.featured.events.songMotDoiCoLai.title",
    titleFallback: "Social Seeding & Campaign Amplification",
    roleKey: "caseStudies.featured.events.songMotDoiCoLai.role",
    roleFallback:
      "Comment seeding • Community discussion • Engagement support",
    image: "/cases/song-1-doi-co-lai.jpg",
    tags: [
      {
        key: "caseStudies.featured.events.songMotDoiCoLai.tags.social",
        fallback: "Social",
      },
      {
        key: "caseStudies.featured.events.songMotDoiCoLai.tags.community",
        fallback: "Community",
      },
      {
        key: "caseStudies.featured.events.songMotDoiCoLai.tags.seeding",
        fallback: "Seeding",
      },
    ],
    metrics: [
      {
        labelKey:
          "caseStudies.featured.events.songMotDoiCoLai.metrics.discussion.label",
        labelFallback: "Discussion",
        valueKey:
          "caseStudies.featured.events.songMotDoiCoLai.metrics.discussion.value",
        valueFallback: "Active",
      },
      {
        labelKey:
          "caseStudies.featured.events.songMotDoiCoLai.metrics.signal.label",
        labelFallback: "Signal",
        valueKey:
          "caseStudies.featured.events.songMotDoiCoLai.metrics.signal.value",
        valueFallback: "Tracked",
      },
      {
        labelKey:
          "caseStudies.featured.events.songMotDoiCoLai.metrics.report.label",
        labelFallback: "Report",
        valueKey:
          "caseStudies.featured.events.songMotDoiCoLai.metrics.report.value",
        valueFallback: "Clear",
      },
    ],
  },
  {
    nameKey: "caseStudies.featured.events.vinhQuangCongAnNhanDan.name",
    nameFallback: "Vinh quang Công an nhân dân",
    categoryKey:
      "caseStudies.featured.events.vinhQuangCongAnNhanDan.category",
    categoryFallback: "Public Event / Social Communication",
    titleKey: "caseStudies.featured.events.vinhQuangCongAnNhanDan.title",
    titleFallback: "Event Communication Support",
    roleKey: "caseStudies.featured.events.vinhQuangCongAnNhanDan.role",
    roleFallback: "Social activation • Campaign seeding • Reporting support",
    image: "/cases/vinh-quang-cong-an-nhan-dan.jpg",
    tags: [
      {
        key: "caseStudies.featured.events.vinhQuangCongAnNhanDan.tags.event",
        fallback: "Event",
      },
      {
        key: "caseStudies.featured.events.vinhQuangCongAnNhanDan.tags.social",
        fallback: "Social",
      },
      {
        key: "caseStudies.featured.events.vinhQuangCongAnNhanDan.tags.activation",
        fallback: "Activation",
      },
    ],
    metrics: [
      {
        labelKey:
          "caseStudies.featured.events.vinhQuangCongAnNhanDan.metrics.scale.label",
        labelFallback: "Scale",
        valueKey:
          "caseStudies.featured.events.vinhQuangCongAnNhanDan.metrics.scale.value",
        valueFallback: "Large",
      },
      {
        labelKey:
          "caseStudies.featured.events.vinhQuangCongAnNhanDan.metrics.social.label",
        labelFallback: "Social",
        valueKey:
          "caseStudies.featured.events.vinhQuangCongAnNhanDan.metrics.social.value",
        valueFallback: "Boost",
      },
      {
        labelKey:
          "caseStudies.featured.events.vinhQuangCongAnNhanDan.metrics.monitor.label",
        labelFallback: "Monitor",
        valueKey:
          "caseStudies.featured.events.vinhQuangCongAnNhanDan.metrics.monitor.value",
        valueFallback: "Daily",
      },
    ],
  },
  {
    nameKey: "caseStudies.featured.events.tinhHoaViet.name",
    nameFallback: "Tinh Hoa Việt",
    categoryKey: "caseStudies.featured.events.tinhHoaViet.category",
    categoryFallback: "Culture / Brand Event",
    titleKey: "caseStudies.featured.events.tinhHoaViet.title",
    titleFallback: "Campaign Seeding & Social Support",
    roleKey: "caseStudies.featured.events.tinhHoaViet.role",
    roleFallback: "Community seeding • Content amplification • Social tracking",
    image: "/cases/tinh-hoa-viet.jpg",
    tags: [
      {
        key: "caseStudies.featured.events.tinhHoaViet.tags.culture",
        fallback: "Culture",
      },
      {
        key: "caseStudies.featured.events.tinhHoaViet.tags.campaign",
        fallback: "Campaign",
      },
      {
        key: "caseStudies.featured.events.tinhHoaViet.tags.social",
        fallback: "Social",
      },
    ],
    metrics: [
      {
        labelKey:
          "caseStudies.featured.events.tinhHoaViet.metrics.content.label",
        labelFallback: "Content",
        valueKey:
          "caseStudies.featured.events.tinhHoaViet.metrics.content.value",
        valueFallback: "Amplify",
      },
      {
        labelKey:
          "caseStudies.featured.events.tinhHoaViet.metrics.seeding.label",
        labelFallback: "Seeding",
        valueKey:
          "caseStudies.featured.events.tinhHoaViet.metrics.seeding.value",
        valueFallback: "Active",
      },
      {
        labelKey:
          "caseStudies.featured.events.tinhHoaViet.metrics.track.label",
        labelFallback: "Track",
        valueKey:
          "caseStudies.featured.events.tinhHoaViet.metrics.track.value",
        valueFallback: "Ongoing",
      },
    ],
  },
  {
    nameKey: "caseStudies.featured.events.vietinbankCountdown2025.name",
    nameFallback: "VietinBank Countdown 2025",
    categoryKey:
      "caseStudies.featured.events.vietinbankCountdown2025.category",
    categoryFallback: "Banking / Event Campaign",
    titleKey: "caseStudies.featured.events.vietinbankCountdown2025.title",
    titleFallback: "Event Social Communication Support",
    roleKey: "caseStudies.featured.events.vietinbankCountdown2025.role",
    roleFallback: "Social buzz • Community interaction • Campaign monitoring",
    image: "/cases/vietinbank-countdown-2025.jpg",
    tags: [
      {
        key: "caseStudies.featured.events.vietinbankCountdown2025.tags.banking",
        fallback: "Banking",
      },
      {
        key: "caseStudies.featured.events.vietinbankCountdown2025.tags.event",
        fallback: "Event",
      },
      {
        key: "caseStudies.featured.events.vietinbankCountdown2025.tags.social",
        fallback: "Social",
      },
    ],
    metrics: [
      {
        labelKey:
          "caseStudies.featured.events.vietinbankCountdown2025.metrics.buzz.label",
        labelFallback: "Buzz",
        valueKey:
          "caseStudies.featured.events.vietinbankCountdown2025.metrics.buzz.value",
        valueFallback: "High",
      },
      {
        labelKey:
          "caseStudies.featured.events.vietinbankCountdown2025.metrics.engage.label",
        labelFallback: "Engage",
        valueKey:
          "caseStudies.featured.events.vietinbankCountdown2025.metrics.engage.value",
        valueFallback: "Strong",
      },
      {
        labelKey:
          "caseStudies.featured.events.vietinbankCountdown2025.metrics.report.label",
        labelFallback: "Report",
        valueKey:
          "caseStudies.featured.events.vietinbankCountdown2025.metrics.report.value",
        valueFallback: "Weekly",
      },
    ],
  },
];

const capabilities = [
  {
    key: "caseStudies.featured.capabilities.eventCommunication",
    fallback: "Event Communication",
  },
  {
    key: "caseStudies.featured.capabilities.socialActivation",
    fallback: "Social Activation",
  },
  {
    key: "caseStudies.featured.capabilities.seedingAmplification",
    fallback: "Seeding & Amplification",
  },
  {
    key: "caseStudies.featured.capabilities.trackingReporting",
    fallback: "Tracking & Reporting",
  },
];

export default function FeaturedEvents() {
  const { tr } = useLanguage();

  return (
    <section
      id="featured-events"
      className="relative overflow-hidden bg-white py-16 text-slate-950 sm:py-20 lg:py-24"
    >
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,rgba(37,99,235,0.08),transparent_32%),radial-gradient(circle_at_bottom_right,rgba(34,211,238,0.12),transparent_34%)]" />

      <Container>
        <div className="mx-auto max-w-4xl text-center">
          <div className="mx-auto mb-5 inline-flex items-center gap-2 rounded-full border border-blue-100 bg-white px-5 py-2 text-xs font-bold uppercase tracking-[0.24em] text-blue-600 shadow-sm">
            <Sparkles className="h-3.5 w-3.5" />
            {tr("caseStudies.featured.badge", "Featured Events")}
          </div>

          <h2 className="text-3xl font-bold tracking-tight text-slate-950 sm:text-5xl">
            {tr("caseStudies.featured.title", "Event / Campaign tiêu biểu")}
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-slate-600 sm:text-lg">
            {tr(
              "caseStudies.featured.description",
              "Tập trung vào các campaign có hình ảnh tốt, dễ truyền tải năng lực social activation, seeding và campaign support của T2M."
            )}
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {events.map((event) => {
            const eventName = tr(event.nameKey, event.nameFallback);

            return (
              <article
                key={event.nameKey}
                className="group overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-[0_20px_60px_rgba(15,23,42,0.07)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_24px_70px_rgba(37,99,235,0.14)]"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={event.image}
                    alt={eventName}
                    fill
                    className="object-cover transition duration-500 group-hover:scale-[1.03]"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/75 via-slate-950/15 to-transparent" />

                  <div className="absolute left-4 top-4 flex flex-wrap gap-2">
                    {event.tags.map((tag) => (
                      <span
                        key={tag.key}
                        className="rounded-full border border-white/20 bg-white/85 px-3 py-1.5 text-xs font-semibold text-slate-700 backdrop-blur"
                      >
                        {tr(tag.key, tag.fallback)}
                      </span>
                    ))}
                  </div>

                  <div className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/85 text-blue-600 shadow-sm backdrop-blur">
                    <ArrowRight className="h-4 w-4" />
                  </div>

                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold text-white backdrop-blur">
                      <CalendarDays className="h-3.5 w-3.5" />
                      {tr(event.categoryKey, event.categoryFallback)}
                    </div>

                    <h3 className="text-2xl font-bold text-white sm:text-3xl">
                      {eventName}
                    </h3>
                  </div>
                </div>

                <div className="p-5 sm:p-6">
                  <h4 className="text-lg font-bold text-slate-950">
                    {tr(event.titleKey, event.titleFallback)}
                  </h4>

                  <p className="mt-3 text-sm leading-6 text-slate-600">
                    {tr(event.roleKey, event.roleFallback)}
                  </p>

                  <div className="mt-5 grid grid-cols-3 gap-2">
                    {event.metrics.map((metric) => (
                      <div
                        key={metric.labelKey}
                        className="rounded-2xl border border-slate-200 bg-slate-50 px-2 py-4 text-center"
                      >
                        <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-slate-400">
                          {tr(metric.labelKey, metric.labelFallback)}
                        </p>
                        <p className="mt-2 text-sm font-bold text-slate-950">
                          {tr(metric.valueKey, metric.valueFallback)}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {capabilities.map((item) => (
            <div
              key={item.key}
              className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm font-semibold text-slate-700"
            >
              <CheckCircle2 className="h-4 w-4 text-blue-600" />
              {tr(item.key, item.fallback)}
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}