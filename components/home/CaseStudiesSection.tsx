"use client";

import Image from "next/image";
import Container from "@/components/layout/Container";
import Button from "@/components/ui/Button";
import { useLanguage } from "@/components/providers/LanguageProvider";
import {
  ArrowRight,
  CheckCircle2,
  ImageIcon,
  Sparkles,
} from "lucide-react";

const events = [
  {
    nameKey: "home.caseStudies.events.songMotDoiCoLai.name",
    nameFallback: "Sống 1 đời có lãi",
    categoryKey: "home.caseStudies.events.songMotDoiCoLai.category",
    categoryFallback: "Social Campaign / Community",
    titleKey: "home.caseStudies.events.songMotDoiCoLai.title",
    titleFallback: "Social Seeding & Campaign Amplification",
    roleKey: "home.caseStudies.events.songMotDoiCoLai.role",
    roleFallback:
      "Comment seeding • Community discussion • Engagement support",
    image: "/cases/song-1-doi-co-lai.jpg",
    tags: [
      {
        key: "home.caseStudies.events.songMotDoiCoLai.tags.social",
        fallback: "Social",
      },
      {
        key: "home.caseStudies.events.songMotDoiCoLai.tags.community",
        fallback: "Community",
      },
      {
        key: "home.caseStudies.events.songMotDoiCoLai.tags.seeding",
        fallback: "Seeding",
      },
    ],
    metrics: [
      {
        labelKey:
          "home.caseStudies.events.songMotDoiCoLai.metrics.discussion.label",
        labelFallback: "Discussion",
        valueKey:
          "home.caseStudies.events.songMotDoiCoLai.metrics.discussion.value",
        valueFallback: "Active",
      },
      {
        labelKey:
          "home.caseStudies.events.songMotDoiCoLai.metrics.signal.label",
        labelFallback: "Signal",
        valueKey:
          "home.caseStudies.events.songMotDoiCoLai.metrics.signal.value",
        valueFallback: "Tracked",
      },
      {
        labelKey:
          "home.caseStudies.events.songMotDoiCoLai.metrics.report.label",
        labelFallback: "Report",
        valueKey:
          "home.caseStudies.events.songMotDoiCoLai.metrics.report.value",
        valueFallback: "Clear",
      },
    ],
  },
  {
    nameKey: "home.caseStudies.events.vinhQuangCongAnNhanDan.name",
    nameFallback: "Vinh quang Công an nhân dân",
    categoryKey: "home.caseStudies.events.vinhQuangCongAnNhanDan.category",
    categoryFallback: "Public Event / Social Communication",
    titleKey: "home.caseStudies.events.vinhQuangCongAnNhanDan.title",
    titleFallback: "Event Communication Support",
    roleKey: "home.caseStudies.events.vinhQuangCongAnNhanDan.role",
    roleFallback: "Social activation • Campaign seeding • Reporting support",
    image: "/cases/vinh-quang-cong-an-nhan-dan.jpg",
    tags: [
      {
        key: "home.caseStudies.events.vinhQuangCongAnNhanDan.tags.event",
        fallback: "Event",
      },
      {
        key: "home.caseStudies.events.vinhQuangCongAnNhanDan.tags.social",
        fallback: "Social",
      },
      {
        key: "home.caseStudies.events.vinhQuangCongAnNhanDan.tags.activation",
        fallback: "Activation",
      },
    ],
    metrics: [
      {
        labelKey:
          "home.caseStudies.events.vinhQuangCongAnNhanDan.metrics.event.label",
        labelFallback: "Event",
        valueKey:
          "home.caseStudies.events.vinhQuangCongAnNhanDan.metrics.event.value",
        valueFallback: "Large-scale",
      },
      {
        labelKey:
          "home.caseStudies.events.vinhQuangCongAnNhanDan.metrics.social.label",
        labelFallback: "Social",
        valueKey:
          "home.caseStudies.events.vinhQuangCongAnNhanDan.metrics.social.value",
        valueFallback: "Boosted",
      },
      {
        labelKey:
          "home.caseStudies.events.vinhQuangCongAnNhanDan.metrics.monitor.label",
        labelFallback: "Monitor",
        valueKey:
          "home.caseStudies.events.vinhQuangCongAnNhanDan.metrics.monitor.value",
        valueFallback: "Daily",
      },
    ],
  },
  {
    nameKey: "home.caseStudies.events.tinhHoaViet.name",
    nameFallback: "Tinh Hoa Việt",
    categoryKey: "home.caseStudies.events.tinhHoaViet.category",
    categoryFallback: "Culture / Brand Event",
    titleKey: "home.caseStudies.events.tinhHoaViet.title",
    titleFallback: "Campaign Seeding & Social Support",
    roleKey: "home.caseStudies.events.tinhHoaViet.role",
    roleFallback: "Community seeding • Content amplification • Social tracking",
    image: "/cases/tinh-hoa-viet.jpg",
    tags: [
      {
        key: "home.caseStudies.events.tinhHoaViet.tags.culture",
        fallback: "Culture",
      },
      {
        key: "home.caseStudies.events.tinhHoaViet.tags.campaign",
        fallback: "Campaign",
      },
      {
        key: "home.caseStudies.events.tinhHoaViet.tags.social",
        fallback: "Social",
      },
    ],
    metrics: [
      {
        labelKey:
          "home.caseStudies.events.tinhHoaViet.metrics.content.label",
        labelFallback: "Content",
        valueKey:
          "home.caseStudies.events.tinhHoaViet.metrics.content.value",
        valueFallback: "Amplified",
      },
      {
        labelKey:
          "home.caseStudies.events.tinhHoaViet.metrics.seeding.label",
        labelFallback: "Seeding",
        valueKey:
          "home.caseStudies.events.tinhHoaViet.metrics.seeding.value",
        valueFallback: "Active",
      },
      {
        labelKey:
          "home.caseStudies.events.tinhHoaViet.metrics.tracking.label",
        labelFallback: "Tracking",
        valueKey:
          "home.caseStudies.events.tinhHoaViet.metrics.tracking.value",
        valueFallback: "Ongoing",
      },
    ],
  },
  {
    nameKey: "home.caseStudies.events.vietinbankCountdown2025.name",
    nameFallback: "VietinBank Countdown 2025",
    categoryKey: "home.caseStudies.events.vietinbankCountdown2025.category",
    categoryFallback: "Banking / Event Campaign",
    titleKey: "home.caseStudies.events.vietinbankCountdown2025.title",
    titleFallback: "Event Social Communication Support",
    roleKey: "home.caseStudies.events.vietinbankCountdown2025.role",
    roleFallback: "Social buzz • Community interaction • Campaign monitoring",
    image: "/cases/vietinbank-countdown-2025.jpg",
    tags: [
      {
        key: "home.caseStudies.events.vietinbankCountdown2025.tags.banking",
        fallback: "Banking",
      },
      {
        key: "home.caseStudies.events.vietinbankCountdown2025.tags.event",
        fallback: "Event",
      },
      {
        key: "home.caseStudies.events.vietinbankCountdown2025.tags.social",
        fallback: "Social",
      },
    ],
    metrics: [
      {
        labelKey:
          "home.caseStudies.events.vietinbankCountdown2025.metrics.buzz.label",
        labelFallback: "Buzz",
        valueKey:
          "home.caseStudies.events.vietinbankCountdown2025.metrics.buzz.value",
        valueFallback: "High",
      },
      {
        labelKey:
          "home.caseStudies.events.vietinbankCountdown2025.metrics.engage.label",
        labelFallback: "Engage",
        valueKey:
          "home.caseStudies.events.vietinbankCountdown2025.metrics.engage.value",
        valueFallback: "Strong",
      },
      {
        labelKey:
          "home.caseStudies.events.vietinbankCountdown2025.metrics.report.label",
        labelFallback: "Report",
        valueKey:
          "home.caseStudies.events.vietinbankCountdown2025.metrics.report.value",
        valueFallback: "Weekly",
      },
    ],
  },
];

