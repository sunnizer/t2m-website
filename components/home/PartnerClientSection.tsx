"use client";

import { useEffect, useMemo, useState } from "react";
import Container from "@/components/layout/Container";
import { useLanguage } from "@/components/providers/LanguageProvider";
import {
  Building2,
  Handshake,
  ShieldCheck,
  Sparkles,
  UsersRound,
  type LucideIcon,
} from "lucide-react";
import {
  defaultPartnerClientData,
  type PartnerClientData,
  type PartnerClientLogo,
  type PartnerClientLogoSize,
} from "@/lib/partnerClientData";

type LogoGroup = {
  titleKey: string;
  titleFallback: string;
  icon: LucideIcon;
  items: PartnerClientLogo[];
};

const trustStats = [
  {
    valueKey: "home.partnerClient.stats.clients.value",
    valueFallback: "18+",
    labelKey: "home.partnerClient.stats.clients.label",
    labelFallback: "khách hàng / thương hiệu",
  },
  {
    valueKey: "home.partnerClient.stats.partners.value",
    valueFallback: "12+",
    labelKey: "home.partnerClient.stats.partners.label",
    labelFallback: "nền tảng & đối tác",
  },
  {
    valueKey: "home.partnerClient.stats.network.value",
    valueFallback: "30+",
    labelKey: "home.partnerClient.stats.network.label",
    labelFallback: "mạng lưới phối hợp",
  },
];

const imageSizeClass: Record<PartnerClientLogoSize, string> = {
  small: "max-h-9 max-w-[110px]",
  medium: "max-h-12 max-w-[140px]",
  large: "max-h-14 max-w-[150px]",
  wide: "max-h-10 max-w-[175px]",
};

const textSizeClass: Record<PartnerClientLogoSize, string> = {
  small: "text-lg sm:text-xl",
  medium: "text-xl sm:text-2xl",
  large: "text-2xl sm:text-3xl",
  wide: "text-lg sm:text-xl",
};

function getLogoSize(size?: PartnerClientLogoSize): PartnerClientLogoSize {
  return size ?? "medium";
}

function LogoCell({ item }: { item: PartnerClientLogo }) {
  const size = getLogoSize(item.size);

  return (
    <div className="group relative flex min-h-24 items-center justify-center border-b border-r border-slate-200 px-4 py-6 last:border-r-0 sm:min-h-28">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-blue-50/0 via-white/0 to-cyan-50/0 opacity-0 transition duration-300 group-hover:opacity-100" />

      {item.image ? (
        <div className="relative flex h-16 w-full max-w-[190px] items-center justify-center transition duration-300 group-hover:scale-105">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={item.image}
            alt={item.name}
            className={[
              "object-contain grayscale opacity-60 transition duration-300 group-hover:opacity-90",
              imageSizeClass[size],
            ].join(" ")}
          />
        </div>
      ) : (
        <span
          className={[
            "relative text-center font-black leading-none text-slate-400 grayscale transition duration-300 group-hover:scale-105 group-hover:text-slate-700",
            textSizeClass[size],
            item.className ?? "",
          ].join(" ")}
        >
          {item.shortName || item.name}
        </span>
      )}
    </div>
  );
}

