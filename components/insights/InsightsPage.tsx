"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useLanguage } from "@/components/providers/LanguageProvider";
import type { InsightCategory, InsightPost, InsightsData } from "@/lib/insightsData";
import { ArrowRight, BarChart3, BriefcaseBusiness, Grid2X2, HeartHandshake, Mail, Search, Send, Sparkles, Target, Workflow } from "lucide-react";

const iconMap = { grid: Grid2X2, target: Target, chart: BarChart3, heart: HeartHandshake, workflow: Workflow, briefcase: BriefcaseBusiness, sparkles: Sparkles };
function getText(locale: "vi" | "en", vi: string, en?: string) { return locale === "en" ? en || vi : vi; }
function getCategory(categories: InsightCategory[], id: string) { return categories.find((category) => category.id === id) || categories[0]; }
function CategoryIcon({ icon }: { icon: string }) { const Icon = iconMap[icon as keyof typeof iconMap] || Grid2X2; return <Icon size={16} strokeWidth={2.2} />; }

function PostMeta({ post, light = false }: { post: InsightPost; light?: boolean }) {
  const { locale } = useLanguage();
  return <div className={light ? "t2m-meta t2m-meta-light" : "t2m-meta"}><span>{post.author}</span><span className="t2m-dot" /><span>{getText(locale, post.dateVi, post.dateEn)}</span><span className="t2m-dot" /><span>{getText(locale, post.readTimeVi, post.readTimeEn)}</span></div>;
}

function FeaturedCard({ post, categories, large = false }: { post: InsightPost; categories: InsightCategory[]; large?: boolean }) {
  const { locale } = useLanguage();
  const category = getCategory(categories, post.categoryId);
  const title = getText(locale, post.titleVi, post.titleEn);
  return <Link href={`/insights/${post.slug}`} className={large ? "t2m-feature-card t2m-feature-large" : "t2m-feature-card"}>
    <img src={post.image || "/visuals/insights/insight-hero.svg"} alt={title} className="t2m-feature-img" /><span className="t2m-feature-overlay" />
    <div className="t2m-feature-content"><span className="t2m-pill-blue">{post.type === "featured" ? "Featured" : getText(locale, category.nameVi, category.nameEn)}</span><h2>{title}</h2><PostMeta post={post} light /><span className="t2m-round-arrow"><ArrowRight size={18} /></span></div>
  </Link>;
}

function ArticleCard({ post, categories }: { post: InsightPost; categories: InsightCategory[] }) {
  const { locale } = useLanguage();
  const category = getCategory(categories, post.categoryId);
  const title = getText(locale, post.titleVi, post.titleEn);
  return <Link href={`/insights/${post.slug}`} className="t2m-article-card"><div className="t2m-article-img-wrap"><img src={post.image || "/visuals/insights/insight-hero.svg"} alt={title} className="t2m-article-img" /></div><div className="t2m-article-body"><div className="t2m-article-cat">{getText(locale, category.nameVi, category.nameEn)}</div><h3>{title}</h3><p>{getText(locale, post.excerptVi, post.excerptEn)}</p><PostMeta post={post} /></div></Link>;
}

function SmallPost({ post }: { post: InsightPost }) {
  const { locale } = useLanguage();
  const title = getText(locale, post.titleVi, post.titleEn);
  return <Link href={`/insights/${post.slug}`} className="t2m-small-post"><img src={post.image || "/visuals/insights/insight-hero.svg"} alt={title} /><div><h4>{title}</h4><p>{getText(locale, post.dateVi, post.dateEn)}</p></div></Link>;
}