const partners = [
  {
    name: "Zeit Media",
    typeKey: "home.caseStudies.partners.zeitMedia.type",
    typeFallback: "Media Partner",
    shortName: "ZEIT",
  },
  {
    name: "Brandforma",
    typeKey: "home.caseStudies.partners.brandforma.type",
    typeFallback: "Brand Agency",
    shortName: "BRANDFORMA",
  },
  {
    name: "OMG",
    typeKey: "home.caseStudies.partners.omg.type",
    typeFallback: "Media Agency",
    shortName: "OMG",
  },
  {
    name: "Light On",
    typeKey: "home.caseStudies.partners.lightOn.type",
    typeFallback: "Creative Partner",
    shortName: "LIGHT ON",
  },
  {
    name: "Zoa Creative",
    typeKey: "home.caseStudies.partners.zoaCreative.type",
    typeFallback: "Creative Agency",
    shortName: "ZOA",
  },
  {
    name: "Alien Media",
    typeKey: "home.caseStudies.partners.alienMedia.type",
    typeFallback: "Media Partner",
    shortName: "ALIEN",
  },
  {
    name: "REVU",
    typeKey: "home.caseStudies.partners.revu.type",
    typeFallback: "Influencer Platform",
    shortName: "REVU",
  },
];

const capabilities = [
  {
    key: "home.caseStudies.capabilities.eventCampaign",
    fallback: "Event / Campaign",
  },
  {
    key: "home.caseStudies.capabilities.socialActivation",
    fallback: "Social Activation",
  },
  {
    key: "home.caseStudies.capabilities.seedingAmplification",
    fallback: "Seeding & Amplification",
  },
  {
    key: "home.caseStudies.capabilities.trackingReporting",
    fallback: "Tracking & Reporting",
  },
];

