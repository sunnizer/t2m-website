"use client";

import { FormEvent, useState } from "react";
import Container from "@/components/layout/Container";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { getSiteContentValue } from "@/lib/siteContentData";
import {
  CheckCircle2,
  ClipboardEdit,
  Mail,
  MessageCircle,
  Phone,
  Send,
  Sparkles,
} from "lucide-react";

const serviceOptions = [
  {
    key: "home.finalCta.form.service.options.performanceMarketing",
    fallback: "Performance Marketing",
  },
  {
    key: "home.finalCta.form.service.options.mediaPlanning",
    fallback: "Media Planning",
  },
  {
    key: "home.finalCta.form.service.options.socialMediaSeeding",
    fallback: "Social Media & Seeding",
  },
  {
    key: "home.finalCta.form.service.options.trackingReportAutomation",
    fallback: "Tracking, Report & Automation",
  },
  {
    key: "home.finalCta.form.service.options.needConsulting",
    fallback: "Chưa chắc, cần T2M tư vấn",
  },
];

const checklistItems = [
  {
    key: "home.finalCta.checklist.realNeedResponse",
    fallback: "Phản hồi theo nhu cầu thực tế",
  },
  {
    key: "home.finalCta.checklist.suitableScope",
    fallback: "Đề xuất scope phù hợp",
  },
  {
    key: "home.finalCta.checklist.noOverpromise",
    fallback: "Không cam kết quá đà",
  },
  {
    key: "home.finalCta.checklist.planningToReporting",
    fallback: "Có thể hỗ trợ từ planning đến reporting",
  },
];

const actionCards = [
  {
    icon: ClipboardEdit,
    titleKey: "home.finalCta.cards.brief.title",
    titleFallback: "Gửi brief",
    descriptionKey: "home.finalCta.cards.brief.description",
    descriptionFallback: "Cho campaign đã có yêu cầu sơ bộ.",
  },
  {
    icon: MessageCircle,
    titleKey: "home.finalCta.cards.zalo.title",
    titleFallback: "Nhắn Zalo",
    descriptionKey: "home.finalCta.cards.zalo.description",
    descriptionFallback: "Trao đổi nhanh về scope.",
  },
  {
    icon: Mail,
    titleKey: "home.finalCta.cards.email.title",
    titleFallback: "Gửi email",
    descriptionKey: "home.finalCta.cards.email.description",
    descriptionFallback: "Gửi proposal hoặc file brief.",
  },
];

