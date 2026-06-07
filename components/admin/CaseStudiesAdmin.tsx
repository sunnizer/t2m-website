"use client";

import { useEffect, useMemo, useState } from "react";
import {
  defaultCaseStudiesData,
  type CaseStudiesData,
  type CaseStudyItem,
  type CaseStudyMetric,
  type CaseStudyMetricIcon,
} from "@/lib/caseStudiesData";
import {
  ArrowDown,
  ArrowLeft,
  ArrowUp,
  ImagePlus,
  Plus,
  Save,
  Trash2,
} from "lucide-react";

const maxCaseStudies = 6;

const iconOptions: {
  value: CaseStudyMetricIcon;
  label: string;
}[] = [
  { value: "message", label: "Message / Discussion" },
  { value: "users", label: "Users / Reach" },
  { value: "line", label: "Line chart / Growth" },
  { value: "bar", label: "Bar chart / Report" },
  { value: "rocket", label: "Rocket / Launch" },
  { value: "report", label: "Report / Checklist" },
];

function createId(name: string) {
  const base =
    name
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/-+/g, "-")
      .replace(/^-|-$/g, "") || "case-study";

  const suffix =
    typeof crypto !== "undefined" && "randomUUID" in crypto
      ? crypto.randomUUID().slice(0, 8)
      : String(Date.now()).slice(-8);

  return `${base}-${suffix}`;
}

function createMetric(index: number): CaseStudyMetric {
  const metricNumber = index + 1;

  return {
    id: `metric-${metricNumber}`,
    value: "-",
    labelVi: "Chỉ số",
    labelEn: "Metric",
    icon: index === 0 ? "message" : index === 1 ? "users" : "line",
  };
}

function createEmptyCaseStudy(): CaseStudyItem {
  return {
    id: createId("case-study"),
    nameVi: "",
    nameEn: "",
    categoryVi: "",
    categoryEn: "",
    image: "",
    tags: ["Social", "Seeding"],
    metrics: [createMetric(0), createMetric(1), createMetric(2)],
  };
}

function normalizeMetrics(metrics: CaseStudyMetric[]) {
  const next = metrics.slice(0, 3);

  while (next.length < 3) {
    next.push(createMetric(next.length));
  }

  return next;
}

