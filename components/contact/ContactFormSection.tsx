"use client";

import { FormEvent, useState } from "react";
import Container from "@/components/layout/Container";
import { useLanguage } from "@/components/providers/LanguageProvider";
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
    key: "contact.form.service.options.performanceMarketing",
    fallback: "Performance Marketing",
  },
  {
    key: "contact.form.service.options.mediaPlanning",
    fallback: "Media Planning",
  },
  {
    key: "contact.form.service.options.socialMediaSeeding",
    fallback: "Social Media & Seeding",
  },
  {
    key: "contact.form.service.options.trackingReportAutomation",
    fallback: "Tracking, Report & Automation",
  },
  {
    key: "contact.form.service.options.eventCampaignSupport",
    fallback: "Event / Campaign Support",
  },
  {
    key: "contact.form.service.options.needConsulting",
    fallback: "Chưa chắc, cần T2M tư vấn",
  },
];

const budgetOptions = [
  {
    key: "contact.form.budget.options.under50m",
    fallback: "Dưới 50 triệu",
  },
  {
    key: "contact.form.budget.options.from50mTo100m",
    fallback: "50 - 100 triệu",
  },
  {
    key: "contact.form.budget.options.from100mTo300m",
    fallback: "100 - 300 triệu",
  },
  {
    key: "contact.form.budget.options.above300m",
    fallback: "Trên 300 triệu",
  },
  {
    key: "contact.form.budget.options.notDefined",
    fallback: "Chưa xác định",
  },
];

const checklistItems = [
  {
    key: "contact.form.checklist.reviewBrief",
    fallback: "T2M xem brief trước khi tư vấn",
  },
  {
    key: "contact.form.checklist.clarifyScope",
    fallback: "Làm rõ scope và output cần có",
  },
  {
    key: "contact.form.checklist.realGoalConsulting",
    fallback: "Tư vấn theo mục tiêu thực tế",
  },
  {
    key: "contact.form.checklist.brandAgencySupport",
    fallback: "Có thể hỗ trợ doanh nghiệp hoặc agency",
  },
];

const actionCards = [
  {
    icon: ClipboardEdit,
    titleKey: "contact.form.cards.brief.title",
    titleFallback: "Gửi brief",
    descriptionKey: "contact.form.cards.brief.description",
    descriptionFallback: "Cho campaign đã có nhu cầu sơ bộ.",
  },
  {
    icon: MessageCircle,
    titleKey: "contact.form.cards.discuss.title",
    titleFallback: "Trao đổi",
    descriptionKey: "contact.form.cards.discuss.description",
    descriptionFallback: "Làm rõ scope và timeline.",
  },
  {
    icon: Mail,
    titleKey: "contact.form.cards.response.title",
    titleFallback: "Nhận phản hồi",
    descriptionKey: "contact.form.cards.response.description",
    descriptionFallback: "T2M chủ động liên hệ lại.",
  },
];

