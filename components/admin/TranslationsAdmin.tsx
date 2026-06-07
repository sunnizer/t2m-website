"use client";

import { useEffect, useMemo, useState } from "react";
import {
  ArrowLeft,
  Languages,
  Loader2,
  RefreshCw,
  Save,
  Search,
  WandSparkles,
} from "lucide-react";

type Locale = "vi" | "en";

type DictionaryTree = {
  [key: string]: string | DictionaryTree;
};

type DictionaryData = Record<Locale, DictionaryTree>;

type ScanStatus = "missingBoth" | "missingVi" | "missingEn" | "complete";

type ScanCandidate = {
  file: string;
  page: string;
  key: string;
  text: string;
  fallback: string;
  source: "tr" | "hardcoded";
  vi: string;
  en: string;
  hasVi: boolean;
  hasEn: boolean;
  status: ScanStatus;
};

type ScanResponse = {
  ok: boolean;
  count: number;
  summary: Record<ScanStatus, number>;
  candidates: ScanCandidate[];
  message?: string;
};

type TranslationRow = {
  key: string;
  vi: string;
  en: string;
};

const emptyDictionary: DictionaryData = {
  vi: {},
  en: {},
};

const pageOptions = [
  { value: "all", label: "Tất cả" },
  { value: "home", label: "Home" },
  { value: "services", label: "Services" },
  { value: "caseStudies", label: "Case Studies" },
  { value: "contact", label: "Contact" },
  { value: "nav", label: "Header / Nav" },
  { value: "footer", label: "Footer" },
  { value: "common", label: "Common" },
];

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

function getNestedValue(source: DictionaryTree, path: string) {
  const value = path.split(".").reduce<unknown>((current, part) => {
    if (isPlainObject(current) && part in current) {
      return current[part];
    }

    return undefined;
  }, source);

  return typeof value === "string" ? value : "";
}

function setNestedValue(
  source: DictionaryTree,
  path: string,
  value: string
): DictionaryTree {
  const parts = path.split(".").filter(Boolean);
  const next: DictionaryTree = { ...source };

  let current: DictionaryTree = next;

  parts.forEach((part, index) => {
    if (index === parts.length - 1) {
      current[part] = value;
      return;
    }

    const existing = current[part];

    if (isPlainObject(existing)) {
      current[part] = { ...existing } as DictionaryTree;
    } else {
      current[part] = {};
    }

    current = current[part] as DictionaryTree;
  });

  return next;
}

function flattenDictionary(
  tree: DictionaryTree,
  prefix = "",
  output: Record<string, string> = {}
) {
  Object.entries(tree).forEach(([key, value]) => {
    const nextKey = prefix ? `${prefix}.${key}` : key;

    if (typeof value === "string") {
      output[nextKey] = value;
    } else if (isPlainObject(value)) {
      flattenDictionary(value as DictionaryTree, nextKey, output);
    }
  });

  return output;
}

function getAllRows(data: DictionaryData): TranslationRow[] {
  const viFlat = flattenDictionary(data.vi);
  const enFlat = flattenDictionary(data.en);
  const keys = Array.from(
    new Set([...Object.keys(viFlat), ...Object.keys(enFlat)])
  ).sort((a, b) => a.localeCompare(b));

  return keys.map((key) => ({
    key,
    vi: viFlat[key] ?? "",
    en: enFlat[key] ?? "",
  }));
}

function statusLabel(status: ScanStatus) {
  switch (status) {
    case "missingBoth":
      return "Thiếu VI + EN";
    case "missingVi":
      return "Thiếu VI";
    case "missingEn":
      return "Thiếu EN";
    case "complete":
      return "Đủ";
    default:
      return status;
  }
}

function statusClass(status: ScanStatus) {
  switch (status) {
    case "missingBoth":
      return "bg-red-50 text-red-700 ring-red-100";
    case "missingVi":
      return "bg-orange-50 text-orange-700 ring-orange-100";
    case "missingEn":
      return "bg-yellow-50 text-yellow-700 ring-yellow-100";
    case "complete":
      return "bg-emerald-50 text-emerald-700 ring-emerald-100";
    default:
      return "bg-slate-50 text-slate-700 ring-slate-100";
  }
}

