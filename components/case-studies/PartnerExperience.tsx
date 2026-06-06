"use client";

import Container from "@/components/layout/Container";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { Building2, Handshake, Sparkles } from "lucide-react";

const partners = [
  {
    name: "Zeit Media",
    typeKey: "caseStudies.partners.items.zeitMedia.type",
    typeFallback: "Media Partner",
    shortName: "ZEIT",
  },
  {
    name: "Brandforma",
    typeKey: "caseStudies.partners.items.brandforma.type",
    typeFallback: "Brand Agency",
    shortName: "BRANDFORMA",
  },
  {
    name: "OMG",
    typeKey: "caseStudies.partners.items.omg.type",
    typeFallback: "Media Agency",
    shortName: "OMG",
  },
  {
    name: "Light On",
    typeKey: "caseStudies.partners.items.lightOn.type",
    typeFallback: "Creative Partner",
    shortName: "LIGHT ON",
  },
  {
    name: "Zoa Creative",
    typeKey: "caseStudies.partners.items.zoaCreative.type",
    typeFallback: "Creative Agency",
    shortName: "ZOA",
  },
  {
    name: "Alien Media",
    typeKey: "caseStudies.partners.items.alienMedia.type",
    typeFallback: "Media Partner",
    shortName: "ALIEN",
  },
  {
    name: "REVU",
    typeKey: "caseStudies.partners.items.revu.type",
    typeFallback: "Influencer Platform",
    shortName: "REVU",
  },
];

export default function PartnerExperience() {
  const { tr } = useLanguage();

  return (
    <section className="relative overflow-hidden bg-slate-50 py-16 text-slate-950 sm:py-20 lg:py-24">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_right,rgba(37,99,235,0.10),transparent_32%),radial-gradient(circle_at_bottom_left,rgba(34,211,238,0.16),transparent_34%)]" />

      <Container>
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
          <div>
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-blue-100 bg-white px-5 py-2 text-xs font-bold uppercase tracking-[0.24em] text-blue-600 shadow-sm">
              <Sparkles className="h-3.5 w-3.5" />
              {tr("caseStudies.partners.badge", "Partner Experience")}
            </div>

            <h2 className="text-3xl font-bold tracking-tight text-slate-950 sm:text-5xl">
              {tr("caseStudies.partners.title", "Agency & company partners")}
            </h2>

            <p className="mt-5 max-w-xl text-base leading-8 text-slate-600 sm:text-lg">
              {tr(
                "caseStudies.partners.description",
                "Một số đối tác, agency và đơn vị T2M từng đồng hành hỗ trợ triển khai campaign. Phần này hiển thị bằng text card để đảm bảo đồng bộ, không phụ thuộc chất lượng logo."
              )}
            </p>

            <div className="mt-8 rounded-[2rem] border border-blue-100 bg-white p-5 shadow-sm">
              <div className="flex gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 text-white">
                  <Handshake className="h-6 w-6" />
                </div>

                <div>
                  <h3 className="font-bold text-slate-950">
                    {tr(
                      "caseStudies.partners.workflow.title",
                      "Collaboration-first workflow"
                    )}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    {tr(
                      "caseStudies.partners.workflow.description",
                      "T2M có thể làm việc như partner triển khai, hỗ trợ agency hoặc đồng hành trực tiếp cùng brand theo từng campaign."
                    )}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 xl:grid-cols-4">
            {partners.map((partner) => (
              <div
                key={partner.name}
                className="group flex min-h-28 flex-col justify-between rounded-2xl border border-slate-200 bg-white p-5 transition hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-sm"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                  <Building2 className="h-5 w-5" />
                </div>

                <div className="mt-6">
                  <p className="text-base font-black tracking-tight text-slate-950">
                    {partner.shortName}
                  </p>

                  <p className="mt-1 text-xs font-medium text-slate-500">
                    {tr(partner.typeKey, partner.typeFallback)}
                  </p>

                  <p className="mt-3 text-xs text-slate-400">
                    {partner.name}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}