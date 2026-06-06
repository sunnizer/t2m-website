import Container from "@/components/layout/Container";

const capabilities = [
  "Performance Marketing",
  "Media Planning",
  "Social Media & Seeding",
  "Tracking & Reporting",
  "Marketing Automation",
];

export default function CapabilityBar() {
  return (
    <section className="border-b border-white/10 bg-slate-950 py-6">
      <Container>
        <div className="flex flex-wrap items-center justify-center gap-3">
          {capabilities.map((item) => (
            <span
              key={item}
              className="rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-sm text-slate-300"
            >
              {item}
            </span>
          ))}
        </div>
      </Container>
    </section>
  );
}