export default function ContactFormSection() {
  const { tr } = useLanguage();
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
    const timeline = String(formData.get("timeline") || "");
    const message = String(formData.get("message") || "");

    const subject = encodeURIComponent(
      tr("contact.form.email.subject", "Brief mới từ website T2M - {{client}}", {
        client:
          company ||
          name ||
          tr("contact.form.email.defaultClient", "Khách hàng"),
      })
    );

    const body = encodeURIComponent(
      tr(
        "contact.form.email.body",
        "Thông tin khách hàng:\n\nHọ tên: {{name}}\nCông ty: {{company}}\nSĐT/Zalo: {{phone}}\nEmail: {{email}}\nDịch vụ quan tâm: {{service}}\nNgân sách dự kiến: {{budget}}\nTimeline dự kiến: {{timeline}}\n\nNội dung brief:\n{{message}}\n",
        {
          name,
          company,
          phone,
          email,
          service,
          budget,
          timeline,
          message,
        }
      )
    );

    window.location.href = `mailto:contact@t2m.vn?subject=${subject}&body=${body}`;

    setIsSubmitted(true);
  }

  return (
    <section
      id="contact-form"
      className="relative overflow-hidden bg-white py-16 text-slate-950 sm:py-20 lg:py-24"
    >
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,rgba(37,99,235,0.10),transparent_32%),radial-gradient(circle_at_bottom_right,rgba(34,211,238,0.16),transparent_34%)]" />

      <Container>
        <div className="overflow-hidden rounded-[2rem] border border-blue-100 bg-gradient-to-br from-blue-50 via-white to-cyan-50 shadow-[0_24px_80px_rgba(37,99,235,0.12)]">
          <div className="grid gap-0 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="relative p-6 sm:p-8 lg:p-10">
              <div className="absolute -left-10 top-10 h-40 w-40 rounded-full bg-cyan-200/40 blur-3xl" />

              <div className="relative">
                <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-blue-100 bg-white px-5 py-2 text-xs font-bold uppercase tracking-[0.24em] text-blue-600 shadow-sm">
                  <Sparkles className="h-3.5 w-3.5" />
                  {tr("contact.form.badge", "Brief Form")}
                </div>

                <h2 className="text-3xl font-bold tracking-tight text-slate-950 sm:text-5xl">
                  {tr("contact.form.titlePrefix", "Để lại thông tin,")}{" "}
                  <span className="bg-gradient-to-r from-cyan-500 to-blue-600 bg-clip-text text-transparent">
                    {tr(
                      "contact.form.titleHighlight",
                      "T2M sẽ liên hệ lại"
                    )}
                  </span>
                </h2>

                <p className="mt-5 max-w-xl text-base leading-8 text-slate-600">
                  {tr(
                    "contact.form.description",
                    "Form này giúp T2M nắm nhanh nhu cầu ban đầu. Anh/chị chưa cần brief quá chi tiết, chỉ cần mô tả mục tiêu hoặc vấn đề đang cần hỗ trợ."
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
                      {tr("contact.form.name.label", "Họ tên *")}
                    </label>
                    <input
                      name="name"
                      required
                      placeholder={tr(
                        "contact.form.name.placeholder",
                        "Anh/chị tên gì?"
                      )}
                      className="h-12 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                      {tr("contact.form.company.label", "Công ty / Brand")}
                    </label>
                    <input
                      name="company"
                      placeholder={tr(
                        "contact.form.company.placeholder",
                        "Tên công ty / brand"
                      )}
                      className="h-12 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                    />
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                      {tr("contact.form.phone.label", "SĐT / Zalo *")}
                    </label>
                    <input
                      name="phone"
                      required
                      placeholder={tr(
                        "contact.form.phone.placeholder",
                        "Số để T2M liên hệ"
                      )}
                      className="h-12 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                      {tr("contact.form.email.label", "Email")}
                    </label>
                    <input
                      name="email"
                      type="email"
                      placeholder={tr(
                        "contact.form.email.placeholder",
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
                        "contact.form.service.label",
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
                          "contact.form.service.placeholder",
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
                        "contact.form.budget.label",
                        "Ngân sách dự kiến"
                      )}
                    </label>
                    <select
                      name="budget"
                      defaultValue=""
                      className="h-12 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                    >
                      <option value="" disabled>
                        {tr(
                          "contact.form.budget.placeholder",
                          "Chọn ngân sách"
                        )}
                      </option>
                      {budgetOptions.map((budget) => {
                        const budgetLabel = tr(budget.key, budget.fallback);

                        return (
                          <option key={budget.key} value={budgetLabel}>
                            {budgetLabel}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    {tr("contact.form.timeline.label", "Timeline dự kiến")}
                  </label>
                  <input
                    name="timeline"
                    placeholder={tr(
                      "contact.form.timeline.placeholder",
                      "VD: Tháng 7, Q3, cần triển khai trong 2 tuần..."
                    )}
                    className="h-12 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    {tr(
                      "contact.form.message.label",
                      "Mô tả nhanh nhu cầu *"
                    )}
                  </label>
                  <textarea
                    name="message"
                    rows={5}
                    required
                    placeholder={tr(
                      "contact.form.message.placeholder",
                      "Anh/chị mô tả ngắn về campaign, mục tiêu, timeline hoặc vấn đề đang cần hỗ trợ..."
                    )}
                    className="w-full resize-none rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm leading-6 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                  />
                </div>

                <button
                  type="submit"
                  className="inline-flex h-12 w-full items-center justify-center rounded-full bg-blue-600 px-6 text-sm font-bold text-white shadow-[0_16px_32px_rgba(37,99,235,0.22)] transition hover:bg-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-100"
                >
                  {tr("contact.form.submit", "Gửi thông tin cho T2M")}
                  <Send className="ml-2 h-4 w-4" />
                </button>

                {isSubmitted && (
                  <div className="rounded-2xl border border-green-100 bg-green-50 px-4 py-3 text-sm font-medium text-green-700">
                    {tr(
                      "contact.form.success",
                      "Thông tin đã được tạo trong email. Anh/chị chỉ cần kiểm tra lại và bấm gửi."
                    )}
                  </div>
                )}

                <div className="grid gap-3 pt-2 text-sm text-slate-500 sm:grid-cols-2">
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-blue-600" />
                    <span>
                      {tr("contact.form.contact.zalo", "Zalo: [Điền số Zalo]")}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-blue-600" />
                    <span>
                      {tr(
                        "contact.form.contact.email",
                        "Email: contact@t2m.vn"
                      )}
                    </span>
                  </div>
                </div>

                <p className="text-xs leading-5 text-slate-400">
                  {tr(
                    "contact.form.privacyNote",
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