export default function TranslationsAdmin() {
  const [data, setData] = useState<DictionaryData>(emptyDictionary);
  const [scanData, setScanData] = useState<ScanCandidate[]>([]);
  const [loading, setLoading] = useState(true);
  const [scanning, setScanning] = useState(false);
  const [saving, setSaving] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedPage, setSelectedPage] = useState("all");
  const [includeHardcoded, setIncludeHardcoded] = useState(false);
  const [scanSummary, setScanSummary] =
    useState<Record<ScanStatus, number> | null>(null);

  const rows = useMemo(() => getAllRows(data), [data]);

  const filteredRows = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    if (!normalizedQuery) return rows;

    return rows.filter((row) => {
      return (
        row.key.toLowerCase().includes(normalizedQuery) ||
        row.vi.toLowerCase().includes(normalizedQuery) ||
        row.en.toLowerCase().includes(normalizedQuery)
      );
    });
  }, [query, rows]);

  const missingRows = useMemo(() => {
    return rows.filter((row) => !row.vi.trim() || !row.en.trim());
  }, [rows]);

  useEffect(() => {
    loadTranslations();
  }, []);

  async function loadTranslations() {
    setLoading(true);

    try {
      const response = await fetch("/api/admin/translations", {
        cache: "no-store",
      });

      const json = await response.json();

      if (!response.ok || !json?.ok) {
        throw new Error(json?.message || "Cannot load translations");
      }

      setData(json.data as DictionaryData);
    } catch {
      alert("Không tải được data/i18n.json. Anh kiểm tra lại API translations nhé.");
      setData(emptyDictionary);
    } finally {
      setLoading(false);
    }
  }

  async function scanTexts() {
    setScanning(true);

    try {
      const params = new URLSearchParams();
      params.set("page", selectedPage);

      if (includeHardcoded) {
        params.set("includeHardcoded", "1");
      }

      const response = await fetch(`/api/admin/scan-texts?${params.toString()}`, {
        cache: "no-store",
      });

      const json = (await response.json()) as ScanResponse;

      if (!response.ok || !json?.ok) {
        throw new Error(json?.message || "Cannot scan texts");
      }

      setScanData(json.candidates);
      setScanSummary(json.summary);
    } catch {
      alert("Không scan được text. Anh kiểm tra lại API scan-texts nhé.");
    } finally {
      setScanning(false);
    }
  }

  async function saveTranslations() {
    setSaving(true);

    try {
      const response = await fetch("/api/admin/translations", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const json = await response.json();

      if (!response.ok || !json?.ok) {
        throw new Error(json?.message || "Save failed");
      }

      alert(json.message || "Đã lưu data/i18n.json.");
    } catch {
      alert("Không lưu được translations. Trên Vercel sẽ bị khóa ghi file, chỉ sửa ở local.");
    } finally {
      setSaving(false);
    }
  }

  function updateTranslation(locale: Locale, key: string, value: string) {
    setData((current) => ({
      ...current,
      [locale]: setNestedValue(current[locale], key, value),
    }));
  }

  function applyScanItem(item: ScanCandidate) {
    setData((current) => {
      const nextVi = item.vi || item.fallback || item.text || "";
      const nextEn = item.en || "";

      return {
        vi: setNestedValue(current.vi, item.key, nextVi),
        en: setNestedValue(current.en, item.key, nextEn),
      };
    });
  }

  function applyAllMissingFromScan() {
    const missingItems = scanData.filter((item) => item.status !== "complete");

    if (!missingItems.length) {
      alert("Không có key thiếu để thêm.");
      return;
    }

    setData((current) => {
      let nextVi = current.vi;
      let nextEn = current.en;

      missingItems.forEach((item) => {
        if (!item.hasVi) {
          nextVi = setNestedValue(nextVi, item.key, item.fallback || item.text || "");
        }

        if (!item.hasEn) {
          nextEn = setNestedValue(nextEn, item.key, item.en || "");
        }
      });

      return {
        vi: nextVi,
        en: nextEn,
      };
    });

    alert(`Đã thêm ${missingItems.length} key thiếu vào bảng dịch.`);
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-slate-50 px-5 py-10">
        <div className="mx-auto max-w-7xl rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-sm">
          <p className="text-sm font-bold text-slate-600">
            Đang tải Admin Translations...
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 px-5 py-10 text-slate-950">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
            <div>
              <a
				  href="/admin"
				  className="mb-4 inline-flex items-center gap-2 text-sm font-bold text-blue-700 hover:text-blue-900"
				>
				  <ArrowLeft className="h-4 w-4" />
				  Quay lại Admin Dashboard
				</a>

              <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-blue-50 px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-blue-700">
                <Languages className="h-4 w-4" />
                Admin Local
              </div>

              <h1 className="text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">
                Quản lý Translations
              </h1>

              <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-600">
                Chỉnh song ngữ ở local, lưu vào <strong>data/i18n.json</strong>,
                sau đó commit lên Git để Vercel build lại. Trên Vercel API ghi
                file sẽ bị khóa.
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              <div className="rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4 text-sm font-bold text-slate-600">
                Tổng key:{" "}
                <span className="text-lg font-black text-blue-700">
                  {rows.length}
                </span>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4 text-sm font-bold text-slate-600">
                Thiếu dịch:{" "}
                <span className="text-lg font-black text-orange-600">
                  {missingRows.length}
                </span>
              </div>

              <button
                type="button"
                onClick={saveTranslations}
                disabled={saving}
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-slate-950 px-5 py-4 text-sm font-black text-white shadow-lg shadow-slate-950/15 transition hover:bg-blue-700 disabled:cursor-wait disabled:opacity-60"
              >
                <Save className="h-4 w-4" />
                {saving ? "Đang lưu..." : "Lưu translations"}
              </button>
            </div>
          </div>
        </div>

        <div className="mb-8 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="grid gap-4 xl:grid-cols-[1fr_auto_auto_auto] xl:items-end">
            <label className="block">
              <span className="text-xs font-bold uppercase tracking-[0.14em] text-slate-500">
                Tìm key / nội dung
              </span>
              <div className="mt-2 flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3">
                <Search className="h-4 w-4 text-slate-400" />
                <input
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Ví dụ: home.hero.title"
                  className="w-full bg-transparent text-sm font-semibold text-slate-900 outline-none"
                />
              </div>
            </label>

            <label className="block">
              <span className="text-xs font-bold uppercase tracking-[0.14em] text-slate-500">
                Scan page
              </span>
              <select
                value={selectedPage}
                onChange={(event) => setSelectedPage(event.target.value)}
                className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-900 outline-none transition focus:border-blue-400 focus:ring-4 focus:ring-blue-100 xl:w-48"
              >
                {pageOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </label>

            <label className="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-bold text-slate-700">
              <input
                type="checkbox"
                checked={includeHardcoded}
                onChange={(event) => setIncludeHardcoded(event.target.checked)}
              />
              Quét hardcoded text
            </label>

            <button
              type="button"
              onClick={scanTexts}
              disabled={scanning}
              className="inline-flex items-center justify-center gap-2 rounded-2xl bg-blue-600 px-5 py-4 text-sm font-black text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-500 disabled:cursor-wait disabled:opacity-60"
            >
              {scanning ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <RefreshCw className="h-4 w-4" />
              )}
              Scan text
            </button>
          </div>

          {scanSummary && (
            <div className="mt-5 grid gap-3 sm:grid-cols-4">
              {(["missingBoth", "missingVi", "missingEn", "complete"] as ScanStatus[]).map(
                (status) => (
                  <div
                    key={status}
                    className={[
                      "rounded-2xl px-4 py-3 text-sm font-bold ring-1",
                      statusClass(status),
                    ].join(" ")}
                  >
                    {statusLabel(status)}: {scanSummary[status] ?? 0}
                  </div>
                )
              )}
            </div>
          )}

          {scanData.length > 0 && (
            <div className="mt-5 overflow-hidden rounded-2xl border border-slate-200">
              <div className="flex flex-col gap-3 border-b border-slate-200 bg-slate-50 p-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h2 className="text-sm font-black text-slate-950">
                    Kết quả scan: {scanData.length} key
                  </h2>
                  <p className="mt-1 text-xs text-slate-500">
                    Bấm “Thêm key thiếu” để đưa key mới vào data/i18n.json rồi chỉnh EN.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={applyAllMissingFromScan}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-950 px-4 py-3 text-xs font-black text-white transition hover:bg-blue-700"
                >
                  <WandSparkles className="h-4 w-4" />
                  Thêm tất cả key thiếu
                </button>
              </div>

              <div className="max-h-[360px] overflow-auto">
                <table className="w-full min-w-[920px] text-left text-sm">
                  <thead className="sticky top-0 bg-white shadow-sm">
                    <tr className="border-b border-slate-200 text-xs uppercase tracking-[0.14em] text-slate-500">
                      <th className="px-4 py-3">Status</th>
                      <th className="px-4 py-3">Key</th>
                      <th className="px-4 py-3">Fallback</th>
                      <th className="px-4 py-3">File</th>
                      <th className="px-4 py-3">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {scanData.map((item) => (
                      <tr key={`${item.key}-${item.file}`} className="border-b border-slate-100">
                        <td className="px-4 py-3">
                          <span
                            className={[
                              "rounded-full px-3 py-1 text-xs font-bold ring-1",
                              statusClass(item.status),
                            ].join(" ")}
                          >
                            {statusLabel(item.status)}
                          </span>
                        </td>
                        <td className="px-4 py-3 font-mono text-xs font-bold text-slate-800">
                          {item.key}
                        </td>
                        <td className="px-4 py-3 text-slate-600">
                          {item.fallback}
                        </td>
                        <td className="px-4 py-3 text-xs text-slate-500">
                          {item.file}
                        </td>
                        <td className="px-4 py-3">
                          <button
                            type="button"
                            onClick={() => applyScanItem(item)}
                            className="rounded-lg bg-blue-50 px-3 py-2 text-xs font-bold text-blue-700 transition hover:bg-blue-100"
                          >
                            Thêm / cập nhật
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>

        <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
          <div className="grid min-w-[960px] grid-cols-[280px_1fr_1fr] border-b border-slate-200 bg-slate-50 px-5 py-4 text-xs font-black uppercase tracking-[0.14em] text-slate-500">
            <div>Key</div>
            <div>Tiếng Việt</div>
            <div>English</div>
          </div>

          <div className="overflow-auto">
            <div className="min-w-[960px] divide-y divide-slate-100">
              {filteredRows.map((row) => (
                <div
                  key={row.key}
                  className="grid grid-cols-[280px_1fr_1fr] gap-4 px-5 py-4"
                >
                  <div className="break-all rounded-2xl bg-slate-50 p-3 font-mono text-xs font-bold leading-6 text-slate-700">
                    {row.key}
                  </div>

                  <textarea
                    value={row.vi}
                    onChange={(event) =>
                      updateTranslation("vi", row.key, event.target.value)
                    }
                    rows={3}
                    className="w-full resize-y rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm leading-6 text-slate-900 outline-none transition focus:border-blue-400 focus:ring-4 focus:ring-blue-100"
                  />

                  <textarea
                    value={row.en}
                    onChange={(event) =>
                      updateTranslation("en", row.key, event.target.value)
                    }
                    rows={3}
                    className="w-full resize-y rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm leading-6 text-slate-900 outline-none transition focus:border-blue-400 focus:ring-4 focus:ring-blue-100"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}