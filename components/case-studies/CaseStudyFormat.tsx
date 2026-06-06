import Container from "@/components/layout/Container";
import {
  CheckCircle2,
  FileText,
  Layers3,
  LineChart,
  Target,
  Sparkles,
} from "lucide-react";

const formats = [
  {
    title: "Client / Campaign",
    description: "Tên khách hàng, tên event hoặc tên chiến dịch.",
    icon: Target,
  },
  {
    title: "Scope of Work",
    description: "Phạm vi T2M hỗ trợ: seeding, media, tracking, reporting.",
    icon: Layers3,
  },
  {
    title: "Execution Summary",
    description: "Tóm tắt cách triển khai và các đầu việc chính.",
    icon: FileText,
  },
  {
    title: "Key Metrics / Learning",
    description: "Chỉ số vận hành hoặc learning có thể chia sẻ công khai.",
    icon: LineChart,
  },
];

export default function CaseStudyFormat() {
  return (
    <section className="bg-white py-16 text-slate-950 sm:py-20 lg:py-24">
      <Container>
        <div className="mx-auto max-w-4xl text-center">
          <div className="mx-auto mb-5 inline-flex items-center gap-2 rounded-full border border-blue-100 bg-white px-5 py-2 text-xs font-bold uppercase tracking-[0.24em] text-blue-600 shadow-sm">
            <Sparkles className="h-3.5 w-3.5" />
            Case Format
          </div>

          <h2 className="text-3xl font-bold tracking-tight text-slate-950 sm:text-5xl">
            Cách T2M trình bày case study
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-slate-600 sm:text-lg">
            Với những dự án chưa được phép công khai chi tiết, T2M ưu tiên trình
            bày gọn theo scope, vai trò triển khai và learning chính.
          </p>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {formats.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.title}
                className="rounded-[2rem] border border-slate-200 bg-slate-50 p-6 shadow-sm"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 text-white shadow-lg shadow-blue-500/20">
                  <Icon className="h-7 w-7" />
                </div>

                <h3 className="mt-6 text-lg font-bold text-slate-950">
                  {item.title}
                </h3>

                <p className="mt-3 text-sm leading-7 text-slate-600">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>

        <div className="mt-8 rounded-[2rem] border border-blue-100 bg-gradient-to-r from-blue-50 via-white to-cyan-50 p-6 shadow-sm sm:p-8">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              "Không công khai số liệu nhạy cảm",
              "Tôn trọng bảo mật khách hàng",
              "Tập trung vào vai trò triển khai",
              "Dễ scan khi gửi proposal",
            ].map((item) => (
              <div key={item} className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-blue-600" />
                <span className="text-sm font-semibold text-slate-700">
                  {item}
                </span>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}