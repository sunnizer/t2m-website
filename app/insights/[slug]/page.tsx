import Link from "next/link";
import { notFound } from "next/navigation";
import Container from "@/components/layout/Container";
import { getDefaultInsightContent, getInsightsData } from "@/lib/insightsData";
import { ArrowLeft, ArrowRight, CalendarDays, Clock, UserRound } from "lucide-react";

type InsightDetailPageProps = {
  params: Promise<{ slug: string }> | { slug: string };
};

function renderContent(content: string) {
  return content
    .split(/\n{2,}/)
    .map((block) => block.trim())
    .filter(Boolean)
    .map((block, index) => {
      if (block.startsWith("## ")) {
        return (
          <h2 key={index} className="mt-10 text-2xl font-black tracking-tight text-slate-950 sm:text-3xl">
            {block.replace(/^##\s+/, "")}
          </h2>
        );
      }

      if (block.startsWith("# ")) {
        return (
          <h2 key={index} className="mt-10 text-3xl font-black tracking-tight text-slate-950">
            {block.replace(/^#\s+/, "")}
          </h2>
        );
      }

      if (block.includes("\n- ") || block.startsWith("- ")) {
        const items = block.split("\n").map((item) => item.replace(/^-\s*/, "").trim()).filter(Boolean);
        return (
          <ul key={index} className="mt-5 space-y-3 rounded-2xl border border-slate-200 bg-slate-50 p-6">
            {items.map((item, itemIndex) => (
              <li key={itemIndex} className="flex gap-3 text-base leading-8 text-slate-700">
                <span className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-600" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        );
      }

      return (
        <p key={index} className="mt-5 text-lg leading-9 text-slate-700">
          {block}
        </p>
      );
    });
}

export default async function InsightDetailPage({ params }: InsightDetailPageProps) {
  const resolvedParams = await params;
  const data = await getInsightsData();
  const post = data.posts.find((item) => item.slug === resolvedParams.slug);

  if (!post) notFound();

  const category = data.categories.find((item) => item.id === post.categoryId);
  const relatedPosts = data.posts.filter((item) => item.slug !== post.slug && item.categoryId === post.categoryId).slice(0, 3);
  const content = post.contentVi?.trim() || getDefaultInsightContent("vi");

  return (
    <article className="bg-white pt-28 pb-20 text-slate-950 sm:pt-32 lg:pt-36">
      <Container>
        <Link href="/insights" className="inline-flex items-center gap-2 text-sm font-bold text-blue-600 hover:text-blue-700">
          <ArrowLeft className="h-4 w-4" /> Quay lại Insight
        </Link>

        <header className="mt-8 overflow-hidden rounded-[2rem] border border-slate-200 bg-slate-50 shadow-[0_24px_80px_rgba(15,23,42,0.08)]">
          <div className="grid lg:grid-cols-[0.95fr_1.05fr] lg:items-stretch">
            <div className="p-7 sm:p-10 lg:p-12">
              <div className="inline-flex rounded-full bg-blue-50 px-4 py-2 text-xs font-black uppercase tracking-[0.16em] text-blue-600">
                {category?.nameVi || "Insight"}
              </div>
              <h1 className="mt-6 text-4xl font-black leading-[1.06] tracking-[-0.04em] text-slate-950 sm:text-5xl">
                {post.titleVi}
              </h1>
              <p className="mt-6 text-lg leading-8 text-slate-600">{post.excerptVi}</p>
              <div className="mt-8 flex flex-wrap gap-3 text-sm font-bold text-slate-500">
                <span className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 shadow-sm"><UserRound className="h-4 w-4 text-blue-600" />{post.author}</span>
                <span className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 shadow-sm"><CalendarDays className="h-4 w-4 text-blue-600" />{post.dateVi}</span>
                <span className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 shadow-sm"><Clock className="h-4 w-4 text-blue-600" />{post.readTimeVi}</span>
              </div>
            </div>
            <div className="relative min-h-[320px] overflow-hidden bg-slate-200 lg:min-h-full">
              <img src={post.image || "/visuals/insights/insight-hero.svg"} alt={post.titleVi} className="absolute inset-0 h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/35 to-transparent" />
            </div>
          </div>
        </header>

        <div className="mx-auto mt-12 grid max-w-6xl gap-10 lg:grid-cols-[minmax(0,1fr)_300px]">
          <div className="min-w-0 rounded-[2rem] border border-slate-200 bg-white p-7 shadow-sm sm:p-10">
            {renderContent(content)}
          </div>

          <aside className="space-y-5">
            <div className="rounded-3xl border border-blue-100 bg-gradient-to-br from-blue-50 to-white p-6">
              <h3 className="text-xl font-black tracking-tight text-slate-950">Cần biến insight thành kế hoạch triển khai?</h3>
              <p className="mt-3 text-sm leading-6 text-slate-600">T2M có thể hỗ trợ planning, media execution, seeding, tracking và reporting cho campaign của bạn.</p>
              <Link href="/contact" className="mt-5 inline-flex h-12 items-center gap-2 rounded-xl bg-blue-600 px-5 text-sm font-black text-white shadow-lg shadow-blue-600/20 hover:bg-blue-700">
                Liên hệ tư vấn <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            {relatedPosts.length > 0 && (
              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                <h3 className="text-xl font-black tracking-tight text-slate-950">Bài liên quan</h3>
                <div className="mt-5 space-y-4">
                  {relatedPosts.map((item) => (
                    <Link key={item.id} href={`/insights/${item.slug}`} className="group block">
                      <img src={item.image || "/visuals/insights/insight-hero.svg"} alt={item.titleVi} className="h-28 w-full rounded-2xl object-cover" />
                      <h4 className="mt-3 line-clamp-2 text-sm font-black leading-snug text-slate-950 group-hover:text-blue-600">{item.titleVi}</h4>
                      <p className="mt-1 text-xs font-semibold text-slate-500">{item.dateVi}</p>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </aside>
        </div>
      </Container>
    </article>
  );
}
