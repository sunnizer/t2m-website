import Container from "@/components/layout/Container";
import { HelpCircle, Sparkles } from "lucide-react";

const faqs = [
  {
    question: "T2M có nhận chạy performance theo cam kết doanh số không?",
    answer:
      "T2M không cam kết quá đà về doanh số nếu chưa kiểm soát đủ sản phẩm, offer, landing page, tracking và sales process. T2M tập trung vào setup, vận hành, tối ưu và báo cáo minh bạch theo KPI đã thống nhất.",
  },
  {
    question: "T2M phù hợp với doanh nghiệp hay agency?",
    answer:
      "Cả hai. T2M phù hợp với SME/startup cần đội triển khai linh hoạt, hoặc agency cần partner hỗ trợ execution, seeding, tracking, reporting theo từng campaign.",
  },
  {
    question: "Có thể chỉ thuê một hạng mục nhỏ không?",
    answer:
      "Có. T2M có thể hỗ trợ từng hạng mục riêng như media planning, seeding, tracking/reporting hoặc performance setup tùy theo brief.",
  },
  {
    question: "Bao lâu có thể bắt đầu triển khai?",
    answer:
      "Tùy độ phức tạp của brief. Với các hạng mục đơn giản, T2M có thể review và đề xuất scope trong thời gian ngắn sau khi nhận đủ thông tin cần thiết.",
  },
];

export default function ServicesFAQ() {
  return (
    <section className="relative overflow-hidden bg-slate-50 py-16 text-slate-950 sm:py-20 lg:py-24">
      <Container>
        <div className="mx-auto max-w-4xl text-center">
          <div className="mx-auto mb-5 inline-flex items-center gap-2 rounded-full border border-blue-100 bg-white px-5 py-2 text-xs font-bold uppercase tracking-[0.24em] text-blue-600 shadow-sm">
            <Sparkles className="h-3.5 w-3.5" />
            FAQ
          </div>

          <h2 className="text-3xl font-bold tracking-tight text-slate-950 sm:text-5xl">
            Câu hỏi thường gặp
          </h2>
        </div>

        <div className="mx-auto mt-12 grid max-w-5xl gap-5 md:grid-cols-2">
          {faqs.map((item) => (
            <div
              key={item.question}
              className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-[0_20px_60px_rgba(15,23,42,0.06)]"
            >
              <div className="flex gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
                  <HelpCircle className="h-5 w-5" />
                </div>

                <div>
                  <h3 className="text-base font-bold text-slate-950">
                    {item.question}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-slate-600">
                    {item.answer}
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