export default function FinalCTA() {
  const { tr, locale } = useLanguage();
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
      tr("home.finalCta.email.subject", "Brief mới từ website T2M - {{client}}", {
        client:
          company ||
          name ||
          tr("home.finalCta.email.defaultClient", "Khách hàng"),
      })
    );

    const body = encodeURIComponent(
      tr(
        "home.finalCta.email.body",
        "Thông tin khách hàng:\n\nHọ tên: {{name}}\nCông ty: {{company}}\nSĐT/Zalo: {{phone}}\nEmail: {{email}}\nDịch vụ quan tâm: {{service}}\nNgân sách dự kiến: {{budget}}\n\nNội dung brief:\n{{message}}\n",
        {
          name,
          company,
          phone,
          email,
          service,
          budget,
          message,
        }
      )
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
                  {tr("home.finalCta.badge", "Work with T2M")}
                </div>

                <h2 className="text-3xl font-bold tracking-tight text-slate-950 sm:text-5xl">
                  {tr("home.finalCta.titlePrefix", "Có campaign cần")}{" "}
                  <span className="bg-gradient-to-r from-cyan-500 to-blue-600 bg-clip-text text-transparent">
                    {tr("home.finalCta.titleHighlight", "triển khai?")}
                  </span>
                </h2>

                <p className="mt-5 max-w-xl text-base leading-8 text-slate-600">
                  {tr(
                    "home.finalCta.description",
                    "Anh/chị để lại thông tin ngắn gọn. T2M sẽ xem nhu cầu và chủ động liên hệ lại để làm rõ mục tiêu, phạm vi công việc và phương án triển khai phù hợp."
                  )}
                </p>

                <div className="mt-8 grid gap-3">
                  {checklistItems.map((item) => (
                    <div key={item.key} className="flex items-center gap-3">
                      <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-blue-600 text-white">
                        <CheckCircle2 className="h-4 w-4" />
                      </div>
                      <span className="text-sm font-medium text-slate-700">
                        {tr(item.key, item.fallback)}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="mt-8 grid gap-3 sm:grid-cols-3">
                  {actionCards.map((card) => {
                    const Icon = card.icon;

                    return (
                      <div
                        key={card.titleKey}
                        className="rounded-2xl border border-blue-100 bg-white/80 p-4 shadow-sm"
                      >
                        <Icon className="h-5 w-5 text-blue-600" />
                        <p className="mt-3 text-sm font-bold text-slate-950">
                          {tr(card.titleKey, card.titleFallback)}
                        </p>
                        <p className="mt-1 text-xs leading-5 text-slate-500">
                          {tr(card.descriptionKey, card.descriptionFallback)}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="border-t border-blue-100 bg-white/80 p-6 backdrop-blur sm:p-8 lg:border-l lg:border-t-0 lg:p-10">
              <form onSubmit={handleSubmit} className="grid gap-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                      {tr("home.finalCta.form.name.label", "Họ tên")}
                    </label>
                    <input
                      name="name"
                      required
                      placeholder={tr(
                        "home.finalCta.form.name.placeholder",
                        "Anh/chị tên gì?"
                      )}
                      className="h-12 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                      {tr("home.finalCta.form.company.label", "Công ty")}
                    </label>
                    <input
                      name="company"
                      placeholder={tr(
                        "home.finalCta.form.company.placeholder",
                        "Tên công ty / brand"
                      )}
                      className="h-12 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                    />
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                      {tr("home.finalCta.form.phone.label", "SĐT / Zalo")}
                    </label>
                    <input
                      name="phone"
                      required
                      placeholder={tr(
                        "home.finalCta.form.phone.placeholder",
                        "Số để T2M liên hệ"
                      )}
                      className="h-12 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                      {tr("home.finalCta.form.email.label", "Email")}
                    </label>
                    <input
                      name="email"
                      type="email"
                      placeholder={tr(
                        "home.finalCta.form.email.placeholder",
                        "Email nhận phản hồi"
                      )}
                      className="h-12 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                    />
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                      {tr(
                        "home.finalCta.form.service.label",
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
                          "home.finalCta.form.service.placeholder",
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
                        "home.finalCta.form.budget.label",
                        "Ngân sách dự kiến"
                      )}
                    </label>
                    <input
                      name="budget"
                      placeholder={tr(
                        "home.finalCta.form.budget.placeholder",
                        "VD: 50tr / 100tr / chưa rõ"
                      )}
                      className="h-12 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    {tr(
                      "home.finalCta.form.message.label",
                      "Mô tả nhanh nhu cầu"
                    )}
                  </label>
                  <textarea
                    name="message"
                    rows={5}
                    required
                    placeholder={tr(
                      "home.finalCta.form.message.placeholder",
                      "Anh/chị mô tả ngắn về campaign, mục tiêu, timeline hoặc vấn đề đang cần hỗ trợ..."
                    )}
                    className="w-full resize-none rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm leading-6 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                  />
                </div>

                <button
                  type="submit"
                  className="inline-flex h-12 w-full items-center justify-center rounded-full bg-blue-600 px-6 text-sm font-bold text-white shadow-[0_16px_32px_rgba(37,99,235,0.22)] transition hover:bg-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-100"
                >
                  {tr(
                    "home.finalCta.form.submit",
                    "Gửi thông tin cho T2M"
                  )}
                  <Send className="ml-2 h-4 w-4" />
                </button>

                {isSubmitted && (
                  <div className="rounded-2xl border border-green-100 bg-green-50 px-4 py-3 text-sm font-medium text-green-700">
                    {tr(
                      "home.finalCta.form.success",
                      "Thông tin đã được tạo trong email. Anh/chị chỉ cần kiểm tra lại và bấm gửi."
                    )}
                  </div>
                )}

                <div className="grid gap-3 pt-2 text-sm text-slate-500 sm:grid-cols-2">
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-blue-600" />
                    <span>
                      {getSiteContentValue(
                        "global-contact",
                        "zalo",
                        tr("home.finalCta.contact.zalo", "Zalo: [Điền số Zalo]"),
                        locale
                      )}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-blue-600" />
                    <span>
                      {tr(
                        "home.finalCta.contact.email",
                        "Email: contact@t2m.vn"
                      )}
                    </span>
                  </div>
                </div>

                <p className="text-xs leading-5 text-slate-400">
                  {tr(
                    "home.finalCta.privacyNote",
                    "T2M sẽ sử dụng thông tin này để liên hệ tư vấn theo nhu cầu của anh/chị. Không dùng cho mục đích spam."
                  )}
                </p>
              </form>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}