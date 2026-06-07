"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import {
  ArrowLeft,
  Copy,
  FileCog,
  Loader2,
  Plus,
  Save,
  Search,
  Trash2,
  Wand2,
} from "lucide-react";
import type {
  SiteContentData,
  SiteContentField,
  SiteContentFieldType,
  SiteContentPage,
} from "@/lib/siteContentData";

const fieldTypes: { value: SiteContentFieldType; label: string }[] = [
  { value: "text", label: "Text" },
  { value: "textarea", label: "Textarea" },
  { value: "number", label: "Number" },
  { value: "email", label: "Email" },
  { value: "phone", label: "Phone" },
  { value: "url", label: "URL" },
];

function slugify(value: string) {
  return (
    value
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/-+/g, "-")
      .replace(/^-|-$/g, "") || `field-${Date.now()}`
  );
}

function createField(): SiteContentField {
  return {
    id: `field-${Date.now()}`,
    label: "Field mới",
    type: "text",
    valueVi: "",
    valueEn: "",
    placeholder: "",
    note: "",
  };
}

function createPage(): SiteContentPage {
  return {
    id: `page-${Date.now()}`,
    title: "Page mới",
    description: "",
    fields: [createField()],
  };
}

export default function SiteContentAdmin() {
  const [data, setData] = useState<SiteContentData>({ pages: [] });
  const [activePageId, setActivePageId] = useState("");
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editable, setEditable] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const response = await fetch("/api/admin/site-content");
        const json = await response.json();

        if (!response.ok || !json?.ok) {
          alert(json?.message || "Không tải được Site Content.");
          return;
        }

        setData(json.data);
        setEditable(Boolean(json.editable));
        setActivePageId(json.data?.pages?.[0]?.id || "");
      } catch {
        alert("Không tải được Site Content. Anh kiểm tra lại local server nhé.");
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  const activePage = useMemo(
    () => data.pages.find((page) => page.id === activePageId) || data.pages[0],
    [activePageId, data.pages]
  );

  const filteredFields = useMemo(() => {
    if (!activePage) return [];

    const cleanQuery = query.trim().toLowerCase();
    if (!cleanQuery) return activePage.fields;

    return activePage.fields.filter((field) => {
      return [
        field.id,
        field.label,
        field.valueVi,
        field.valueEn,
        field.note,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase()
        .includes(cleanQuery);
    });
  }, [activePage, query]);

  function updatePage(pageId: string, patch: Partial<SiteContentPage>) {
    setData((current) => ({
      pages: current.pages.map((page) =>
        page.id === pageId ? { ...page, ...patch } : page
      ),
    }));
  }

  function updateField(
    pageId: string,
    fieldId: string,
    patch: Partial<SiteContentField>
  ) {
    setData((current) => ({
      pages: current.pages.map((page) =>
        page.id === pageId
          ? {
              ...page,
              fields: page.fields.map((field) =>
                field.id === fieldId ? { ...field, ...patch } : field
              ),
            }
          : page
      ),
    }));
  }

  function addPage() {
    const nextPage = createPage();
    setData((current) => ({ pages: [...current.pages, nextPage] }));
    setActivePageId(nextPage.id);
  }

  function removePage(pageId: string) {
    if (!confirm("Xóa page/group này khỏi Site Content?")) return;

    setData((current) => {
      const nextPages = current.pages.filter((page) => page.id !== pageId);
      setActivePageId(nextPages[0]?.id || "");
      return { pages: nextPages };
    });
  }

  function addField(pageId: string) {
    const nextField = createField();
    setData((current) => ({
      pages: current.pages.map((page) =>
        page.id === pageId
          ? { ...page, fields: [...page.fields, nextField] }
          : page
      ),
    }));
  }

  function duplicateField(pageId: string, field: SiteContentField) {
    const nextField = {
      ...field,
      id: `${field.id}-copy-${Date.now()}`,
      label: `${field.label} copy`,
    };

    setData((current) => ({
      pages: current.pages.map((page) =>
        page.id === pageId
          ? { ...page, fields: [...page.fields, nextField] }
          : page
      ),
    }));
  }

  function removeField(pageId: string, fieldId: string) {
    if (!confirm("Xóa field này?")) return;

    setData((current) => ({
      pages: current.pages.map((page) =>
        page.id === pageId
          ? {
              ...page,
              fields: page.fields.filter((field) => field.id !== fieldId),
            }
          : page
      ),
    }));
  }

  async function saveData() {
    setSaving(true);

    try {
      const response = await fetch("/api/admin/site-content", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const json = await response.json();

      if (!response.ok || !json?.ok) {
        alert(json?.message || "Không lưu được Site Content.");
        return;
      }

      setData(json.data);
      alert("Đã lưu Site Content. Anh reload website để thấy dữ liệu mới nhé.");
    } catch {
      alert("Không lưu được Site Content. Anh kiểm tra lại local server nhé.");
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-50 text-slate-950">
        <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-5 py-4 text-sm font-bold shadow-sm">
          <Loader2 className="h-5 w-5 animate-spin text-blue-600" />
          Đang tải Site Content...
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 px-5 py-8 text-slate-950">
      <div className="mx-auto max-w-7xl">
        <div className="mb-6 flex flex-col gap-4 rounded-[2rem] border border-slate-200 bg-white p-5 shadow-sm lg:flex-row lg:items-center lg:justify-between">
          <div>
            <Link
              href="/admin"
              className="mb-4 inline-flex items-center gap-2 text-sm font-bold text-slate-500 transition hover:text-blue-700"
            >
              <ArrowLeft className="h-4 w-4" />
              Quay lại Dashboard
            </Link>

            <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-blue-50 px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-blue-700">
              <FileCog className="h-4 w-4" />
              Content Settings
            </div>

            <h1 className="text-3xl font-black tracking-tight text-slate-950 sm:text-5xl">
              Site Content Admin
            </h1>

            <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-600">
              Quản lý thông tin mẫu, số liệu, MST, địa chỉ, contact, social link
              theo từng page/group. Dữ liệu lưu tại <b>data/site-content.json</b> để sau này mở rộng CMS dễ hơn.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              onClick={addPage}
              disabled={!editable}
              className="inline-flex items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-5 py-4 text-sm font-black text-slate-700 shadow-sm transition hover:border-blue-200 hover:text-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <Plus className="h-4 w-4" />
              Thêm page/group
            </button>

            <button
              type="button"
              onClick={saveData}
              disabled={saving || !editable}
              className="inline-flex items-center justify-center gap-2 rounded-2xl bg-blue-600 px-6 py-4 text-sm font-black text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
              Lưu thay đổi
            </button>
          </div>
        </div>

        {!editable ? (
          <div className="mb-6 rounded-2xl border border-amber-200 bg-amber-50 px-5 py-4 text-sm font-bold text-amber-800">
            Admin này chỉ cho chỉnh ở local. Trên production/Vercel sẽ bị khóa ghi file.
          </div>
        ) : null}

        <div className="grid gap-6 lg:grid-cols-[310px_1fr]">
          <aside className="rounded-[2rem] border border-slate-200 bg-white p-4 shadow-sm lg:sticky lg:top-6 lg:h-fit">
            <div className="mb-4 flex items-center justify-between gap-3">
              <h2 className="text-sm font-black uppercase tracking-[0.14em] text-slate-500">
                Pages / Groups
              </h2>
              <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-black text-slate-500">
                {data.pages.length}
              </span>
            </div>

            <div className="grid gap-2">
              {data.pages.map((page) => {
                const isActive = page.id === activePage?.id;

                return (
                  <button
                    key={page.id}
                    type="button"
                    onClick={() => setActivePageId(page.id)}
                    className={[
                      "rounded-2xl border px-4 py-3 text-left transition",
                      isActive
                        ? "border-blue-200 bg-blue-50 text-blue-800"
                        : "border-transparent bg-slate-50 text-slate-600 hover:border-slate-200 hover:bg-white",
                    ].join(" ")}
                  >
                    <div className="text-sm font-black">{page.title}</div>
                    <div className="mt-1 text-xs font-semibold opacity-70">
                      {page.fields.length} fields · {page.id}
                    </div>
                  </button>
                );
              })}
            </div>
          </aside>

          <section className="rounded-[2rem] border border-slate-200 bg-white p-5 shadow-sm">
            {activePage ? (
              <>
                <div className="mb-6 grid gap-4 lg:grid-cols-[1fr_auto] lg:items-start">
                  <div className="grid gap-3 md:grid-cols-2">
                    <label className="block">
                      <span className="text-xs font-black uppercase tracking-[0.14em] text-slate-500">
                        Tên page/group
                      </span>
                      <input
                        value={activePage.title}
                        onChange={(event) =>
                          updatePage(activePage.id, { title: event.target.value })
                        }
                        className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold outline-none transition focus:border-blue-400 focus:ring-4 focus:ring-blue-100"
                      />
                    </label>

                    <label className="block">
                      <span className="text-xs font-black uppercase tracking-[0.14em] text-slate-500">
                        ID kỹ thuật
                      </span>
                      <div className="mt-2 flex gap-2">
                        <input
                          value={activePage.id}
                          onChange={(event) =>
                            updatePage(activePage.id, {
                              id: slugify(event.target.value),
                            })
                          }
                          className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold outline-none transition focus:border-blue-400 focus:ring-4 focus:ring-blue-100"
                        />
                        <button
                          type="button"
                          onClick={() =>
                            updatePage(activePage.id, {
                              id: slugify(activePage.title),
                            })
                          }
                          className="rounded-xl border border-slate-200 px-3 text-slate-500 transition hover:border-blue-200 hover:text-blue-700"
                          title="Tạo ID từ tên"
                        >
                          <Wand2 className="h-4 w-4" />
                        </button>
                      </div>
                    </label>

                    <label className="block md:col-span-2">
                      <span className="text-xs font-black uppercase tracking-[0.14em] text-slate-500">
                        Mô tả
                      </span>
                      <input
                        value={activePage.description || ""}
                        onChange={(event) =>
                          updatePage(activePage.id, {
                            description: event.target.value,
                          })
                        }
                        className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold outline-none transition focus:border-blue-400 focus:ring-4 focus:ring-blue-100"
                      />
                    </label>
                  </div>

                  <div className="flex gap-3 lg:justify-end">
                    <button
                      type="button"
                      onClick={() => addField(activePage.id)}
                      className="inline-flex items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-black text-slate-700 shadow-sm transition hover:border-blue-200 hover:text-blue-700"
                    >
                      <Plus className="h-4 w-4" />
                      Thêm field
                    </button>
                    <button
                      type="button"
                      onClick={() => removePage(activePage.id)}
                      className="inline-flex items-center justify-center gap-2 rounded-2xl border border-red-100 bg-red-50 px-5 py-3 text-sm font-black text-red-600 transition hover:bg-red-100"
                    >
                      <Trash2 className="h-4 w-4" />
                      Xóa group
                    </button>
                  </div>
                </div>

                <div className="mb-5 flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
                  <Search className="h-4 w-4 text-slate-400" />
                  <input
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                    placeholder="Tìm field theo ID, label, nội dung..."
                    className="w-full bg-transparent text-sm font-semibold outline-none placeholder:text-slate-400"
                  />
                </div>

                <div className="grid gap-4">
                  {filteredFields.map((field) => (
                    <FieldEditor
                      key={field.id}
                      field={field}
                      onChange={(patch) => updateField(activePage.id, field.id, patch)}
                      onAutoId={() =>
                        updateField(activePage.id, field.id, {
                          id: slugify(field.label),
                        })
                      }
                      onDuplicate={() => duplicateField(activePage.id, field)}
                      onRemove={() => removeField(activePage.id, field.id)}
                    />
                  ))}
                </div>
              </>
            ) : (
              <div className="rounded-2xl border border-dashed border-slate-200 p-10 text-center">
                <p className="text-sm font-bold text-slate-500">
                  Chưa có page/group nào. Bấm “Thêm page/group” để bắt đầu.
                </p>
              </div>
            )}
          </section>
        </div>
      </div>
    </main>
  );
}

function FieldEditor({
  field,
  onChange,
  onAutoId,
  onDuplicate,
  onRemove,
}: {
  field: SiteContentField;
  onChange: (patch: Partial<SiteContentField>) => void;
  onAutoId: () => void;
  onDuplicate: () => void;
  onRemove: () => void;
}) {
  const ValueInput = field.type === "textarea" ? "textarea" : "input";

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="grid gap-3 lg:grid-cols-[1fr_0.9fr_160px_auto] lg:items-end">
        <label className="block">
          <span className="text-xs font-black uppercase tracking-[0.14em] text-slate-500">
            Label
          </span>
          <input
            value={field.label}
            onChange={(event) => onChange({ label: event.target.value })}
            className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold outline-none transition focus:border-blue-400 focus:ring-4 focus:ring-blue-100"
          />
        </label>

        <label className="block">
          <span className="text-xs font-black uppercase tracking-[0.14em] text-slate-500">
            Field ID
          </span>
          <div className="mt-2 flex gap-2">
            <input
              value={field.id}
              onChange={(event) => onChange({ id: slugify(event.target.value) })}
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold outline-none transition focus:border-blue-400 focus:ring-4 focus:ring-blue-100"
            />
            <button
              type="button"
              onClick={onAutoId}
              className="rounded-xl border border-slate-200 px-3 text-slate-500 transition hover:border-blue-200 hover:text-blue-700"
              title="Tạo ID từ label"
            >
              <Wand2 className="h-4 w-4" />
            </button>
          </div>
        </label>

        <label className="block">
          <span className="text-xs font-black uppercase tracking-[0.14em] text-slate-500">
            Loại field
          </span>
          <select
            value={field.type}
            onChange={(event) =>
              onChange({ type: event.target.value as SiteContentFieldType })
            }
            className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold outline-none transition focus:border-blue-400 focus:ring-4 focus:ring-blue-100"
          >
            {fieldTypes.map((type) => (
              <option key={type.value} value={type.value}>
                {type.label}
              </option>
            ))}
          </select>
        </label>

        <div className="flex gap-2">
          <button
            type="button"
            onClick={onDuplicate}
            className="flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 text-slate-500 transition hover:border-blue-200 hover:text-blue-700"
            title="Nhân bản field"
          >
            <Copy className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={onRemove}
            className="flex h-11 w-11 items-center justify-center rounded-xl border border-red-100 bg-red-50 text-red-600 transition hover:bg-red-100"
            title="Xóa field"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="mt-4 grid gap-3 lg:grid-cols-2">
        <label className="block">
          <span className="text-xs font-black uppercase tracking-[0.14em] text-slate-500">
            Giá trị tiếng Việt
          </span>
          <ValueInput
            value={field.valueVi || ""}
            onChange={(event) => onChange({ valueVi: event.target.value })}
            className="mt-2 min-h-12 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold outline-none transition focus:border-blue-400 focus:ring-4 focus:ring-blue-100"
          />
        </label>

        <label className="block">
          <span className="text-xs font-black uppercase tracking-[0.14em] text-slate-500">
            Giá trị tiếng Anh
          </span>
          <ValueInput
            value={field.valueEn || ""}
            onChange={(event) => onChange({ valueEn: event.target.value })}
            className="mt-2 min-h-12 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold outline-none transition focus:border-blue-400 focus:ring-4 focus:ring-blue-100"
          />
        </label>
      </div>

      <div className="mt-4 grid gap-3 lg:grid-cols-2">
        <label className="block">
          <span className="text-xs font-black uppercase tracking-[0.14em] text-slate-500">
            Placeholder nội bộ
          </span>
          <input
            value={field.placeholder || ""}
            onChange={(event) => onChange({ placeholder: event.target.value })}
            className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold outline-none transition focus:border-blue-400 focus:ring-4 focus:ring-blue-100"
          />
        </label>

        <label className="block">
          <span className="text-xs font-black uppercase tracking-[0.14em] text-slate-500">
            Ghi chú
          </span>
          <input
            value={field.note || ""}
            onChange={(event) => onChange({ note: event.target.value })}
            className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold outline-none transition focus:border-blue-400 focus:ring-4 focus:ring-blue-100"
          />
        </label>
      </div>
    </div>
  );
}