export default function CaseStudiesSection() {
  const { tr } = useLanguage();

  return (
    <section className="relative overflow-hidden bg-slate-50 py-16 text-slate-950 sm:py-20 lg:py-24">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_right,rgba(37,99,235,0.10),transparent_32%),radial-gradient(circle_at_bottom_left,rgba(34,211,238,0.16),transparent_34%)]" />

      <Container>
        <div className="mx-auto max-w-4xl text-center">
          <div className="mx-auto mb-5 inline-flex items-center gap-2 rounded-full border border-blue-100 bg-white px-5 py-2 text-xs font-bold uppercase tracking-[0.24em] text-blue-600 shadow-sm">
            <Sparkles className="h-3.5 w-3.5" />
            {tr("home.caseStudies.badge", "Selected Experience")}
          </div>

          <h2 className="text-3xl font-bold tracking-tight text-slate-950 sm:text-5xl">
            {tr("home.caseStudies.titlePrefix", "Event & Campaign")}{" "}
            <span className="bg-gradient-to-r from-cyan-500 to-blue-600 bg-clip-text text-transparent">
              {tr("home.caseStudies.titleHighlight", "tiêu biểu")}
            </span>
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-slate-600 sm:text-lg">
            {tr(
              "home.caseStudies.description",
              "Một số chiến dịch và sự kiện tiêu biểu T2M từng hỗ trợ triển khai theo hướng social activation, seeding, amplification và reporting."
            )}
          </p>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-2">
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

                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/15 to-transparent" />

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
                    <p className="text-sm font-medium text-white/85">
                      {tr(event.categoryKey, event.categoryFallback)}
                    </p>
                    <h3 className="mt-1 text-2xl font-bold text-white">
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

        <div className="mt-10 rounded-[2rem] border border-blue-100 bg-white p-6 shadow-sm sm:p-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-slate-600">
                <ImageIcon className="h-3.5 w-3.5 text-blue-600" />
                {tr("home.caseStudies.partnersBadge", "Selected Partners")}
              </div>

              <h3 className="mt-4 text-2xl font-bold text-slate-950">
                {tr(
                  "home.caseStudies.partnersTitle",
                  "Agency & company partners"
                )}
              </h3>

              <p className="mt-2 max-w-2xl text-sm leading-7 text-slate-600">
                {tr(
                  "home.caseStudies.partnersDescription",
                  "Một số đối tác, agency và đơn vị T2M từng đồng hành hỗ trợ triển khai campaign."
                )}
              </p>
            </div>

            <Button
              href="/case-studies"
              size="lg"
              className="w-full bg-blue-600 text-white shadow-[0_16px_32px_rgba(37,99,235,0.20)] hover:bg-blue-500 sm:w-auto"
            >
              {tr("home.caseStudies.viewMoreCta", "Xem thêm kinh nghiệm")}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>

          <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7">
            {partners.map((partner) => (
              <div
                key={partner.name}
                className="group flex min-h-24 flex-col items-center justify-center rounded-2xl border border-slate-200 bg-slate-50 px-4 py-5 text-center transition hover:-translate-y-0.5 hover:border-blue-200 hover:bg-white hover:shadow-sm"
              >
                <p className="text-base font-black tracking-tight text-slate-950">
                  {partner.shortName}
                </p>

                <p className="mt-1 text-xs font-medium text-slate-500">
                  {tr(partner.typeKey, partner.typeFallback)}
                </p>
              </div>
            ))}
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
        </div>
      </Container>
    </section>
  );
}