export default function PartnerClientSection() {
  const { tr } = useLanguage();
  const [data, setData] = useState<PartnerClientData>(
    defaultPartnerClientData
  );

  useEffect(() => {
    async function loadPartnerClientData() {
      try {
        const response = await fetch("/api/admin/partner-client", {
          cache: "no-store",
        });

        const json = await response.json();

        if (!response.ok || !json?.ok) {
          return;
        }

        setData(json.data as PartnerClientData);
      } catch {
        setData(defaultPartnerClientData);
      }
    }

    loadPartnerClientData();
  }, []);

  const logoGroups: LogoGroup[] = useMemo(
    () => [
      {
        titleKey: "home.partnerClient.clientsTitle",
        titleFallback: "Khách hàng",
        icon: UsersRound,
        items: data.clients,
      },
      {
        titleKey: "home.partnerClient.partnersTitle",
        titleFallback: "Đối tác",
        icon: Handshake,
        items: data.partners,
      },
    ],
    [data]
  );

  return (
    <section
      id="partners-clients"
      className="relative overflow-hidden bg-[#f8fbff] py-16 text-slate-950 sm:py-20 lg:py-24"
    >
      <div className="pointer-events-none absolute left-0 top-24 h-28 w-40 bg-[radial-gradient(circle,rgba(37,99,235,0.28)_1.5px,transparent_1.5px)] [background-size:16px_16px]" />
      <div className="pointer-events-none absolute right-0 top-24 h-28 w-40 bg-[radial-gradient(circle,rgba(37,99,235,0.28)_1.5px,transparent_1.5px)] [background-size:16px_16px]" />
      <div className="pointer-events-none absolute left-1/2 top-0 -z-10 h-[520px] w-[920px] -translate-x-1/2 rounded-full bg-blue-100/60 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 right-0 -z-10 h-80 w-80 rounded-full bg-cyan-200/30 blur-3xl" />

      <Container>
        <div className="mx-auto max-w-5xl text-center">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-blue-100 bg-white/85 px-4 py-2 text-xs font-bold uppercase tracking-[0.24em] text-blue-700 shadow-sm">
            <ShieldCheck className="h-4 w-4" />
            {tr("home.partnerClient.badge", "Trusted Network")}
          </div>

          <h2 className="text-balance text-4xl font-black tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
            {tr("home.partnerClient.title", "Khách hàng & đối tác đồng hành")}
          </h2>

          <p className="mx-auto mt-5 max-w-3xl text-pretty text-base leading-8 text-slate-600 sm:text-lg">
            {tr(
              "home.partnerClient.description",
              "T2M đã có cơ hội phối hợp cùng các thương hiệu, cộng đồng và đối tác trong nhiều hoạt động social activation, seeding, amplification và reporting."
            )}
          </p>
        </div>

        <div className="mx-auto mt-9 grid max-w-4xl gap-3 sm:grid-cols-3">
          {trustStats.map((stat) => (
            <div
              key={stat.labelKey}
              className="rounded-2xl border border-slate-200 bg-white/85 px-5 py-4 text-center shadow-[0_14px_40px_rgba(15,23,42,0.05)] backdrop-blur"
            >
              <div className="text-3xl font-black tracking-tight text-blue-700">
                {tr(stat.valueKey, stat.valueFallback)}
              </div>
              <div className="mt-1 text-xs font-bold uppercase tracking-[0.16em] text-slate-500">
                {tr(stat.labelKey, stat.labelFallback)}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 space-y-6">
          {logoGroups.map((group) => {
            const Icon = group.icon;

            return (
              <div
                key={group.titleKey}
                className="overflow-hidden rounded-[2rem] border border-slate-200/90 bg-white/90 p-5 shadow-[0_24px_80px_rgba(15,23,42,0.07)] backdrop-blur sm:p-7"
              >
                <div className="mb-5 flex items-center gap-4">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-slate-50 text-slate-700 ring-1 ring-slate-200">
                    <Icon className="h-6 w-6" />
                  </div>

                  <div className="h-10 w-px bg-slate-200" />

                  <h3 className="text-base font-black uppercase tracking-[0.18em] text-slate-950">
                    {tr(group.titleKey, group.titleFallback)}
                  </h3>
                </div>

                <div className="grid grid-cols-2 overflow-hidden rounded-2xl border border-slate-200 bg-white sm:grid-cols-3 lg:grid-cols-6">
                  {group.items.map((item) => (
                    <LogoCell key={item.id} item={item} />
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-8 rounded-3xl border border-blue-100 bg-white/85 p-6 shadow-[0_18px_60px_rgba(15,23,42,0.06)] backdrop-blur">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-lg shadow-blue-600/20">
                <Sparkles className="h-5 w-5" />
              </div>

              <div>
                <h3 className="text-xl font-black tracking-tight text-slate-950">
                  {tr(
                    "home.partnerClient.bottomTitle",
                    "Mạng lưới triển khai linh hoạt cho từng chiến dịch"
                  )}
                </h3>
                <p className="mt-2 max-w-3xl text-sm leading-7 text-slate-600">
                  {tr(
                    "home.partnerClient.bottomDescription",
                    "T2M kết hợp kinh nghiệm triển khai, hệ sinh thái đối tác và dữ liệu social để hỗ trợ thương hiệu vận hành chiến dịch hiệu quả hơn."
                  )}
                </p>
              </div>
            </div>

            <div className="flex shrink-0 items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4">
              <Building2 className="h-5 w-5 text-blue-700" />
              <span className="text-sm font-extrabold text-slate-700">
                {tr(
                  "home.partnerClient.bottomTag",
                  "Brand • Agency • Platform • Community"
                )}
              </span>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}