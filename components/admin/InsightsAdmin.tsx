"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import type { InsightCategory, InsightPost, InsightPostType, InsightsData } from "@/lib/insightsData";
import {
  ArrowLeft,
  BarChart3,
  Copy,
  FileText,
  ImageIcon,
  Loader2,
  Plus,
  Save,
  Search,
  Settings2,
  Trash2,
} from "lucide-react";

const postTypes: { value: InsightPostType; label: string }[] = [
  { value: "featured", label: "Featured" },
  { value: "trend", label: "Trend" },
  { value: "caseStudy", label: "Case Study" },
  { value: "normal", label: "Normal" },
];

const categoryIcons = ["grid", "target", "chart", "heart", "workflow", "briefcase", "sparkles"];

type AdminTab = "posts" | "categories" | "settings";

function slugify(value: string) {
  return (
    value
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/đ/g, "d")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/-+/g, "-")
      .replace(/^-|-$/g, "") || `item-${Date.now()}`
  );
}

function createPost(): InsightPost {
  const id = `insight-${Date.now()}`;
  return {
    id,
    titleVi: "Bài viết mới",
    titleEn: "New article",
    excerptVi: "Mô tả ngắn của bài viết.",
    excerptEn: "Short article excerpt.",
    contentVi: "## Mở đầu\n\nViết nội dung bài tại đây. Anh có thể dùng tiêu đề bằng ##, đoạn văn thường và checklist bắt đầu bằng dấu -.\n\n## Checklist\n\n- Ý chính thứ nhất.\n- Ý chính thứ hai.\n- Ý chính thứ ba.",
    contentEn: "## Introduction\n\nWrite the article content here. You can use ## headings, normal paragraphs and checklist items starting with -.\n\n## Checklist\n\n- First key point.\n- Second key point.\n- Third key point.",
    categoryId: "performance",
    type: "normal",
    image: "/visuals/insights/insight-hero.svg",
    author: "T2M Team",
    dateVi: "01 Thg 1, 2026",
    dateEn: "Jan 1, 2026",
    readTimeVi: "5 phút đọc",
    readTimeEn: "5 min read",
    slug: id,
    isFeatured: false,
    isPopular: false,
  };
}

function createCategory(): InsightCategory {
  return {
    id: `category-${Date.now()}`,
    nameVi: "Chủ đề mới",
    nameEn: "New topic",
    icon: "grid",
  };
}

const inputClass = "mt-1 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-800 outline-none transition focus:border-blue-400 focus:ring-4 focus:ring-blue-100";
const labelClass = "text-xs font-black uppercase tracking-[0.14em] text-slate-500";

