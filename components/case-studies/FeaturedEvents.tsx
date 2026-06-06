import Image from "next/image";
import Container from "@/components/layout/Container";
import {
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  Sparkles,
} from "lucide-react";

const events = [
  {
    name: "Sống 1 đời có lãi",
    category: "Social Campaign / Community",
    title: "Social Seeding & Campaign Amplification",
    role: "Comment seeding • Community discussion • Engagement support",
    image: "/cases/song-1-doi-co-lai.jpg",
    tags: ["Social", "Community", "Seeding"],
    metrics: [
      { label: "Discussion", value: "Active" },
      { label: "Signal", value: "Tracked" },
      { label: "Report", value: "Clear" },
    ],
  },
  {
    name: "Vinh quang Công an nhân dân",
    category: "Public Event / Social Communication",
    title: "Event Communication Support",
    role: "Social activation • Campaign seeding • Reporting support",
    image: "/cases/vinh-quang-cong-an-nhan-dan.jpg",
    tags: ["Event", "Social", "Activation"],
    metrics: [
      { label: "Scale", value: "Large" },
      { label: "Social", value: "Boost" },
      { label: "Monitor", value: "Daily" },
    ],
  },
  {
    name: "Tinh Hoa Việt",
    category: "Culture / Brand Event",
    title: "Campaign Seeding & Social Support",
    role: "Community seeding • Content amplification • Social tracking",
    image: "/cases/tinh-hoa-viet.jpg",
    tags: ["Culture", "Campaign", "Social"],
    metrics: [
      { label: "Content", value: "Amplify" },
      { label: "Seeding", value: "Active" },
      { label: "Track", value: "Ongoing" },
    ],
  },
  {
    name: "VietinBank Countdown 2025",
    category: "Banking / Event Campaign",
    title: "Event Social Communication Support",
    role: "Social buzz • Community interaction • Campaign monitoring",
    image: "/cases/vietinbank-countdown-2025.jpg",
    tags: ["Banking", "Event", "Social"],
    metrics: [
      { label: "Buzz", value: "High" },
      { label: "Engage", value: "Strong" },
      { label: "Report", value: "Weekly" },
    ],
  },
];

export default function FeaturedEvents() {
  return (
    <section
      id="featured-events"
      className="relative overflow-hidden bg-white py-16 text-slate-950 sm:py-20 lg:py-24"
    >
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,rgba(37,99,235,0.08),transparent_32%),radial-gradient(circle_at_bottom_right,rgba(34,211,238,0.12),transparent_34%)]" />

      <Container>
        <div className="mx-auto max-w-4xl text-center">
          <div className="mx-auto mb-5 inline-flex items-center gap-2 rounded-full border border-blue-100 bg-white px-5 py-2 text-xs font-bold uppercase tracking-[0.24em] text-blue-600 shadow-sm">
            <Sparkles className="h-3.5 w-3.5" />
            Featured Events
          </div>

          <h2 className="text-3xl font-bold tracking-tight text-slate-950 sm:text-5xl">
            Event / Campaign tiêu biểu
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-slate-600 sm:text-lg">
            Tập trung vào các campaign có hình ảnh tốt, dễ truyền tải năng lực
            social activation, seeding và campaign support của T2M.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {events.map((event) => (
            <article
              key={event.name}
              className="group overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-[0_20px_60px_rgba(15,23,42,0.07)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_24px_70px_rgba(37,99,235,0.14)]"
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <Image
                  src={event.image}
                  alt={event.name}
                  fill
                  className="object-cover transition duration-500 group-hover:scale-[1.03]"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/75 via-slate-950/15 to-transparent" />

                <div className="absolute left-4 top-4 flex flex-wrap gap-2">
                  {event.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-white/20 bg-white/85 px-3 py-1.5 text-xs font-semibold text-slate-700 backdrop-blur"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/85 text-blue-600 shadow-sm backdrop-blur">
                  <ArrowRight className="h-4 w-4" />
                </div>

                <div className="absolute bottom-4 left-4 right-4">
                  <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold text-white backdrop-blur">
                    <CalendarDays className="h-3.5 w-3.5" />
                    {event.category}
                  </div>

                  <h3 className="text-2xl font-bold text-white sm:text-3xl">
                    {event.name}
                  </h3>
                </div>
              </div>

              <div className="p-5 sm:p-6">
                <h4 className="text-lg font-bold text-slate-950">
                  {event.title}
                </h4>

                <p className="mt-3 text-sm leading-6 text-slate-600">
                  {event.role}
                </p>

                <div className="mt-5 grid grid-cols-3 gap-2">
                  {event.metrics.map((metric) => (
                    <div
                      key={metric.label}
                      className="rounded-2xl border border-slate-200 bg-slate-50 px-2 py-4 text-center"
                    >
                      <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-slate-400">
                        {metric.label}
                      </p>
                      <p className="mt-2 text-sm font-bold text-slate-950">
                        {metric.value}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {[
            "Event Communication",
            "Social Activation",
            "Seeding & Amplification",
            "Tracking & Reporting",
          ].map((item) => (
            <div
              key={item}
              className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm font-semibold text-slate-700"
            >
              <CheckCircle2 className="h-4 w-4 text-blue-600" />
              {item}
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}