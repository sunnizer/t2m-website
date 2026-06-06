import Container from "@/components/layout/Container";
import { HelpCircle, Sparkles } from "lucide-react";

const faqs = [
  {
    question: "Tôi chưa có brief chi tiết thì có gửi form được không?",
    answer:
      "Được. Anh/chị chỉ cần mô tả ngắn mục tiêu, sản phẩm/dịch vụ, timeline hoặc vấn đề đang cần hỗ trợ. T2M sẽ liên hệ lại để làm rõ thêm.",
  },
  {
    question: "T2M có nhận dự án nhỏ hoặc theo từng hạng mục không?",
    answer:
      "Có. T2M có thể hỗ trợ từng hạng mục như media planning, seeding, performance setup, tracking/reporting hoặc automation tùy theo brief.",
  },
  {
    question: "Sau khi gửi form, bao lâu T2M phản hồi?",
    answer:
      "T2M sẽ cố gắng phản hồi trong thời gian sớm nhất qua Zalo hoặc email. Với brief cần kiểm tra kỹ, T2M có thể cần thêm thời gian để xem thông tin trước khi đề xuất hướng phù hợp.",
  },
  {
    question: "Thông tin gửi qua form có được bảo mật không?",
    answer:
      "T2M chỉ sử dụng thông tin để liên hệ tư vấn và đánh giá nhu cầu dự án. Không sử dụng thông tin cho mục đích spam.",
  },
];

export default function ContactFAQ() {
  return (
    <section className="bg-white py-16 text-slate-950 sm:py-20 lg:py-24">
      <Container>
        <div className="mx-auto max-w-4xl text-center">
          <div className="mx-auto mb-5 inline-flex items-center gap-2 rounded-full border border-blue-100 bg-white px-5 py-2 text-xs font-bold uppercase tracking-[0.24em] text-blue-600 shadow-sm">
            <Sparkles className="h-3.5 w-3.5" />
            Contact FAQ
          </div>

          <h2 className="text-3xl font-bold tracking-tight text-slate-950 sm:text-5xl">
            Câu hỏi thường gặp
          </h2>
        </div>

        <div className="mx-auto mt-12 grid max-w-5xl gap-5 md:grid-cols-2">
          {faqs.map((item) => (
            <div
              key={item.question}
              className="rounded-[2rem] border border-slate-200 bg-slate-50 p-6 shadow-sm"
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