export default function InsightsAdmin() {
  const [data, setData] = useState<InsightsData | null>(null);
  const [activeTab, setActiveTab] = useState<AdminTab>("posts");
  const [activePostId, setActivePostId] = useState("");
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editable, setEditable] = useState(true);
  const [heroImageFile, setHeroImageFile] = useState<File | null>(null);
  const postImageFiles = useRef<Record<string, File | null>>({});

  useEffect(() => {
    async function loadData() {
      try {
        const response = await fetch("/api/admin/insights");
        const json = await response.json();

        if (!response.ok || !json?.ok) {
          alert(json?.message || "Không tải được Insights.");
          return;
        }

        setData(json.data);
        setEditable(Boolean(json.editable));
        setActivePostId(json.data?.posts?.[0]?.id || "");
      } catch {
        alert("Không tải được Insights. Anh kiểm tra lại local server nhé.");
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  const activePost = useMemo(
    () => data?.posts.find((post) => post.id === activePostId) || data?.posts[0],
    [activePostId, data?.posts]
  );

  const filteredPosts = useMemo(() => {
    if (!data) return [];
    const cleanQuery = query.trim().toLowerCase();
    if (!cleanQuery) return data.posts;

    return data.posts.filter((post) =>
      [post.titleVi, post.titleEn, post.categoryId, post.type, post.slug]
        .join(" ")
        .toLowerCase()
        .includes(cleanQuery)
    );
  }, [data, query]);

  function updateSettings(patch: Partial<InsightsData["settings"]>) {
    setData((current) => current ? { ...current, settings: { ...current.settings, ...patch } } : current);
  }

  function updatePost(postId: string, patch: Partial<InsightPost>) {
    setData((current) => current ? {
      ...current,
      posts: current.posts.map((post) => post.id === postId ? { ...post, ...patch } : post),
    } : current);
  }

  function updateCategory(categoryId: string, patch: Partial<InsightCategory>) {
    setData((current) => current ? {
      ...current,
      categories: current.categories.map((category) => category.id === categoryId ? { ...category, ...patch } : category),
    } : current);
  }

  function addPost() {
    const post = createPost();
    setData((current) => current ? { ...current, posts: [post, ...current.posts] } : current);
    setActivePostId(post.id);
    setActiveTab("posts");
  }

  function duplicatePost(post: InsightPost) {
    const nextPost = {
      ...post,
      id: `${post.id}-copy-${Date.now()}`,
      titleVi: `${post.titleVi} copy`,
      titleEn: `${post.titleEn} copy`,
      slug: `${post.slug}-copy-${Date.now()}`,
      isFeatured: false,
    };
    setData((current) => current ? { ...current, posts: [nextPost, ...current.posts] } : current);
    setActivePostId(nextPost.id);
  }

  function removePost(postId: string) {
    if (!confirm("Xóa bài viết này khỏi Insight?")) return;
    setData((current) => {
      if (!current) return current;
      const nextPosts = current.posts.filter((post) => post.id !== postId);
      setActivePostId(nextPosts[0]?.id || "");
      return { ...current, posts: nextPosts };
    });
  }

  function addCategory() {
    const category = createCategory();
    setData((current) => current ? { ...current, categories: [...current.categories, category] } : current);
  }

  function removeCategory(categoryId: string) {
    if (categoryId === "all") {
      alert("Không nên xóa category 'all' vì dùng làm tab mặc định.");
      return;
    }
    if (!confirm("Xóa chủ đề này? Các bài viết đang dùng chủ đề này cần đổi sang chủ đề khác.")) return;
    setData((current) => current ? { ...current, categories: current.categories.filter((category) => category.id !== categoryId) } : current);
  }

  async function saveData() {
    if (!data) return;
    setSaving(true);

    try {
      const formData = new FormData();
      formData.append("data", JSON.stringify(data));

      if (heroImageFile) {
        formData.append("heroImageFile", heroImageFile);
      }

      Object.entries(postImageFiles.current).forEach(([postId, file]) => {
        if (file) formData.append(`postImage:${postId}`, file);
      });

      const response = await fetch("/api/admin/insights", {
        method: "PUT",
        body: formData,
      });
      const json = await response.json();

      if (!response.ok || !json?.ok) {
        alert(json?.message || "Không lưu được Insights.");
        return;
      }

      setData(json.data);
      setHeroImageFile(null);
      postImageFiles.current = {};
      alert(json.message || "Đã lưu Insights.");
    } catch {
      alert("Không lưu được Insights. Anh kiểm tra terminal local nhé.");
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-950 text-white">
        <Loader2 className="mr-3 h-5 w-5 animate-spin" /> Đang tải Insight Admin...
      </div>
    );
  }

  if (!data) {
    return <div className="min-h-screen bg-slate-950 p-10 text-white">Không có dữ liệu Insight.</div>;
  }

  return (
    <div className="min-h-screen bg-slate-100 text-slate-950">
      <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-5 py-5 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <Link href="/admin" className="mb-3 inline-flex items-center gap-2 text-sm font-bold text-blue-600 hover:text-blue-700">
              <ArrowLeft className="h-4 w-4" /> Về Dashboard Admin
            </Link>
            <h1 className="text-3xl font-black tracking-tight">Insight / Blog Admin</h1>
            <p className="mt-1 text-sm text-slate-600">Quản lý hero, category, bài viết, ảnh, bài nổi bật và newsletter cho Page Insight.</p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link href="/insights" className="inline-flex h-11 items-center rounded-xl border border-slate-200 bg-white px-5 text-sm font-bold text-slate-700 hover:bg-slate-50">
              Xem Page Insight
            </Link>
            <button type="button" onClick={addPost} className="inline-flex h-11 items-center gap-2 rounded-xl border border-blue-200 bg-blue-50 px-5 text-sm font-bold text-blue-700 hover:bg-blue-100">
              <Plus className="h-4 w-4" /> Thêm bài viết
            </button>
            <button type="button" onClick={saveData} disabled={saving || !editable} className="inline-flex h-11 items-center gap-2 rounded-xl bg-blue-600 px-5 text-sm font-bold text-white shadow-lg shadow-blue-600/20 hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-slate-400">
              {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
              Lưu thay đổi
            </button>
          </div>
        </div>
      </header>

      {!editable && (
        <div className="mx-auto mt-5 max-w-7xl px-5">
          <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm font-semibold text-amber-800">
            Admin chỉ cho sửa file ở local. Khi deploy Vercel, phần này tự khóa để không lỗi ghi file.
          </div>
        </div>
      )}

      <main className="mx-auto grid max-w-7xl gap-6 px-5 py-8 lg:grid-cols-[320px_1fr]">
        <aside className="space-y-4">
          <div className="rounded-3xl border border-slate-200 bg-white p-3 shadow-sm">
            <button onClick={() => setActiveTab("posts")} className={`flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-left text-sm font-black ${activeTab === "posts" ? "bg-blue-600 text-white" : "text-slate-700 hover:bg-slate-50"}`}>
              <FileText className="h-4 w-4" /> Bài viết
            </button>
            <button onClick={() => setActiveTab("categories")} className={`mt-1 flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-left text-sm font-black ${activeTab === "categories" ? "bg-blue-600 text-white" : "text-slate-700 hover:bg-slate-50"}`}>
              <BarChart3 className="h-4 w-4" /> Chủ đề
            </button>
            <button onClick={() => setActiveTab("settings")} className={`mt-1 flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-left text-sm font-black ${activeTab === "settings" ? "bg-blue-600 text-white" : "text-slate-700 hover:bg-slate-50"}`}>
              <Settings2 className="h-4 w-4" /> Hero & CTA
            </button>
          </div>

          {activeTab === "posts" && (
            <div className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm">
              <label className="mb-4 flex h-11 items-center gap-2 rounded-xl border border-slate-200 px-3">
                <Search className="h-4 w-4 text-slate-400" />
                <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Tìm bài viết..." className="w-full bg-transparent text-sm outline-none" />
              </label>
              <div className="max-h-[620px] space-y-2 overflow-auto pr-1">
                {filteredPosts.map((post) => (
                  <button key={post.id} onClick={() => setActivePostId(post.id)} className={`w-full rounded-2xl border p-3 text-left transition ${activePost?.id === post.id ? "border-blue-300 bg-blue-50" : "border-slate-100 hover:border-slate-200 hover:bg-slate-50"}`}>
                    <div className="line-clamp-2 text-sm font-black text-slate-950">{post.titleVi}</div>
                    <div className="mt-2 flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.12em] text-slate-500">
                      <span>{post.categoryId}</span>
                      {post.isFeatured && <span className="rounded bg-blue-600 px-2 py-0.5 text-white">Featured</span>}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </aside>

        <section>
          {activeTab === "posts" && activePost && (
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="mb-6 flex flex-wrap items-start justify-between gap-4 border-b border-slate-100 pb-6">
                <div>
                  <h2 className="text-2xl font-black tracking-tight">Nội dung bài viết</h2>
                  <p className="mt-1 text-sm text-slate-600">Tối đa 3 bài được tick Featured sẽ hiện ở cụm nổi bật đầu trang.</p>
                </div>
                <div className="flex gap-2">
                  <button type="button" onClick={() => duplicatePost(activePost)} className="inline-flex h-10 items-center gap-2 rounded-xl border border-slate-200 px-4 text-sm font-bold text-slate-700 hover:bg-slate-50">
                    <Copy className="h-4 w-4" /> Nhân bản
                  </button>
                  <button type="button" onClick={() => removePost(activePost.id)} className="inline-flex h-10 items-center gap-2 rounded-xl border border-red-200 px-4 text-sm font-bold text-red-600 hover:bg-red-50">
                    <Trash2 className="h-4 w-4" /> Xóa
                  </button>
                </div>
              </div>

              <div className="grid gap-5 lg:grid-cols-2">
                <label>
                  <span className={labelClass}>Tiêu đề VI</span>
                  <input className={inputClass} value={activePost.titleVi} onChange={(event) => updatePost(activePost.id, { titleVi: event.target.value, slug: slugify(event.target.value) })} />
                </label>
                <label>
                  <span className={labelClass}>Tiêu đề EN</span>
                  <input className={inputClass} value={activePost.titleEn} onChange={(event) => updatePost(activePost.id, { titleEn: event.target.value })} />
                </label>
                <label className="lg:col-span-2">
                  <span className={labelClass}>Excerpt VI</span>
                  <textarea className={`${inputClass} min-h-[96px]`} value={activePost.excerptVi} onChange={(event) => updatePost(activePost.id, { excerptVi: event.target.value })} />
                </label>
                <label className="lg:col-span-2">
                  <span className={labelClass}>Excerpt EN</span>
                  <textarea className={`${inputClass} min-h-[96px]`} value={activePost.excerptEn} onChange={(event) => updatePost(activePost.id, { excerptEn: event.target.value })} />
                </label>
                <label className="lg:col-span-2">
                  <span className={labelClass}>Nội dung bài viết VI / CMS Content</span>
                  <textarea
                    className={`${inputClass} min-h-[260px] font-mono text-[13px] leading-6`}
                    value={activePost.contentVi || ""}
                    onChange={(event) => updatePost(activePost.id, { contentVi: event.target.value })}
                    placeholder={"## Tiêu đề phụ\n\nĐoạn nội dung...\n\n- Bullet 1\n- Bullet 2"}
                  />
                  <p className="mt-2 text-xs font-semibold text-slate-500">Hỗ trợ định dạng nhẹ: dùng <b>##</b> cho heading, dòng bắt đầu bằng <b>-</b> cho checklist. Nội dung này sẽ hiện ở trang /insights/[slug].</p>
                </label>
                <label className="lg:col-span-2">
                  <span className={labelClass}>Nội dung bài viết EN</span>
                  <textarea
                    className={`${inputClass} min-h-[220px] font-mono text-[13px] leading-6`}
                    value={activePost.contentEn || ""}
                    onChange={(event) => updatePost(activePost.id, { contentEn: event.target.value })}
                  />
                </label>
                <label>
                  <span className={labelClass}>Category</span>
                  <select className={inputClass} value={activePost.categoryId} onChange={(event) => updatePost(activePost.id, { categoryId: event.target.value })}>
                    {data.categories.filter((category) => category.id !== "all").map((category) => (
                      <option key={category.id} value={category.id}>{category.nameVi}</option>
                    ))}
                  </select>
                </label>
                <label>
                  <span className={labelClass}>Loại bài</span>
                  <select className={inputClass} value={activePost.type} onChange={(event) => updatePost(activePost.id, { type: event.target.value as InsightPostType })}>
                    {postTypes.map((type) => <option key={type.value} value={type.value}>{type.label}</option>)}
                  </select>
                </label>
                <label>
                  <span className={labelClass}>Slug</span>
                  <input className={inputClass} value={activePost.slug} onChange={(event) => updatePost(activePost.id, { slug: slugify(event.target.value) })} />
                </label>
                <label>
                  <span className={labelClass}>Tác giả</span>
                  <input className={inputClass} value={activePost.author} onChange={(event) => updatePost(activePost.id, { author: event.target.value })} />
                </label>
                <label>
                  <span className={labelClass}>Ngày VI</span>
                  <input className={inputClass} value={activePost.dateVi} onChange={(event) => updatePost(activePost.id, { dateVi: event.target.value })} />
                </label>
                <label>
                  <span className={labelClass}>Ngày EN</span>
                  <input className={inputClass} value={activePost.dateEn} onChange={(event) => updatePost(activePost.id, { dateEn: event.target.value })} />
                </label>
                <label>
                  <span className={labelClass}>Thời lượng đọc VI</span>
                  <input className={inputClass} value={activePost.readTimeVi} onChange={(event) => updatePost(activePost.id, { readTimeVi: event.target.value })} />
                </label>
                <label>
                  <span className={labelClass}>Thời lượng đọc EN</span>
                  <input className={inputClass} value={activePost.readTimeEn} onChange={(event) => updatePost(activePost.id, { readTimeEn: event.target.value })} />
                </label>

                <div className="lg:col-span-2 rounded-2xl border border-slate-200 bg-slate-50 p-5">
                  <div className="grid gap-5 lg:grid-cols-[220px_1fr] lg:items-center">
                    <img src={activePost.image || "/visuals/insights/insight-hero.svg"} alt="Preview" className="h-32 w-full rounded-2xl object-cover" />
                    <div>
                      <div className={labelClass}>Ảnh bài viết</div>
                      <input className="mt-3 block w-full text-sm text-slate-700 file:mr-4 file:rounded-xl file:border-0 file:bg-blue-600 file:px-4 file:py-2 file:text-sm file:font-bold file:text-white hover:file:bg-blue-700" type="file" accept="image/*" onChange={(event) => { postImageFiles.current[activePost.id] = event.target.files?.[0] || null; }} />
                      <input className={inputClass} value={activePost.image} onChange={(event) => updatePost(activePost.id, { image: event.target.value })} placeholder="Dán URL ảnh Internet hoặc upload ảnh từ máy" />
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-2 flex flex-wrap gap-6 rounded-2xl border border-slate-200 p-5">
                  <label className="inline-flex items-center gap-3 text-sm font-bold text-slate-700">
                    <input type="checkbox" checked={Boolean(activePost.isFeatured)} onChange={(event) => updatePost(activePost.id, { isFeatured: event.target.checked })} className="h-5 w-5 rounded border-slate-300 text-blue-600" />
                    Hiển thị ở Featured đầu trang
                  </label>
                  <label className="inline-flex items-center gap-3 text-sm font-bold text-slate-700">
                    <input type="checkbox" checked={Boolean(activePost.isPopular)} onChange={(event) => updatePost(activePost.id, { isPopular: event.target.checked })} className="h-5 w-5 rounded border-slate-300 text-blue-600" />
                    Hiển thị ở Bài viết được quan tâm
                  </label>
                </div>
              </div>
            </div>
          )}

          {activeTab === "categories" && (
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="mb-6 flex items-center justify-between border-b border-slate-100 pb-6">
                <div>
                  <h2 className="text-2xl font-black tracking-tight">Quản lý chủ đề</h2>
                  <p className="mt-1 text-sm text-slate-600">Các chủ đề này sẽ hiện thành filter icon ở Page Insight.</p>
                </div>
                <button onClick={addCategory} className="inline-flex h-11 items-center gap-2 rounded-xl bg-blue-600 px-5 text-sm font-bold text-white hover:bg-blue-700">
                  <Plus className="h-4 w-4" /> Thêm chủ đề
                </button>
              </div>
              <div className="space-y-4">
                {data.categories.map((category) => (
                  <div key={category.id} className="grid gap-4 rounded-2xl border border-slate-200 p-4 lg:grid-cols-[1fr_1fr_150px_auto] lg:items-end">
                    <label>
                      <span className={labelClass}>Tên VI</span>
                      <input className={inputClass} value={category.nameVi} onChange={(event) => updateCategory(category.id, { nameVi: event.target.value })} />
                    </label>
                    <label>
                      <span className={labelClass}>Tên EN</span>
                      <input className={inputClass} value={category.nameEn} onChange={(event) => updateCategory(category.id, { nameEn: event.target.value })} />
                    </label>
                    <label>
                      <span className={labelClass}>Icon</span>
                      <select className={inputClass} value={category.icon} onChange={(event) => updateCategory(category.id, { icon: event.target.value })}>
                        {categoryIcons.map((icon) => <option key={icon} value={icon}>{icon}</option>)}
                      </select>
                    </label>
                    <button type="button" onClick={() => removeCategory(category.id)} className="inline-flex h-12 items-center justify-center rounded-xl border border-red-200 px-4 text-sm font-bold text-red-600 hover:bg-red-50">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "settings" && (
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="mb-6 border-b border-slate-100 pb-6">
                <h2 className="text-2xl font-black tracking-tight">Hero, Newsletter & CTA</h2>
                <p className="mt-1 text-sm text-slate-600">Quản lý text đầu trang, ảnh hero, khối đăng ký insight và CTA cuối trang.</p>
              </div>

              <div className="grid gap-5 lg:grid-cols-2">
                {([
                  ["eyebrowVi", "Eyebrow VI"], ["eyebrowEn", "Eyebrow EN"], ["titleVi", "Title VI"], ["titleEn", "Title EN"],
                  ["descriptionVi", "Description VI"], ["descriptionEn", "Description EN"], ["searchPlaceholderVi", "Search placeholder VI"], ["searchPlaceholderEn", "Search placeholder EN"],
                  ["newsletterTitleVi", "Newsletter title VI"], ["newsletterTitleEn", "Newsletter title EN"], ["newsletterDescriptionVi", "Newsletter description VI"], ["newsletterDescriptionEn", "Newsletter description EN"],
                  ["ctaTitleVi", "CTA title VI"], ["ctaTitleEn", "CTA title EN"], ["ctaDescriptionVi", "CTA description VI"], ["ctaDescriptionEn", "CTA description EN"],
                  ["ctaLabelVi", "CTA label VI"], ["ctaLabelEn", "CTA label EN"],
                ] as [keyof InsightsData["settings"], string][]).map(([key, label]) => (
                  <label key={key} className={String(key).toLowerCase().includes("description") || String(key).toLowerCase().includes("title") ? "lg:col-span-2" : ""}>
                    <span className={labelClass}>{label}</span>
                    {String(key).toLowerCase().includes("description") ? (
                      <textarea className={`${inputClass} min-h-[88px]`} value={String(data.settings[key] || "")} onChange={(event) => updateSettings({ [key]: event.target.value } as Partial<InsightsData["settings"]>)} />
                    ) : (
                      <input className={inputClass} value={String(data.settings[key] || "")} onChange={(event) => updateSettings({ [key]: event.target.value } as Partial<InsightsData["settings"]>)} />
                    )}
                  </label>
                ))}

                <div className="lg:col-span-2 rounded-2xl border border-slate-200 bg-slate-50 p-5">
                  <div className="grid gap-5 lg:grid-cols-[260px_1fr] lg:items-center">
                    <div className="relative h-40 overflow-hidden rounded-2xl bg-white">
                      {data.settings.heroImage ? <img src={data.settings.heroImage} alt="Hero preview" className="h-full w-full object-cover" /> : <ImageIcon className="m-auto h-10 w-10 text-slate-400" />}
                    </div>
                    <div>
                      <div className={labelClass}>Ảnh Hero Insight</div>
                      <input className="mt-3 block w-full text-sm text-slate-700 file:mr-4 file:rounded-xl file:border-0 file:bg-blue-600 file:px-4 file:py-2 file:text-sm file:font-bold file:text-white hover:file:bg-blue-700" type="file" accept="image/*" onChange={(event) => setHeroImageFile(event.target.files?.[0] || null)} />
                      <input className={inputClass} value={data.settings.heroImage} onChange={(event) => updateSettings({ heroImage: event.target.value })} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
