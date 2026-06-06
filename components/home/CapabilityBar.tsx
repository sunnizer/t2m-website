"use client";

import Container from "@/components/layout/Container";
import { useLanguage } from "@/components/providers/LanguageProvider";

const capabilities = [
  {
    key: "home.capabilityBar.items.performanceMarketing",
    fallback: "Performance Marketing",
  },
  {
    key: "home.capabilityBar.items.mediaPlanning",
    fallback: "Media Planning",
  },
  {
    key: "home.capabilityBar.items.socialMediaSeeding",
    fallback: "Social Media & Seeding",
  },
  {
    key: "home.capabilityBar.items.trackingReporting",
    fallback: "Tracking & Reporting",
  },
  {
    key: "home.capabilityBar.items.marketingAutomation",
    fallback: "Marketing Automation",
  },
];

export default function CapabilityBar() {
  const { tr } = useLanguage();

  return (
    <section className="border-b border-white/10 bg-slate-950 py-6">
      <Container>
        <div className="flex flex-wrap items-center justify-center gap-3">
          {capabilities.map((item) => (
            <span
              key={item.key}
              className="rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-sm text-slate-300"
            >
              {tr(item.key, item.fallback)}
            </span>
          ))}
        </div>
      </Container>
    </section>
  );
}