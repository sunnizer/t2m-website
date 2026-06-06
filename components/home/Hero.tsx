import Image from "next/image";
import Container from "@/components/layout/Container";
import Button from "@/components/ui/Button";
import { ArrowRight, PlayCircle, Sparkles } from "lucide-react";

const quickPoints = [
  "Performance\nMarketing",
  "Media\nPlanning",
  "Social\nSeeding",
  "Tracking &\nAutomation",
];

export default function Hero() {
  return (
    <section className="relative min-h-[620px] overflow-hidden bg-slate-50 text-slate-950 sm:min-h-[680px] lg:min-h-[720px]">
      <Image
        src="/visuals/t2m-growth-hero.png"
        alt="T2M digital marketing growth system visual"
        fill
        priority
        className="object-cover object-[58%_center]"
      />

      <div className="absolute inset-0 bg-gradient-to-r from-white via-white/88 to-white/20" />
      <div className="absolute inset-0 bg-gradient-to-b from-white/15 via-transparent to-white/70" />

      <Container className="relative z-10">
        <div className="flex min-h-[620px] items-center py-14 sm:min-h-[680px] sm:py-16 lg:min-h-[720px]">
          <div className="max-w-[540px]">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-white/75 px-4 py-2 text-sm font-semibold text-blue-700 shadow-sm backdrop-blur">
              <Sparkles className="h-4 w-4" />
              T2M Media & Solutions
            </div>

            <h1 className="text-[42px] font-bold leading-[1.05] tracking-tight text-slate-950 sm:text-[56px] lg:text-[64px]">
              Tăng trưởng{" "}
              <span className="text-blue-600">hiệu quả.</span>
              <br />
              Dẫn đầu thị trường.
            </h1>

            <p className="mt-6 max-w-[500px] text-base leading-8 text-slate-600 sm:text-[17px]">
              T2M cung cấp giải pháp Digital Marketing & Media giúp doanh nghiệp
              tăng trưởng dựa trên dữ liệu, công nghệ và khả năng triển khai thực chiến.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button
                href="/contact"
                size="md"
                className="w-full bg-blue-600 px-6 text-white shadow-[0_18px_36px_rgba(37,99,235,0.22)] hover:bg-blue-500 sm:w-auto"
              >
                Khám phá giải pháp
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>

              <Button
                href="/services"
                variant="secondary"
                size="md"
                className="w-full border-blue-200 bg-white/75 px-6 text-blue-700 hover:border-blue-400 hover:bg-white sm:w-auto"
              >
                <PlayCircle className="mr-2 h-4 w-4" />
                Xem năng lực
              </Button>
            </div>

            <div className="mt-8 grid max-w-[560px] grid-cols-2 gap-3 sm:grid-cols-4">
              {quickPoints.map((item) => (
                <div
                  key={item}
                  className="flex min-h-[64px] items-center justify-center rounded-2xl border border-slate-200 bg-white/78 px-3 py-3 text-center text-[13px] font-semibold leading-5 text-slate-700 shadow-sm backdrop-blur transition hover:-translate-y-0.5 hover:border-blue-200 hover:bg-white"
                >
                  <span className="whitespace-pre-line">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}