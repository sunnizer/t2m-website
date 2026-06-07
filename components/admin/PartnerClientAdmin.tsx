"use client";

import { useEffect, useMemo, useState } from "react";
import {
  defaultPartnerClientData,
  type PartnerClientData,
  type PartnerClientLogo,
  type PartnerClientLogoSize,
} from "@/lib/partnerClientData";
import {
  ArrowDown,
  ArrowLeft,
  ArrowUp,
  ImagePlus,
  Plus,
  Save,
  Trash2,
} from "lucide-react";

type GroupKey = "clients" | "partners";

const groupLabels: Record<GroupKey, string> = {
  clients: "Khách hàng",
  partners: "Đối tác",
};

const logoSizeOptions: {
  value: PartnerClientLogoSize;
  label: string;
  description: string;
}[] = [
  {
    value: "small",
    label: "Small",
    description: "Logo nhỏ, icon, chữ ngắn",
  },
  {
    value: "medium",
    label: "Medium",
    description: "Kích thước mặc định",
  },
  {
    value: "large",
    label: "Large",
    description: "Logo cần nổi bật hơn",
  },
  {
    value: "wide",
    label: "Wide",
    description: "Logo ngang, chữ dài",
  },
];

function createId(name: string) {
  const base =
    name
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/-+/g, "-")
      .replace(/^-|-$/g, "") || "logo";

  const suffix =
    typeof crypto !== "undefined" && "randomUUID" in crypto
      ? crypto.randomUUID().slice(0, 8)
      : String(Date.now()).slice(-8);

  return `${base}-${suffix}`;
}

function createEmptyLogo(): PartnerClientLogo {
  return {
    id: createId("logo"),
    name: "",
    shortName: "",
    image: "",
    className: "",
    size: "medium",
  };
}

