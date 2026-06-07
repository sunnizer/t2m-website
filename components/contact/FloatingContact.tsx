"use client";

import { FormEvent, useState } from "react";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { getSiteContentValue } from "@/lib/siteContentData";
import {
  CheckCircle2,
  Mail,
  MessageCircle,
  Phone,
  Send,
  X,
} from "lucide-react";

const serviceOptions = [
  {
    key: "floatingContact.form.service.options.performanceMarketing",
    fallback: "Performance Marketing",
  },
  {
    key: "floatingContact.form.service.options.mediaPlanning",
    fallback: "Media Planning",
  },
  {
    key: "floatingContact.form.service.options.socialMediaSeeding",
    fallback: "Social Media & Seeding",
  },
  {
    key: "floatingContact.form.service.options.trackingReportAutomation",
    fallback: "Tracking, Report & Automation",
  },
  {
    key: "floatingContact.form.service.options.eventCampaignSupport",
    fallback: "Event / Campaign Support",
  },
  {
    key: "floatingContact.form.service.options.needConsulting",
    fallback: "Chưa chắc, cần T2M tư vấn",
  },
];

const checklistItems = [
  {
    key: "floatingContact.checklist.scopeConsulting",
    fallback: "Tư vấn scope phù hợp",
  },
  {
    key: "floatingContact.checklist.noOverpromise",
    fallback: "Không cam kết quá đà",
  },
  {
    key: "floatingContact.checklist.brandAgencySupport",
    fallback: "Hỗ trợ brand hoặc agency",
  },
];

