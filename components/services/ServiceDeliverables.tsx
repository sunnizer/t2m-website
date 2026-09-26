"use client";

import Container from "@/components/layout/Container";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { ArrowUpRight, Check, FileBarChart2, LayoutGrid, ListChecks, Table2 } from "lucide-react";

const examples = [
  { vi: "Media plan", en: "Media plan", icon: LayoutGrid, bars: ["w-3/4", "w-1/2", "w-5/6"], accent: "bg-blue-500" },
  { vi: "Checklist triển khai", en: "Launch checklist", icon: ListChecks, bars: ["w-4/5", "w-2/3", "w-3/4"], accent: "bg-cyan-500" },
  { vi: "Bảng theo dõi", en: "Tracking sheet", icon: Table2, bars: ["w-2/3", "w-5/6", "w-1/2"], accent: "bg-indigo-500" },
  { vi: "Báo cáo kết quả", en: "Results report", icon: FileBarChart2, bars: ["w-1/2", "w-3/4", "w-2/3"], accent: "bg-emerald-500" },
];

export default function ServiceDeliverables() {
  const { locale, tr } = useLanguage();

  return (
    <section className="bg-[#f3f8ff] py-16 text-slate-950 sm:py-20 lg:py-24">
      <Container>
        <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-[0.22em] text-blue-600">
              {tr("services.deliverables.badge", "Kết quả bàn giao")}
            </span>
            <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-5xl">
              {tr("services.deliverables.title", "Khách hàng nhận được gì?")}
            </h2>
            <p className="mt-5 text-base leading-7 text-slate-600 sm:text-lg">
              {locale === "vi"
                ? "Từ kế hoạch đến báo cáo, mỗi đầu ra đều giúp bạn theo dõi công việc dễ hơn."
                : "From planning to reporting, every deliverable makes the work easier to follow."}
            </p>
          </div>
          <span className="text-xs text-slate-500">
            {locale === "vi" ? "Hình minh họa định dạng, không phải tài liệu khách hàng." : "Format illustrations, not client documents."}
          </span>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {examples.map((item, index) => {
            const Icon = item.icon;
            return (
              <div key={item.en} className="overflow-hidden rounded-[1.75rem] border border-blue-100 bg-white p-4 shadow-[0_16px_38px_rgba(30,64,175,0.07)]">
                <div className="aspect-[1.18] rounded-2xl bg-slate-100 p-4">
                  <div className="h-full rounded-xl border border-slate-200 bg-white p-3 shadow-sm">
                    <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
                      <span className={`flex h-8 w-8 items-center justify-center rounded-lg text-white ${item.accent}`}><Icon className="h-4 w-4" /></span>
                      <span className="h-2 w-20 rounded-full bg-slate-200" />
                      <span className="ml-auto flex gap-1"><i className="h-1.5 w-1.5 rounded-full bg-slate-200" /><i className="h-1.5 w-1.5 rounded-full bg-slate-200" /></span>
                    </div>
                    <div className="mt-4 space-y-3">
                      {item.bars.map((bar, row) => (
                        <div key={row} className="flex items-center gap-3">
                          <Check className="h-3.5 w-3.5 shrink-0 text-blue-500" />
                          <span className={`h-2 rounded-full bg-slate-200 ${bar}`} />
                        </div>
                      ))}
                    </div>
                    <div className="mt-5 flex h-10 items-end gap-1.5 border-b border-slate-100 pb-1">
                      {[4, 6, 5, 8, 6, 9, 7].map((height, bar) => (
                        <span key={bar} className={`w-full rounded-t-sm opacity-75 ${item.accent}`} style={{ height: `${height * 10}%` }} />
                      ))}
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between gap-2 px-1 pt-5 pb-1">
                  <div>
                    <span className="text-xs font-bold text-blue-600">0{index + 1}</span>
                    <h3 className="mt-1 text-base font-bold">{locale === "vi" ? item.vi : item.en}</h3>
                  </div>
                  <ArrowUpRight className="h-5 w-5 text-blue-600" aria-hidden="true" />
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
