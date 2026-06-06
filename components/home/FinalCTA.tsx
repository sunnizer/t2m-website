"use client";

import { FormEvent, useState } from "react";
import Container from "@/components/layout/Container";
import {
  ArrowRight,
  CheckCircle2,
  ClipboardEdit,
  Mail,
  MessageCircle,
  Phone,
  Send,
  Sparkles,
} from "lucide-react";

const services = [
  "Performance Marketing",
  "Media Planning",
  "Social Media & Seeding",
  "Tracking, Report & Automation",
  "Chưa chắc, cần T2M tư vấn",
];

const checklist = [
  "Phản hồi theo nhu cầu thực tế",
  "Đề xuất scope phù hợp",
  "Không cam kết quá đà",
  "Có thể hỗ trợ từ planning đến reporting",
];

export default function FinalCTA() {
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

    const subject = encodeURIComponent(`Brief mới từ website T2M - ${company || name}`);
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
                  Có campaign cần{" "}
                  <span className="bg-gradient-to-r from-cyan-500 to-blue-600 bg-clip-text text-transparent">
                    triển khai?
                  </span>
                </h2>

                <p className="mt-5 max-w-xl text-base leading-8 text-slate-600">
                  Anh/chị để lại thông tin ngắn gọn. T2M sẽ xem nhu cầu và chủ
                  động liên hệ lại để làm rõ mục tiêu, phạm vi công việc và
                  phương án triển khai phù hợp.
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
                      Cho campaign đã có yêu cầu sơ bộ.
                    </p>
                  </div>

                  <div className="rounded-2xl border border-blue-100 bg-white/80 p-4 shadow-sm">
                    <MessageCircle className="h-5 w-5 text-blue-600" />
                    <p className="mt-3 text-sm font-bold text-slate-950">
                      Nhắn Zalo
                    </p>
                    <p className="mt-1 text-xs leading-5 text-slate-500">
                      Trao đổi nhanh về scope.
                    </p>
                  </div>

                  <div className="rounded-2xl border border-blue-100 bg-white/80 p-4 shadow-sm">
                    <Mail className="h-5 w-5 text-blue-600" />
                    <p className="mt-3 text-sm font-bold text-slate-950">
                      Gửi email
                    </p>
                    <p className="mt-1 text-xs leading-5 text-slate-500">
                      Gửi proposal hoặc file brief.
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
                      Công ty
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
                      Dịch vụ quan tâm
                    </label>
                    <select
                      name="service"
                      defaultValue=""
                      className="h-12 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                    >
                      <option value="" disabled>
                        Chọn dịch vụ
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
                    Mô tả nhanh nhu cầu
                  </label>
                  <textarea
                    name="message"
                    rows={5}
                    required
                    placeholder="Anh/chị mô tả ngắn về campaign, mục tiêu, timeline hoặc vấn đề đang cần hỗ trợ..."
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