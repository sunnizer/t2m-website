"use client";

import { FormEvent, useState } from "react";
import Container from "@/components/layout/Container";
import {
  CheckCircle2,
  ClipboardEdit,
  Mail,
  MessageCircle,
  Phone,
  Send,
  Sparkles,
} from "lucide-react";

const services = [
  "Event / Campaign Support",
  "Social Media & Seeding",
  "Performance Marketing",
  "Media Planning",
  "Tracking, Report & Automation",
  "Chưa chắc, cần T2M tư vấn",
];

const checklist = [
  "Tư vấn theo loại campaign / event",
  "Làm rõ scope trước khi báo giá",
  "Có thể hỗ trợ brand hoặc agency",
  "Tập trung social activation, seeding, tracking & reporting",
];

export default function CaseStudiesCTA() {
  const [isSubmitted, setIsSubmitted] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const name = String(formData.get("name") || "");
    const company = String(formData.get("company") || "");
    const phone = String(formData.get("phone") || "");
    const email = String(formData.get("email") || "");
    const service = String(formData.get("service") || "");
    const budget = String(formData.get("budget") || "");
    const message = String(formData.get("message") || "");

    const subject = encodeURIComponent(
      `Brief campaign từ trang Case Studies T2M - ${company || name}`
    );

    const body = encodeURIComponent(
      `Thông tin khách hàng:\n\n` +
        `Họ tên: ${name}\n` +
        `Công ty: ${company}\n` +
        `SĐT/Zalo: ${phone}\n` +
        `Email: ${email}\n` +
        `Dịch vụ quan tâm: ${service}\n` +
        `Ngân sách dự kiến: ${budget}\n\n` +
        `Nội dung brief:\n${message}\n`
    );

    window.location.href = `mailto:contact@t2m.vn?subject=${subject}&body=${body}`;

    setIsSubmitted(true);
  }

  return (
    <section className="relative overflow-hidden bg-white py-16 text-slate-950 sm:py-20 lg:py-24">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,rgba(37,99,235,0.10),transparent_32%),radial-gradient(circle_at_bottom_right,rgba(34,211,238,0.16),transparent_34%)]" />

      <Container>
        <div className="overflow-hidden rounded-[2rem] border border-blue-100 bg-gradient-to-br from-blue-50 via-white to-cyan-50 shadow-[0_24px_80px_rgba(37,99,235,0.12)]">
          <div className="grid gap-0 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="relative p-6 sm:p-8 lg:p-10">
              <div className="absolute -left-10 top-10 h-40 w-40 rounded-full bg-cyan-200/40 blur-3xl" />

              <div className="relative">
                <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-blue-100 bg-white px-5 py-2 text-xs font-bold uppercase tracking-[0.24em] text-blue-600 shadow-sm">
                  <Sparkles className="h-3.5 w-3.5" />
                  Work with T2M
                </div>

                <h2 className="text-3xl font-bold tracking-tight text-slate-950 sm:text-5xl">
                  Cần một partner triển khai{" "}
                  <span className="bg-gradient-to-r from-cyan-500 to-blue-600 bg-clip-text text-transparent">
                    campaign?
                  </span>
                </h2>

                <p className="mt-5 max-w-xl text-base leading-8 text-slate-600">
                  Nếu anh/chị đang có event, campaign social, seeding hoặc cần
                  hỗ trợ execution/reporting, hãy để lại thông tin. T2M sẽ chủ
                  động liên hệ lại để làm rõ nhu cầu.
                </p>

                <div className="mt-8 grid gap-3">
                  {checklist.map((item) => (
                    <div key={item} className="flex items-center gap-3">
                      <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-blue-600 text-white">
                        <CheckCircle2 className="h-4 w-4" />
                      </div>
                      <span className="text-sm font-medium text-slate-700">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="mt-8 grid gap-3 sm:grid-cols-3">
                  <div className="rounded-2xl border border-blue-100 bg-white/80 p-4 shadow-sm">
                    <ClipboardEdit className="h-5 w-5 text-blue-600" />
                    <p className="mt-3 text-sm font-bold text-slate-950">
                      Gửi brief
                    </p>
                    <p className="mt-1 text-xs leading-5 text-slate-500">
                      Cho campaign hoặc event cần hỗ trợ.
                    </p>
                  </div>

                  <div className="rounded-2xl border border-blue-100 bg-white/80 p-4 shadow-sm">
                    <MessageCircle className="h-5 w-5 text-blue-600" />
                    <p className="mt-3 text-sm font-bold text-slate-950">
                      Làm rõ scope
                    </p>
                    <p className="mt-1 text-xs leading-5 text-slate-500">
                      Xác định hạng mục T2M có thể hỗ trợ.
                    </p>
                  </div>

                  <div className="rounded-2xl border border-blue-100 bg-white/80 p-4 shadow-sm">
                    <Mail className="h-5 w-5 text-blue-600" />
                    <p className="mt-3 text-sm font-bold text-slate-950">
                      Nhận phản hồi
                    </p>
                    <p className="mt-1 text-xs leading-5 text-slate-500">
                      T2M chủ động liên hệ lại.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="border-t border-blue-100 bg-white/80 p-6 backdrop-blur sm:p-8 lg:border-l lg:border-t-0 lg:p-10">
              <form onSubmit={handleSubmit} className="grid gap-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                      Họ tên
                    </label>
                    <input
                      name="name"
                      required
                      placeholder="Anh/chị tên gì?"
                      className="h-12 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                      Công ty / Brand
                    </label>
                    <input
                      name="company"
                      placeholder="Tên công ty / brand"
                      className="h-12 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                    />
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                      SĐT / Zalo
                    </label>
                    <input
                      name="phone"
                      required
                      placeholder="Số để T2M liên hệ"
                      className="h-12 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                      Email
                    </label>
                    <input
                      name="email"
                      type="email"
                      placeholder="Email nhận phản hồi"
                      className="h-12 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                    />
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                      Nhu cầu quan tâm
                    </label>
                    <select
                      name="service"
                      defaultValue=""
                      className="h-12 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                    >
                      <option value="" disabled>
                        Chọn nhu cầu
                      </option>
                      {services.map((service) => (
                        <option key={service} value={service}>
                          {service}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                      Ngân sách dự kiến
                    </label>
                    <input
                      name="budget"
                      placeholder="VD: 50tr / 100tr / chưa rõ"
                      className="h-12 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Mô tả nhanh campaign / event
                  </label>
                  <textarea
                    name="message"
                    rows={5}
                    required
                    placeholder="Anh/chị mô tả ngắn về event/campaign, mục tiêu, timeline hoặc hạng mục cần T2M hỗ trợ..."
                    className="w-full resize-none rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm leading-6 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                  />
                </div>

                <button
                  type="submit"
                  className="inline-flex h-12 w-full items-center justify-center rounded-full bg-blue-600 px-6 text-sm font-bold text-white shadow-[0_16px_32px_rgba(37,99,235,0.22)] transition hover:bg-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-100"
                >
                  Gửi thông tin cho T2M
                  <Send className="ml-2 h-4 w-4" />
                </button>

                {isSubmitted && (
                  <div className="rounded-2xl border border-green-100 bg-green-50 px-4 py-3 text-sm font-medium text-green-700">
                    Thông tin đã được tạo trong email. Anh/chị chỉ cần kiểm tra
                    lại và bấm gửi.
                  </div>
                )}

                <div className="grid gap-3 pt-2 text-sm text-slate-500 sm:grid-cols-2">
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-blue-600" />
                    <span>Zalo: [Điền số Zalo]</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-blue-600" />
                    <span>Email: contact@t2m.vn</span>
                  </div>
                </div>

                <p className="text-xs leading-5 text-slate-400">
                  T2M sẽ sử dụng thông tin này để liên hệ tư vấn theo nhu cầu
                  của anh/chị. Không dùng cho mục đích spam.
                </p>
              </form>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}