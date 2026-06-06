"use client";

import { FormEvent, useState } from "react";
import {
  CheckCircle2,
  Mail,
  MessageCircle,
  Phone,
  Send,
  X,
} from "lucide-react";

const services = [
  "Performance Marketing",
  "Media Planning",
  "Social Media & Seeding",
  "Tracking, Report & Automation",
  "Event / Campaign Support",
  "Chưa chắc, cần T2M tư vấn",
];

export default function FloatingContact() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const name = String(formData.get("name") || "");
    const company = String(formData.get("company") || "");
    const phone = String(formData.get("phone") || "");
    const email = String(formData.get("email") || "");
    const service = String(formData.get("service") || "");
    const message = String(formData.get("message") || "");

    const subject = encodeURIComponent(
      `Lead mới từ Floating Contact T2M - ${company || name}`
    );

    const body = encodeURIComponent(
      `Thông tin khách hàng:\n\n` +
        `Họ tên: ${name}\n` +
        `Công ty: ${company}\n` +
        `SĐT/Zalo: ${phone}\n` +
        `Email: ${email}\n` +
        `Dịch vụ quan tâm: ${service}\n\n` +
        `Nội dung nhu cầu:\n${message}\n`
    );

    window.location.href = `mailto:contact@t2m.vn?subject=${subject}&body=${body}`;
    setIsSubmitted(true);
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="fixed bottom-5 right-5 z-[9999] inline-flex items-center gap-2 rounded-full bg-blue-600 px-4 py-3 text-sm font-bold text-white shadow-[0_16px_40px_rgba(37,99,235,0.35)] transition hover:-translate-y-1 hover:bg-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-200 sm:gap-3 sm:px-5 sm:py-4"
      >
        <MessageCircle className="h-5 w-5" />
        <span>Liên hệ</span>
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-[10000] flex items-end justify-center bg-slate-950/45 px-4 py-4 backdrop-blur-sm sm:items-center">
          <button
            type="button"
            className="absolute inset-0 h-full w-full cursor-default"
            onClick={() => setIsOpen(false)}
            aria-label="Đóng popup liên hệ"
          />

          <div className="relative max-h-[92vh] w-full max-w-2xl overflow-y-auto rounded-[2rem] border border-blue-100 bg-white shadow-[0_24px_90px_rgba(15,23,42,0.25)]">
            <div className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-200 bg-white/95 px-5 py-4 backdrop-blur">
              <div>
                <p className="text-sm font-bold text-blue-600">Contact T2M</p>
                <h3 className="text-lg font-bold text-slate-950">
                  Gửi nhanh nhu cầu campaign
                </h3>
              </div>

              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-slate-50 text-slate-600 transition hover:bg-slate-100 hover:text-slate-950"
                aria-label="Đóng form liên hệ"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="grid gap-0 lg:grid-cols-[0.75fr_1.25fr]">
              <div className="bg-gradient-to-br from-blue-50 via-white to-cyan-50 p-5">
                <p className="text-sm leading-6 text-slate-600">
                  Anh/chị để lại thông tin ngắn gọn. T2M sẽ xem nhu cầu và chủ
                  động liên hệ lại qua Zalo hoặc email.
                </p>

                <div className="mt-5 grid gap-3">
                  {[
                    "Tư vấn scope phù hợp",
                    "Không cam kết quá đà",
                    "Hỗ trợ brand hoặc agency",
                  ].map((item) => (
                    <div key={item} className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-blue-600" />
                      <span className="text-sm font-medium text-slate-700">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="mt-6 space-y-3 rounded-2xl border border-blue-100 bg-white/80 p-4 text-sm text-slate-600">
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-blue-600" />
                    <span>Zalo: [Điền số Zalo]</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-blue-600" />
                    <span>Email: contact@t2m.vn</span>
                  </div>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="grid gap-4 p-5">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                      Họ tên *
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
                      SĐT / Zalo *
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
                    Mô tả nhanh nhu cầu *
                  </label>
                  <textarea
                    name="message"
                    rows={4}
                    required
                    placeholder="Mục tiêu campaign, timeline, ngân sách hoặc hạng mục cần T2M hỗ trợ..."
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

                <p className="text-xs leading-5 text-slate-400">
                  T2M sẽ sử dụng thông tin này để liên hệ tư vấn theo nhu cầu.
                  Không dùng cho mục đích spam.
                </p>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}