export default function CaseStudiesAdmin() {
  const [data, setData] = useState<CaseStudiesData>(defaultCaseStudiesData);
  const [files, setFiles] = useState<Record<string, File>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const totalCaseStudies = useMemo(() => {
    return data.caseStudies.length;
  }, [data.caseStudies.length]);

  useEffect(() => {
    async function loadData() {
      try {
        const response = await fetch("/api/admin/case-studies", {
          cache: "no-store",
        });

        const json = await response.json();

        if (!response.ok || !json?.ok) {
          throw new Error("Cannot load case studies data");
        }

        setData(json.data as CaseStudiesData);
      } catch {
        setData(defaultCaseStudiesData);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  function updateItem(id: string, patch: Partial<CaseStudyItem>) {
    setData((current) => ({
      ...current,
      caseStudies: current.caseStudies.map((item) =>
        item.id === id ? { ...item, ...patch } : item
      ),
    }));
  }

  function updateMetric(
    itemId: string,
    metricIndex: number,
    patch: Partial<CaseStudyMetric>
  ) {
    setData((current) => ({
      ...current,
      caseStudies: current.caseStudies.map((item) => {
        if (item.id !== itemId) return item;

        const metrics = normalizeMetrics(item.metrics).map((metric, index) =>
          index === metricIndex ? { ...metric, ...patch } : metric
        );

        return {
          ...item,
          metrics,
        };
      }),
    }));
  }

  function addItem() {
    if (data.caseStudies.length >= maxCaseStudies) {
      alert("Trang chủ chỉ hiển thị tối đa 6 Case Studies.");
      return;
    }

    setData((current) => ({
      ...current,
      caseStudies: [...current.caseStudies, createEmptyCaseStudy()],
    }));
  }

  function removeItem(id: string) {
    setData((current) => ({
      ...current,
      caseStudies: current.caseStudies.filter((item) => item.id !== id),
    }));

    setFiles((current) => {
      const next = { ...current };
      delete next[`image_${id}`];
      return next;
    });
  }

  function moveItem(id: string, direction: "up" | "down") {
    setData((current) => {
      const list = [...current.caseStudies];
      const index = list.findIndex((item) => item.id === id);

      if (index < 0) return current;

      const nextIndex = direction === "up" ? index - 1 : index + 1;

      if (nextIndex < 0 || nextIndex >= list.length) {
        return current;
      }

      const currentItem = list[index];
      const targetItem = list[nextIndex];

      list[index] = targetItem;
      list[nextIndex] = currentItem;

      return {
        ...current,
        caseStudies: list,
      };
    });
  }

  function handleFileChange(id: string, file?: File) {
    if (!file) return;

    setFiles((current) => ({
      ...current,
      [`image_${id}`]: file,
    }));
  }

  async function saveData() {
    setSaving(true);

    try {
      const formData = new FormData();
      formData.append("data", JSON.stringify(data));

      Object.entries(files).forEach(([key, file]) => {
        formData.append(key, file);
      });

      const response = await fetch("/api/admin/case-studies", {
        method: "PUT",
        body: formData,
      });

      const json = await response.json();

      if (!response.ok || !json?.ok) {
        throw new Error(json?.message || "Save failed");
      }

      setData(json.data as CaseStudiesData);
      setFiles({});
      alert(json.message || "Đã lưu Case Studies.");
    } catch {
      alert("Không lưu được dữ liệu. Anh kiểm tra lại local server nhé.");
    } finally {
      setSaving(false);
    }
  }

  function renderImagePreview(item: CaseStudyItem) {
    const file = files[`image_${item.id}`];
    const previewUrl = file ? URL.createObjectURL(file) : item.image;

    if (previewUrl) {
      return (
        <div className="relative h-32 w-52 overflow-hidden rounded-2xl border border-slate-200 bg-slate-100">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={previewUrl}
            alt={item.nameVi || "Case Study preview"}
            className="h-full w-full object-cover"
          />
        </div>
      );
    }

    return (
      <div className="flex h-32 w-52 items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-4 text-center text-xs font-bold text-slate-400">
        Chưa có ảnh
      </div>
    );
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-slate-50 px-5 py-10">
        <div className="mx-auto max-w-7xl rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-sm">
          <p className="text-sm font-bold text-slate-600">
            Đang tải Admin Case Studies...
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 px-5 py-10 text-slate-950">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <a
				  href="/admin"
				  className="mb-4 inline-flex items-center gap-2 text-sm font-bold text-blue-700 hover:text-blue-900"
				>
				  <ArrowLeft className="h-4 w-4" />
				  Quay lại Admin Dashboard
				</a>

              <div className="mb-3 inline-flex rounded-full bg-blue-50 px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-blue-700">
                Admin Local
              </div>

              <h1 className="text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">
                Quản lý Case Studies
              </h1>

              <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-600">
                Trang chủ hiển thị tối đa <strong>6 Case Studies</strong>. Ảnh
                nên dùng tỷ lệ 16:9 hoặc 16:10, kích thước gợi ý 1200×700px,
                định dạng JPG/WebP.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <div className="rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4 text-sm font-bold text-slate-600">
                Tổng:{" "}
                <span className="text-lg font-black text-blue-700">
                  {totalCaseStudies}
                </span>
                /{maxCaseStudies} case
              </div>

              <button
                type="button"
                onClick={addItem}
                disabled={data.caseStudies.length >= maxCaseStudies}
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-blue-600 px-5 py-4 text-sm font-black text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-40"
              >
                <Plus className="h-4 w-4" />
                Thêm Case
              </button>

              <button
                type="button"
                onClick={saveData}
                disabled={saving}
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-slate-950 px-5 py-4 text-sm font-black text-white shadow-lg shadow-slate-950/15 transition hover:bg-blue-700 disabled:cursor-wait disabled:opacity-60"
              >
                <Save className="h-4 w-4" />
                {saving ? "Đang lưu..." : "Lưu thay đổi"}
              </button>
            </div>
          </div>
        </div>

        <div className="grid gap-6">
          {data.caseStudies.map((item, index) => (
            <section
              key={item.id}
              className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm"
            >
              <div className="mb-5 flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
                <div className="flex flex-col gap-4 sm:flex-row">
                  {renderImagePreview(item)}

                  <div>
                    <div className="mb-2 text-xs font-black uppercase tracking-[0.18em] text-blue-700">
                      Case #{index + 1}
                    </div>
                    <h2 className="text-xl font-black text-slate-950">
                      {item.nameVi || "Case Study chưa đặt tên"}
                    </h2>
                    <p className="mt-2 max-w-2xl text-sm leading-7 text-slate-500">
                      Tên case trên website sẽ bị giới hạn tối đa 2 dòng để
                      tránh lệch block.
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => moveItem(item.id, "up")}
                    disabled={index === 0}
                    className="rounded-xl border border-slate-200 bg-white p-3 text-slate-600 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-30"
                    title="Đưa lên"
                  >
                    <ArrowUp className="h-4 w-4" />
                  </button>

                  <button
                    type="button"
                    onClick={() => moveItem(item.id, "down")}
                    disabled={index === data.caseStudies.length - 1}
                    className="rounded-xl border border-slate-200 bg-white p-3 text-slate-600 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-30"
                    title="Đưa xuống"
                  >
                    <ArrowDown className="h-4 w-4" />
                  </button>

                  <button
                    type="button"
                    onClick={() => removeItem(item.id)}
                    className="rounded-xl border border-red-100 bg-red-50 p-3 text-red-600 transition hover:bg-red-100"
                    title="Xoá"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>

              <div className="grid gap-4 xl:grid-cols-2">
                <label className="block">
                  <span className="text-xs font-bold uppercase tracking-[0.14em] text-slate-500">
                    Tên Case tiếng Việt
                  </span>
                  <input
                    value={item.nameVi}
                    onChange={(event) =>
                      updateItem(item.id, { nameVi: event.target.value })
                    }
                    placeholder="Ví dụ: VietinBank Countdown 2025"
                    className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-900 outline-none transition focus:border-blue-400 focus:ring-4 focus:ring-blue-100"
                  />
                </label>

                <label className="block">
                  <span className="text-xs font-bold uppercase tracking-[0.14em] text-slate-500">
                    Tên Case English
                  </span>
                  <input
                    value={item.nameEn}
                    onChange={(event) =>
                      updateItem(item.id, { nameEn: event.target.value })
                    }
                    placeholder="Example: VietinBank Countdown 2025"
                    className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-900 outline-none transition focus:border-blue-400 focus:ring-4 focus:ring-blue-100"
                  />
                </label>

                <label className="block">
                  <span className="text-xs font-bold uppercase tracking-[0.14em] text-slate-500">
                    Category tiếng Việt
                  </span>
                  <input
                    value={item.categoryVi}
                    onChange={(event) =>
                      updateItem(item.id, { categoryVi: event.target.value })
                    }
                    placeholder="Ví dụ: Banking Event"
                    className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-900 outline-none transition focus:border-blue-400 focus:ring-4 focus:ring-blue-100"
                  />
                </label>

                <label className="block">
                  <span className="text-xs font-bold uppercase tracking-[0.14em] text-slate-500">
                    Category English
                  </span>
                  <input
                    value={item.categoryEn}
                    onChange={(event) =>
                      updateItem(item.id, { categoryEn: event.target.value })
                    }
                    placeholder="Example: Banking Event"
                    className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-900 outline-none transition focus:border-blue-400 focus:ring-4 focus:ring-blue-100"
                  />
                </label>

                <label className="block">
                  <span className="text-xs font-bold uppercase tracking-[0.14em] text-slate-500">
                    Tags, cách nhau bằng dấu phẩy
                  </span>
                  <input
                    value={item.tags.join(", ")}
                    onChange={(event) =>
                      updateItem(item.id, {
                        tags: event.target.value
                          .split(",")
                          .map((tag) => tag.trim())
                          .filter(Boolean)
                          .slice(0, 3),
                      })
                    }
                    placeholder="Social, Seeding, Reporting"
                    className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-900 outline-none transition focus:border-blue-400 focus:ring-4 focus:ring-blue-100"
                  />
                </label>

                <label className="block">
                  <span className="text-xs font-bold uppercase tracking-[0.14em] text-slate-500">
                    Upload ảnh
                  </span>
                  <div className="mt-2 flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3">
                    <ImagePlus className="h-4 w-4 text-blue-600" />
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(event) =>
                        handleFileChange(item.id, event.target.files?.[0])
                      }
                      className="text-sm"
                    />
                  </div>
                </label>
              </div>

              <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <h3 className="mb-4 text-sm font-black uppercase tracking-[0.16em] text-slate-600">
                  3 chỉ số nổi bật
                </h3>

                <div className="grid gap-4 xl:grid-cols-3">
                  {normalizeMetrics(item.metrics).map((metric, metricIndex) => (
                    <div
                      key={`${item.id}-${metricIndex}`}
                      className="rounded-2xl border border-slate-200 bg-white p-4"
                    >
                      <div className="mb-3 text-xs font-black uppercase tracking-[0.16em] text-blue-700">
                        Metric #{metricIndex + 1}
                      </div>

                      <label className="mb-3 block">
                        <span className="text-xs font-bold uppercase tracking-[0.14em] text-slate-500">
                          Value
                        </span>
                        <input
                          value={metric.value}
                          onChange={(event) =>
                            updateMetric(item.id, metricIndex, {
                              value: event.target.value,
                            })
                          }
                          placeholder="230K+"
                          className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-900 outline-none transition focus:border-blue-400 focus:ring-4 focus:ring-blue-100"
                        />
                      </label>

                      <label className="mb-3 block">
                        <span className="text-xs font-bold uppercase tracking-[0.14em] text-slate-500">
                          Label VI
                        </span>
                        <input
                          value={metric.labelVi}
                          onChange={(event) =>
                            updateMetric(item.id, metricIndex, {
                              labelVi: event.target.value,
                            })
                          }
                          placeholder="Thảo luận"
                          className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-900 outline-none transition focus:border-blue-400 focus:ring-4 focus:ring-blue-100"
                        />
                      </label>

                      <label className="mb-3 block">
                        <span className="text-xs font-bold uppercase tracking-[0.14em] text-slate-500">
                          Label EN
                        </span>
                        <input
                          value={metric.labelEn}
                          onChange={(event) =>
                            updateMetric(item.id, metricIndex, {
                              labelEn: event.target.value,
                            })
                          }
                          placeholder="Discussions"
                          className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-900 outline-none transition focus:border-blue-400 focus:ring-4 focus:ring-blue-100"
                        />
                      </label>

                      <label className="block">
                        <span className="text-xs font-bold uppercase tracking-[0.14em] text-slate-500">
                          Icon
                        </span>
                        <select
                          value={metric.icon}
                          onChange={(event) =>
                            updateMetric(item.id, metricIndex, {
                              icon: event.target.value as CaseStudyMetricIcon,
                            })
                          }
                          className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-900 outline-none transition focus:border-blue-400 focus:ring-4 focus:ring-blue-100"
                        >
                          {iconOptions.map((option) => (
                            <option key={option.value} value={option.value}>
                              {option.label}
                            </option>
                          ))}
                        </select>
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          ))}
        </div>
      </div>
    </main>
  );
}