export default function FloatingContact() {
  const { tr, locale } = useLanguage();
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
      tr(
        "floatingContact.email.subject",
        "Lead mới từ Floating Contact T2M - {{client}}",
        {
          client:
            company ||
            name ||
            tr("floatingContact.email.defaultClient", "Khách hàng"),
        }
      )
    );

    const body = encodeURIComponent(
      tr(
        "floatingContact.email.body",
        "Thông tin khách hàng:\n\nHọ tên: {{name}}\nCông ty: {{company}}\nSĐT/Zalo: {{phone}}\nEmail: {{email}}\nDịch vụ quan tâm: {{service}}\n\nNội dung nhu cầu:\n{{message}}\n",
        {
          name,
          company,
          phone,
          email,
          service,
          message,
        }
      )
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
        <span>{tr("floatingContact.button", "Liên hệ")}</span>
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-[10000] flex items-end justify-center bg-slate-950/45 px-4 py-4 backdrop-blur-sm sm:items-center">
          <button
            type="button"
            className="absolute inset-0 h-full w-full cursor-default"
            onClick={() => setIsOpen(false)}
            aria-label={tr(
              "floatingContact.aria.closeOverlay",
              "Đóng popup liên hệ"
            )}
          />

          <div className="relative max-h-[92vh] w-full max-w-2xl overflow-y-auto rounded-[2rem] border border-blue-100 bg-white shadow-[0_24px_90px_rgba(15,23,42,0.25)]">
            <div className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-200 bg-white/95 px-5 py-4 backdrop-blur">
              <div>
                <p className="text-sm font-bold text-blue-600">
                  {tr("floatingContact.modal.badge", "Contact T2M")}
                </p>
                <h3 className="text-lg font-bold text-slate-950">
                  {tr(
                    "floatingContact.modal.title",
                    "Gửi nhanh nhu cầu campaign"
                  )}
                </h3>
              </div>

              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-slate-50 text-slate-600 transition hover:bg-slate-100 hover:text-slate-950"
                aria-label={tr(
                  "floatingContact.aria.closeForm",
                  "Đóng form liên hệ"
                )}
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="grid gap-0 lg:grid-cols-[0.75fr_1.25fr]">
              <div className="bg-gradient-to-br from-blue-50 via-white to-cyan-50 p-5">
                <p className="text-sm leading-6 text-slate-600">
                  {tr(
                    "floatingContact.modal.description",
                    "Anh/chị để lại thông tin ngắn gọn. T2M sẽ xem nhu cầu và chủ động liên hệ lại qua Zalo hoặc email."
                  )}
                </p>

                <div className="mt-5 grid gap-3">
                  {checklistItems.map((item) => (
                    <div key={item.key} className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-blue-600" />
                      <span className="text-sm font-medium text-slate-700">
                        {tr(item.key, item.fallback)}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="mt-6 space-y-3 rounded-2xl border border-blue-100 bg-white/80 p-4 text-sm text-slate-600">
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-blue-600" />
                    <span>
                      {getSiteContentValue(
                        "global-contact",
                        "zalo",
                        tr("floatingContact.contact.zalo", "Zalo: [Điền số Zalo]"),
                        locale
                      )}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-blue-600" />
                    <span>
                      {tr(
                        "floatingContact.contact.email",
                        "Email: contact@t2m.vn"
                      )}
                    </span>
                  </div>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="grid gap-4 p-5">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                      {tr("floatingContact.form.name.label", "Họ tên *")}
                    </label>
                    <input
                      name="name"
                      required
                      placeholder={tr(
                        "floatingContact.form.name.placeholder",
                        "Anh/chị tên gì?"
                      )}
                      className="h-12 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                      {tr("floatingContact.form.company.label", "Công ty")}
                    </label>
                    <input
                      name="company"
                      placeholder={tr(
                        "floatingContact.form.company.placeholder",
                        "Tên công ty / brand"
                      )}
                      className="h-12 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                    />
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                      {tr("floatingContact.form.phone.label", "SĐT / Zalo *")}
                    </label>
                    <input
                      name="phone"
                      required
                      placeholder={tr(
                        "floatingContact.form.phone.placeholder",
                        "Số để T2M liên hệ"
                      )}
                      className="h-12 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                      {tr("floatingContact.form.email.label", "Email")}
                    </label>
                    <input
                      name="email"
                      type="email"
                      placeholder={tr(
                        "floatingContact.form.email.placeholder",
                        "Email nhận phản hồi"
                      )}
                      className="h-12 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    {tr(
                      "floatingContact.form.service.label",
                      "Dịch vụ quan tâm"
                    )}
                  </label>
                  <select
                    name="service"
                    defaultValue=""
                    className="h-12 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                  >
                    <option value="" disabled>
                      {tr(
                        "floatingContact.form.service.placeholder",
                        "Chọn dịch vụ"
                      )}
                    </option>
                    {serviceOptions.map((service) => {
                      const serviceLabel = tr(service.key, service.fallback);

                      return (
                        <option key={service.key} value={serviceLabel}>
                          {serviceLabel}
                        </option>
                      );
                    })}
                  </select>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    {tr(
                      "floatingContact.form.message.label",
                      "Mô tả nhanh nhu cầu *"
                    )}
                  </label>
                  <textarea
                    name="message"
                    rows={4}
                    required
                    placeholder={tr(
                      "floatingContact.form.message.placeholder",
                      "Mục tiêu campaign, timeline, ngân sách hoặc hạng mục cần T2M hỗ trợ..."
                    )}
                    className="w-full resize-none rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm leading-6 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                  />
                </div>

                <button
                  type="submit"
                  className="inline-flex h-12 w-full items-center justify-center rounded-full bg-blue-600 px-6 text-sm font-bold text-white shadow-[0_16px_32px_rgba(37,99,235,0.22)] transition hover:bg-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-100"
                >
                  {tr(
                    "floatingContact.form.submit",
                    "Gửi thông tin cho T2M"
                  )}
                  <Send className="ml-2 h-4 w-4" />
                </button>

                {isSubmitted && (
                  <div className="rounded-2xl border border-green-100 bg-green-50 px-4 py-3 text-sm font-medium text-green-700">
                    {tr(
                      "floatingContact.form.success",
                      "Thông tin đã được tạo trong email. Anh/chị chỉ cần kiểm tra lại và bấm gửi."
                    )}
                  </div>
                )}

                <p className="text-xs leading-5 text-slate-400">
                  {tr(
                    "floatingContact.form.privacyNote",
                    "T2M sẽ sử dụng thông tin này để liên hệ tư vấn theo nhu cầu. Không dùng cho mục đích spam."
                  )}
                </p>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}