export default function PartnerClientAdmin() {
  const [data, setData] = useState<PartnerClientData>(
    defaultPartnerClientData
  );
  const [files, setFiles] = useState<Record<string, File>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const totalLogos = useMemo(() => {
    return data.clients.length + data.partners.length;
  }, [data.clients.length, data.partners.length]);

  useEffect(() => {
    async function loadData() {
      try {
        const response = await fetch("/api/admin/partner-client", {
          cache: "no-store",
        });

        const json = await response.json();

        if (!response.ok || !json?.ok) {
          throw new Error("Cannot load partner client data");
        }

        setData(json.data as PartnerClientData);
      } catch {
        setData(defaultPartnerClientData);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  function updateItem(
    group: GroupKey,
    id: string,
    patch: Partial<PartnerClientLogo>
  ) {
    setData((current) => ({
      ...current,
      [group]: current[group].map((item) =>
        item.id === id ? { ...item, ...patch } : item
      ),
    }));
  }

  function addItem(group: GroupKey) {
    setData((current) => ({
      ...current,
      [group]: [...current[group], createEmptyLogo()],
    }));
  }

  function removeItem(group: GroupKey, id: string) {
    setData((current) => ({
      ...current,
      [group]: current[group].filter((item) => item.id !== id),
    }));

    setFiles((current) => {
      const next = { ...current };
      delete next[`logo_${group}_${id}`];
      return next;
    });
  }

  function moveItem(group: GroupKey, id: string, direction: "up" | "down") {
    setData((current) => {
      const list = [...current[group]];
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
        [group]: list,
      };
    });
  }

  function handleFileChange(group: GroupKey, id: string, file?: File) {
    if (!file) return;

    setFiles((current) => ({
      ...current,
      [`logo_${group}_${id}`]: file,
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

      const response = await fetch("/api/admin/partner-client", {
        method: "PUT",
        body: formData,
      });

      const json = await response.json();

      if (!response.ok || !json?.ok) {
        throw new Error(json?.message || "Save failed");
      }

      setData(json.data as PartnerClientData);
      setFiles({});
      alert(json.message || "Đã lưu dữ liệu Partner & Client.");
    } catch {
      alert("Không lưu được dữ liệu. Anh kiểm tra lại local server nhé.");
    } finally {
      setSaving(false);
    }
  }

  function renderLogoPreview(group: GroupKey, item: PartnerClientLogo) {
    const file = files[`logo_${group}_${item.id}`];
    const previewUrl = file ? URL.createObjectURL(file) : item.image;

    if (previewUrl) {
      return (
        <div className="flex h-24 w-40 items-center justify-center rounded-xl border border-slate-200 bg-white p-4">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={previewUrl}
            alt={item.name || "Logo preview"}
            className="max-h-full max-w-full object-contain grayscale"
          />
        </div>
      );
    }

    return (
      <div className="flex h-24 w-40 items-center justify-center rounded-xl border border-dashed border-slate-300 bg-slate-50 px-3 text-center text-xs font-bold text-slate-400">
        Chưa có ảnh
      </div>
    );
  }

  function renderGroup(group: GroupKey) {
    return (
      <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-xl font-black text-slate-950">
              {groupLabels[group]}
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              {data[group].length} logo đang hiển thị
            </p>
          </div>

          <button
            type="button"
            onClick={() => addItem(group)}
            className="inline-flex items-center justify-center gap-2 rounded-2xl bg-blue-600 px-4 py-3 text-sm font-bold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-500"
          >
            <Plus className="h-4 w-4" />
            Thêm logo
          </button>
        </div>

        <div className="space-y-4">
          {data[group].map((item, index) => (
            <div
              key={item.id}
              className="grid gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-4 xl:grid-cols-[auto_1fr_auto]"
            >
              <div>{renderLogoPreview(group, item)}</div>

              <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
                <label className="block">
                  <span className="text-xs font-bold uppercase tracking-[0.14em] text-slate-500">
                    Tên đầy đủ
                  </span>
                  <input
                    value={item.name}
                    onChange={(event) =>
                      updateItem(group, item.id, {
                        name: event.target.value,
                      })
                    }
                    placeholder="Ví dụ: VinFast"
                    className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-900 outline-none transition focus:border-blue-400 focus:ring-4 focus:ring-blue-100"
                  />
                </label>

                <label className="block">
                  <span className="text-xs font-bold uppercase tracking-[0.14em] text-slate-500">
                    Tên hiển thị khi chưa có ảnh
                  </span>
                  <input
                    value={item.shortName ?? ""}
                    onChange={(event) =>
                      updateItem(group, item.id, {
                        shortName: event.target.value,
                      })
                    }
                    placeholder="Ví dụ: VINFAST"
                    className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-900 outline-none transition focus:border-blue-400 focus:ring-4 focus:ring-blue-100"
                  />
                </label>

                <label className="block">
                  <span className="text-xs font-bold uppercase tracking-[0.14em] text-slate-500">
                    Size logo
                  </span>
                  <select
                    value={item.size ?? "medium"}
                    onChange={(event) =>
                      updateItem(group, item.id, {
                        size: event.target.value as PartnerClientLogoSize,
                      })
                    }
                    className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-900 outline-none transition focus:border-blue-400 focus:ring-4 focus:ring-blue-100"
                  >
                    {logoSizeOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label} — {option.description}
                      </option>
                    ))}
                  </select>
                </label>

                <label className="block">
                  <span className="text-xs font-bold uppercase tracking-[0.14em] text-slate-500">
                    Upload logo
                  </span>
                  <div className="mt-2 flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3">
                    <ImagePlus className="h-4 w-4 text-blue-600" />
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(event) =>
                        handleFileChange(
                          group,
                          item.id,
                          event.target.files?.[0]
                        )
                      }
                      className="text-sm"
                    />
                  </div>
                </label>

                <label className="block md:col-span-2">
                  <span className="text-xs font-bold uppercase tracking-[0.14em] text-slate-500">
                    Tailwind class tuỳ chọn
                  </span>
                  <input
                    value={item.className ?? ""}
                    onChange={(event) =>
                      updateItem(group, item.id, {
                        className: event.target.value,
                      })
                    }
                    placeholder="Ví dụ: tracking-[0.12em] font-serif italic"
                    className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-900 outline-none transition focus:border-blue-400 focus:ring-4 focus:ring-blue-100"
                  />
                </label>
              </div>

              <div className="flex items-center gap-2 xl:flex-col">
                <button
                  type="button"
                  onClick={() => moveItem(group, item.id, "up")}
                  disabled={index === 0}
                  className="rounded-xl border border-slate-200 bg-white p-3 text-slate-600 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-30"
                  title="Đưa lên"
                >
                  <ArrowUp className="h-4 w-4" />
                </button>

                <button
                  type="button"
                  onClick={() => moveItem(group, item.id, "down")}
                  disabled={index === data[group].length - 1}
                  className="rounded-xl border border-slate-200 bg-white p-3 text-slate-600 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-30"
                  title="Đưa xuống"
                >
                  <ArrowDown className="h-4 w-4" />
                </button>

                <button
                  type="button"
                  onClick={() => removeItem(group, item.id)}
                  className="rounded-xl border border-red-100 bg-red-50 p-3 text-red-600 transition hover:bg-red-100"
                  title="Xoá"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-slate-50 px-5 py-10">
        <div className="mx-auto max-w-7xl rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-sm">
          <p className="text-sm font-bold text-slate-600">
            Đang tải Admin Partner & Client...
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
                Quản lý Partner & Client
              </h1>

              <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-600">
                Logo đẹp nhất khi upload dạng PNG/WebP nền trong suốt, đặt trong
                canvas 320×160px hoặc 400×200px, logo căn giữa và có padding đều.
                Sau đó dùng mục <strong>Size logo</strong> để tinh chỉnh hiển thị.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <div className="rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4 text-sm font-bold text-slate-600">
                Tổng:{" "}
                <span className="text-lg font-black text-blue-700">
                  {totalLogos}
                </span>{" "}
                logo
              </div>

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
          {renderGroup("clients")}
          {renderGroup("partners")}
        </div>
      </div>
    </main>
  );
}