export default function InsightsPage({ data }: { data: InsightsData }) {
  const { locale } = useLanguage();
  const [activeCategory, setActiveCategory] = useState("all");
  const [query, setQuery] = useState("");
  const categories = data.categories.length ? data.categories : [{ id: "all", nameVi: "Tất cả", nameEn: "All", icon: "grid" }];
  const featuredPosts = data.posts.filter((post) => post.isFeatured).slice(0, 3);
  const featuredDisplay = featuredPosts.length ? featuredPosts : data.posts.slice(0, 3);
  const popularPosts = data.posts.filter((post) => post.isPopular).slice(0, 4);
  const filteredPosts = useMemo(() => {
    const cleanQuery = query.trim().toLowerCase();
    return data.posts.filter((post) => {
      const matchesCategory = activeCategory === "all" || post.categoryId === activeCategory;
      const haystack = [post.titleVi, post.titleEn, post.excerptVi, post.excerptEn, post.author].join(" ").toLowerCase();
      return matchesCategory && (!cleanQuery || haystack.includes(cleanQuery));
    });
  }, [activeCategory, data.posts, query]);
  const latestPosts = filteredPosts.slice(0, 6);
  const sidebarPosts = popularPosts.length ? popularPosts : data.posts.slice(0, 4);

  return <div className="t2m-insights-page">
    <style>{`
      .t2m-insights-page{background:#fff;color:#020617;padding-top:132px;}
      .t2m-insights-container{width:min(1120px,calc(100% - 48px));margin:0 auto;}
      .t2m-insights-hero{padding:34px 0 34px;border-bottom:1px solid #e5e7eb;background:linear-gradient(180deg,#fff 0%,#f8fafc 100%);}
      .t2m-hero-grid{display:grid;grid-template-columns:minmax(0,1fr) 430px;gap:56px;align-items:center;}
      .t2m-eyebrow{font-size:13px;font-weight:900;letter-spacing:.24em;text-transform:uppercase;color:#075af7;margin-bottom:18px;}
      .t2m-title{font-size:clamp(44px,5vw,68px);line-height:.96;letter-spacing:-.055em;font-weight:950;margin:0;color:#020617;max-width:690px;}
      .t2m-desc{margin:22px 0 0;max-width:610px;color:#475569;font-size:18px;line-height:1.8;}
      .t2m-hero-art{height:270px;border-radius:30px;background:#eef6ff;overflow:hidden;box-shadow:0 24px 60px rgba(15,23,42,.08);display:flex;align-items:center;justify-content:center;}
      .t2m-hero-art img{width:100%;height:100%;object-fit:cover;display:block;}
      .t2m-search-row{display:grid;grid-template-columns:minmax(0,1fr) 230px;gap:16px;margin-top:30px;max-width:710px;}
      .t2m-search-box,.t2m-select{height:52px;border:1px solid #dbe3ef;border-radius:14px;background:#fff;box-shadow:0 8px 22px rgba(15,23,42,.04);}
      .t2m-search-box{display:flex;align-items:center;gap:12px;padding:0 16px;}.t2m-search-box input{border:0;outline:0;background:transparent;width:100%;font-size:14px;font-weight:600;color:#0f172a;}.t2m-select{padding:0 16px;font-size:14px;font-weight:800;color:#0f172a;outline:none;}
      .t2m-feature-section{padding:42px 0 26px;}.t2m-feature-grid{display:grid;grid-template-columns:1.15fr .85fr;gap:18px;}.t2m-feature-side{display:grid;gap:18px;}
      .t2m-feature-card{position:relative;display:block;min-height:176px;overflow:hidden;border-radius:22px;background:#020617;box-shadow:0 12px 30px rgba(15,23,42,.1);}.t2m-feature-large{min-height:346px;}.t2m-feature-img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;opacity:.78;transition:transform .45s ease;}.t2m-feature-card:hover .t2m-feature-img{transform:scale(1.045);}.t2m-feature-overlay{position:absolute;inset:0;background:linear-gradient(0deg,rgba(2,6,23,.92) 0%,rgba(2,6,23,.55) 52%,rgba(2,6,23,.14) 100%);}
      .t2m-feature-content{position:relative;z-index:2;min-height:inherit;height:100%;display:flex;flex-direction:column;justify-content:flex-end;padding:28px;}.t2m-feature-content h2{max-width:680px;margin:14px 58px 14px 0;color:#fff;font-weight:950;letter-spacing:-.035em;line-height:1.12;font-size:24px;}.t2m-feature-large h2{font-size:31px;}.t2m-pill-blue{display:inline-flex;width:max-content;max-width:100%;align-items:center;border-radius:9px;background:#0b63ff;color:#fff;padding:7px 12px;font-size:11px;font-weight:950;text-transform:uppercase;letter-spacing:.14em;line-height:1;}.t2m-round-arrow{position:absolute;right:24px;bottom:24px;width:48px;height:48px;border-radius:999px;background:#fff;color:#075af7;display:flex;align-items:center;justify-content:center;}
      .t2m-meta{display:flex;flex-wrap:wrap;gap:7px 12px;align-items:center;color:#64748b;font-size:12px;font-weight:800;}.t2m-meta-light{color:rgba(255,255,255,.82);}.t2m-dot{width:4px;height:4px;border-radius:999px;background:currentColor;opacity:.45;}
      .t2m-category-row{display:flex;flex-wrap:wrap;gap:12px;padding:22px 0 30px;border-bottom:1px solid #e5e7eb;}.t2m-category-btn{height:auto;min-height:54px;display:inline-flex;align-items:center;gap:9px;border:1px solid #dbe3ef;border-radius:14px;background:#fff;color:#253044;padding:12px 18px;font-size:14px;font-weight:900;cursor:pointer;transition:.2s ease;}.t2m-category-btn:hover{border-color:#93c5fd;color:#075af7;}.t2m-category-btn.active{border-color:#075af7;background:#eff6ff;color:#075af7;}
      .t2m-content-section{padding:36px 0 72px;}.t2m-main-grid{display:grid;grid-template-columns:minmax(0,1fr) 330px;gap:42px;align-items:start;}.t2m-section-head{display:flex;align-items:flex-end;justify-content:space-between;gap:18px;margin-bottom:24px;}.t2m-section-head h2{font-size:32px;font-weight:950;letter-spacing:-.035em;margin:0;}.t2m-section-head button{border:0;background:transparent;color:#075af7;font-size:14px;font-weight:900;cursor:pointer;}
      .t2m-article-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:22px;}.t2m-article-card{display:block;overflow:hidden;border:1px solid #dfe6f0;border-radius:18px;background:#fff;box-shadow:0 8px 24px rgba(15,23,42,.04);transition:.25s ease;}.t2m-article-card:hover{transform:translateY(-4px);box-shadow:0 18px 40px rgba(15,23,42,.09);}.t2m-article-img-wrap{height:170px;overflow:hidden;background:#f1f5f9;}.t2m-article-img{width:100%;height:100%;object-fit:cover;display:block;transition:transform .45s ease;}.t2m-article-card:hover .t2m-article-img{transform:scale(1.05);}.t2m-article-body{padding:22px;}.t2m-article-cat{font-size:11px;font-weight:950;letter-spacing:.18em;text-transform:uppercase;color:#075af7;}.t2m-article-body h3{margin:12px 0 8px;color:#020617;font-size:20px;line-height:1.25;font-weight:950;letter-spacing:-.02em;}.t2m-article-body p{margin:0 0 15px;color:#64748b;font-size:14px;line-height:1.65;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;}
      .t2m-sidebar{display:grid;gap:22px;}.t2m-side-card{border:1px solid #dfe6f0;border-radius:24px;background:#fff;padding:24px;box-shadow:0 8px 24px rgba(15,23,42,.04);}.t2m-side-icon{width:48px;height:48px;border-radius:16px;background:#eff6ff;color:#075af7;display:flex;align-items:center;justify-content:center;margin-bottom:18px;}.t2m-side-card h3{margin:0;color:#020617;font-size:20px;font-weight:950;letter-spacing:-.02em;}.t2m-side-card p{margin:10px 0 0;color:#64748b;font-size:14px;line-height:1.65;}.t2m-newsletter-input{height:48px;margin-top:18px;border:1px solid #dbe3ef;border-radius:13px;display:flex;align-items:center;gap:10px;padding:0 14px;}.t2m-newsletter-input input{width:100%;border:0;background:transparent;outline:0;font-size:14px;}.t2m-newsletter-btn{width:100%;height:48px;margin-top:12px;border:0;border-radius:13px;background:#075af7;color:#fff;font-size:14px;font-weight:950;cursor:pointer;box-shadow:0 14px 28px rgba(7,90,247,.22);}
      .t2m-small-list{display:grid;gap:14px;margin-top:18px;}.t2m-small-post{display:flex;gap:13px;padding:8px;border-radius:14px;transition:.2s ease;}.t2m-small-post:hover{background:#f8fafc;}.t2m-small-post img{width:88px;height:64px;border-radius:12px;object-fit:cover;flex:0 0 auto;}.t2m-small-post h4{margin:0;color:#020617;font-size:14px;line-height:1.3;font-weight:950;}.t2m-small-post p{margin:7px 0 0;color:#64748b;font-size:12px;font-weight:700;}.t2m-empty{border:1px dashed #cbd5e1;border-radius:22px;background:#f8fafc;padding:36px;text-align:center;color:#64748b;font-size:14px;font-weight:800;}
      .t2m-cta{margin:0 auto 72px;width:min(1120px,calc(100% - 48px));border:1px solid #bfdbfe;border-radius:28px;background:linear-gradient(90deg,#eff6ff 0%,#fff 52%,#ecfeff 100%);padding:30px;display:grid;grid-template-columns:minmax(0,1fr) auto;gap:24px;align-items:center;box-shadow:0 10px 28px rgba(15,23,42,.04);}.t2m-cta h2{margin:0;color:#020617;font-size:30px;line-height:1.15;font-weight:950;letter-spacing:-.035em;}.t2m-cta p{margin:10px 0 0;color:#64748b;font-size:16px;line-height:1.65;}.t2m-cta a{display:inline-flex;align-items:center;justify-content:center;gap:9px;height:52px;border-radius:14px;background:#075af7;color:#fff;padding:0 26px;font-size:14px;font-weight:950;box-shadow:0 14px 28px rgba(7,90,247,.22);}
      @media (max-width:980px){.t2m-insights-page{padding-top:112px;}.t2m-hero-grid{grid-template-columns:1fr;gap:28px;}.t2m-hero-art{height:220px;}.t2m-feature-grid,.t2m-main-grid{grid-template-columns:1fr;}.t2m-feature-large{min-height:280px;}.t2m-article-grid{grid-template-columns:1fr 1fr;}}
      @media (max-width:720px){.t2m-insights-container,.t2m-cta{width:min(100% - 32px,1120px);}.t2m-insights-page{padding-top:96px;}.t2m-insights-hero{padding-top:24px;}.t2m-title{font-size:42px;}.t2m-desc{font-size:16px;}.t2m-search-row{grid-template-columns:1fr;}.t2m-feature-large,.t2m-feature-card{min-height:230px;}.t2m-feature-content{padding:22px;}.t2m-feature-content h2,.t2m-feature-large h2{font-size:22px;margin-right:54px;}.t2m-article-grid{grid-template-columns:1fr;}.t2m-section-head h2{font-size:28px;}.t2m-section-head button{display:none;}.t2m-category-btn{flex:1 1 calc(50% - 12px);justify-content:center;}.t2m-cta{grid-template-columns:1fr;padding:24px;}.t2m-cta h2{font-size:24px;}}
    `}</style>

    <section className="t2m-insights-hero"><div className="t2m-insights-container"><div className="t2m-hero-grid"><div><div className="t2m-eyebrow">{getText(locale, data.settings.eyebrowVi, data.settings.eyebrowEn)}</div><h1 className="t2m-title">{getText(locale, data.settings.titleVi, data.settings.titleEn)}</h1><p className="t2m-desc">{getText(locale, data.settings.descriptionVi, data.settings.descriptionEn)}</p><div className="t2m-search-row"><label className="t2m-search-box"><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder={getText(locale, data.settings.searchPlaceholderVi, data.settings.searchPlaceholderEn)} /><Search size={19} color="#475569" /></label><select value={activeCategory} onChange={(event) => setActiveCategory(event.target.value)} className="t2m-select">{categories.map((category) => <option key={category.id} value={category.id}>{getText(locale, category.nameVi, category.nameEn)}</option>)}</select></div></div><div className="t2m-hero-art"><img src={data.settings.heroImage || "/visuals/insights/insight-hero.svg"} alt="T2M Insight" /></div></div></div></section>
    <section className="t2m-feature-section"><div className="t2m-insights-container">{featuredDisplay.length > 0 && <div className="t2m-feature-grid"><FeaturedCard post={featuredDisplay[0]} categories={categories} large /><div className="t2m-feature-side">{featuredDisplay.slice(1, 3).map((post) => <FeaturedCard key={post.id} post={post} categories={categories} />)}</div></div>}<div className="t2m-category-row">{categories.map((category) => { const isActive = activeCategory === category.id; return <button key={category.id} type="button" onClick={() => setActiveCategory(category.id)} className={isActive ? "t2m-category-btn active" : "t2m-category-btn"}><CategoryIcon icon={category.icon} /><span>{getText(locale, category.nameVi, category.nameEn)}</span></button>; })}</div></div></section>
    <section className="t2m-content-section"><div className="t2m-insights-container"><div className="t2m-main-grid"><main><div className="t2m-section-head"><h2>Bài viết mới nhất</h2><button type="button">Xem tất cả chủ đề →</button></div>{latestPosts.length > 0 ? <div className="t2m-article-grid">{latestPosts.map((post) => <ArticleCard key={post.id} post={post} categories={categories} />)}</div> : <div className="t2m-empty">Chưa có bài viết phù hợp với bộ lọc này.</div>}</main><aside className="t2m-sidebar"><div className="t2m-side-card"><div className="t2m-side-icon"><Mail size={20} /></div><h3>{getText(locale, data.settings.newsletterTitleVi, data.settings.newsletterTitleEn)}</h3><p>{getText(locale, data.settings.newsletterDescriptionVi, data.settings.newsletterDescriptionEn)}</p><div className="t2m-newsletter-input"><input placeholder="Nhập email của bạn" /><Send size={16} color="#075af7" /></div><button type="button" className="t2m-newsletter-btn">Đăng ký nhận bản tin</button></div><div className="t2m-side-card"><h3>Bài viết được quan tâm</h3><div className="t2m-small-list">{sidebarPosts.map((post) => <SmallPost key={post.id} post={post} />)}</div></div></aside></div></div></section>
    <section className="t2m-cta"><div><h2>{getText(locale, data.settings.ctaTitleVi, data.settings.ctaTitleEn)}</h2><p>{getText(locale, data.settings.ctaDescriptionVi, data.settings.ctaDescriptionEn)}</p></div><Link href="/contact">{getText(locale, data.settings.ctaLabelVi, data.settings.ctaLabelEn)} <ArrowRight size={16} /></Link></section>
  </div>;
}
