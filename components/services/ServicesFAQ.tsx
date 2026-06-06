"use client";

import Container from "@/components/layout/Container";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { HelpCircle, Sparkles } from "lucide-react";

const faqs = [
  {
    questionKey: "services.faq.items.revenueCommitment.question",
    questionFallback: "T2M có nhận chạy performance theo cam kết doanh số không?",
    answerKey: "services.faq.items.revenueCommitment.answer",
    answerFallback:
      "T2M không cam kết quá đà về doanh số nếu chưa kiểm soát đủ sản phẩm, offer, landing page, tracking và sales process. T2M tập trung vào setup, vận hành, tối ưu và báo cáo minh bạch theo KPI đã thống nhất.",
  },
  {
    questionKey: "services.faq.items.businessOrAgency.question",
    questionFallback: "T2M phù hợp với doanh nghiệp hay agency?",
    answerKey: "services.faq.items.businessOrAgency.answer",
    answerFallback:
      "Cả hai. T2M phù hợp với SME/startup cần đội triển khai linh hoạt, hoặc agency cần partner hỗ trợ execution, seeding, tracking, reporting theo từng campaign.",
  },
  {
    questionKey: "services.faq.items.smallScope.question",
    questionFallback: "Có thể chỉ thuê một hạng mục nhỏ không?",
    answerKey: "services.faq.items.smallScope.answer",
    answerFallback:
      "Có. T2M có thể hỗ trợ từng hạng mục riêng như media planning, seeding, tracking/reporting hoặc performance setup tùy theo brief.",
  },
  {
    questionKey: "services.faq.items.startTiming.question",
    questionFallback: "Bao lâu có thể bắt đầu triển khai?",
    answerKey: "services.faq.items.startTiming.answer",
    answerFallback:
      "Tùy độ phức tạp của brief. Với các hạng mục đơn giản, T2M có thể review và đề xuất scope trong thời gian ngắn sau khi nhận đủ thông tin cần thiết.",
  },
];

export default function ServicesFAQ() {
  const { tr } = useLanguage();

  return (
    <section className="relative overflow-hidden bg-slate-50 py-16 text-slate-950 sm:py-20 lg:py-24">
      <Container>
        <div className="mx-auto max-w-4xl text-center">
          <div className="mx-auto mb-5 inline-flex items-center gap-2 rounded-full border border-blue-100 bg-white px-5 py-2 text-xs font-bold uppercase tracking-[0.24em] text-blue-600 shadow-sm">
            <Sparkles className="h-3.5 w-3.5" />
            {tr("services.faq.badge", "FAQ")}
          </div>

          <h2 className="text-3xl font-bold tracking-tight text-slate-950 sm:text-5xl">
            {tr("services.faq.title", "Câu hỏi thường gặp")}
          </h2>
        </div>

        <div className="mx-auto mt-12 grid max-w-5xl gap-5 md:grid-cols-2">
          {faqs.map((item) => (
            <div
              key={item.questionKey}
              className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-[0_20px_60px_rgba(15,23,42,0.06)]"
            >
              <div className="flex gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
                  <HelpCircle className="h-5 w-5" />
                </div>

                <div>
                  <h3 className="text-base font-bold text-slate-950">
                    {tr(item.questionKey, item.questionFallback)}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-slate-600">
                    {tr(item.answerKey, item.answerFallback)}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
