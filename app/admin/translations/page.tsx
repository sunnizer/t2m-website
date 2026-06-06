"use client";

import { useEffect, useMemo, useState } from "react";

type TranslationData = {
  vi: Record<string, any>;
  en: Record<string, any>;
};

type Row = {
  key: string;
  vi: string;
  en: string;
};

type ScanCandidate = {
  file: string;
  page: string;
  key: string;
  text: string;
};

function flattenObject(
  obj: Record<string, any>,
  prefix = ""
): Record<string, string> {
  return Object.keys(obj).reduce((acc, key) => {
    const value = obj[key];
    const nextKey = prefix ? `${prefix}.${key}` : key;

    if (value && typeof value === "object" && !Array.isArray(value)) {
      Object.assign(acc, flattenObject(value, nextKey));
    } else {
      acc[nextKey] = String(value ?? "");
    }

    return acc;
  }, {} as Record<string, string>);
}

function setNestedValue(obj: Record<string, any>, path: string, value: string) {
  const keys = path.split(".");
  let current = obj;

  keys.forEach((key, index) => {
    if (index === keys.length - 1) {
      current[key] = value;
      return;
    }

    if (!current[key]) {
      current[key] = {};
    }

    current = current[key];
  });
}

function unflattenRows(rows: Row[]): TranslationData {
  const result: TranslationData = {
    vi: {},
    en: {},
  };

  rows.forEach((row) => {
    setNestedValue(result.vi, row.key, row.vi);
    setNestedValue(result.en, row.key, row.en);
  });

  return result;
}

export default function AdminTranslationsPage() {
  const [rows, setRows] = useState<Row[]>([]);
  const [editable, setEditable] = useState(false);
  const [apiLoaded, setApiLoaded] = useState(false);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [message, setMessage] = useState("");

  const [newKey, setNewKey] = useState("");
  const [newVi, setNewVi] = useState("");
  const [newEn, setNewEn] = useState("");

  const [scanPage, setScanPage] = useState("all");
  const [scanLoading, setScanLoading] = useState(false);
  const [scanCandidates, setScanCandidates] = useState<ScanCandidate[]>([]);

  useEffect(() => {
    async function loadTranslations() {
      try {
        const res = await fetch("/api/admin/translations");
        const json = await res.json();

        if (!json.ok) {
          setMessage(json.message || "Không tải được dữ liệu.");
          return;
        }

        const viFlat = flattenObject(json.data.vi);
        const enFlat = flattenObject(json.data.en);

        const keys = Array.from(
          new Set([...Object.keys(viFlat), ...Object.keys(enFlat)])
        ).sort();

        const nextRows = keys.map((key) => ({
          key,
          vi: viFlat[key] || "",
          en: enFlat[key] || "",
        }));

        setRows(nextRows);
        setEditable(Boolean(json.editable));
        setApiLoaded(true);
      } catch (error) {
        setMessage("Không kết nối được API translations.");
      } finally {
        setLoading(false);
      }
    }

    loadTranslations();
  }, []);

  const groupedRows = useMemo(() => {
    return rows.reduce((acc, row) => {
      const group = row.key.split(".")[0];

      if (!acc[group]) {
        acc[group] = [];
      }

      acc[group].push(row);
      return acc;
    }, {} as Record<string, Row[]>);
  }, [rows]);

  function updateRow(indexKey: string, field: "vi" | "en", value: string) {
    setRows((current) =>
      current.map((row) =>
        row.key === indexKey
          ? {
              ...row,
              [field]: value,
            }
          : row
      )
    );
  }

  function addNewRow() {
    const key = newKey.trim();

    if (!key) {
      setMessage("Anh cần nhập key, ví dụ: home.hero.title.");
      return;
    }

    if (!key.includes(".")) {
      setMessage(
        "Key nên có dạng group.name, ví dụ: home.hero.title hoặc footer.description."
      );
      return;
    }

    const existed = rows.some((row) => row.key === key);

    if (existed) {
      setMessage("Key này đã tồn tại rồi.");
      return;
    }

    setRows((current) =>
      [
        ...current,
        {
          key,
          vi: newVi,
          en: newEn,
        },
      ].sort((a, b) => a.key.localeCompare(b.key))
    );

    setNewKey("");
    setNewVi("");
    setNewEn("");
    setMessage("Đã thêm key mới. Anh nhớ bấm Lưu thay đổi để ghi vào file.");
  }

  function deleteRow(key: string) {
    const confirmed = window.confirm(`Anh có chắc muốn xóa key "${key}" không?`);

    if (!confirmed) return;

    setRows((current) => current.filter((row) => row.key !== key));
    setMessage("Đã xóa key. Anh nhớ bấm Lưu thay đổi để ghi vào file.");
  }

  async function saveTranslations() {
    setSaving(true);
    setMessage("");

    try {
      const data = unflattenRows(rows);

      const res = await fetch("/api/admin/translations", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const json = await res.json();

      if (!json.ok) {
        setMessage(json.message || "Lưu thất bại.");
        return;
      }

      setMessage("Đã lưu thành công. Anh refresh lại website local để kiểm tra.");
    } catch (error) {
      setMessage("Có lỗi khi lưu dữ liệu.");
    } finally {
      setSaving(false);
    }
  }

  async function scanTexts() {
    setScanLoading(true);
    setMessage("");

    try {
      const res = await fetch(`/api/admin/scan-texts?page=${scanPage}`);
      const json = await res.json();

      if (!json.ok) {
        setMessage(json.message || "Không quét được nội dung.");
        return;
      }

      const existingKeys = new Set(rows.map((row) => row.key));

      const filteredCandidates = json.candidates.filter(
        (item: ScanCandidate) => !existingKeys.has(item.key)
      );

      setScanCandidates(filteredCandidates);

      setMessage(
        `Đã quét được ${json.count} nội dung. Còn ${filteredCandidates.length} nội dung chưa có trong translations.`
      );
    } catch (error) {
      setMessage("Có lỗi khi quét nội dung.");
    } finally {
      setScanLoading(false);
    }
  }

  function updateScanCandidateKey(candidate: ScanCandidate, nextKey: string) {
    setScanCandidates((current) =>
      current.map((item) =>
        item === candidate
          ? {
              ...item,
              key: nextKey,
            }
          : item
      )
    );
  }

  function addScanCandidate(candidate: ScanCandidate) {
    const key = candidate.key.trim();

    if (!key) {
      setMessage("Key không được để trống.");
      return;
    }

    if (!key.includes(".")) {
      setMessage("Key nên có dạng group.name, ví dụ: home.hero.title.");
      return;
    }

    const existed = rows.some((row) => row.key === key);

    if (existed) {
      setMessage("Key này đã tồn tại.");
      return;
    }

    setRows((current) =>
      [
        ...current,
        {
          key,
          vi: candidate.text,
          en: "",
        },
      ].sort((a, b) => a.key.localeCompare(b.key))
    );

    setScanCandidates((current) =>
      current.filter((item) => item !== candidate)
    );

    setMessage("Đã thêm nội dung vào danh sách. Anh nhớ bấm Lưu thay đổi.");
  }

  function addAllScanCandidates() {
    if (scanCandidates.length === 0) {
      setMessage("Không có nội dung quét nào để thêm.");
      return;
    }

    const existingKeys = new Set(rows.map((row) => row.key));

    const newRows = scanCandidates
      .filter((candidate) => candidate.key.trim() && !existingKeys.has(candidate.key))
      .map((candidate) => ({
        key: candidate.key.trim(),
        vi: candidate.text,
        en: "",
      }));

    if (newRows.length === 0) {
      setMessage("Các key quét được đều đã tồn tại hoặc không hợp lệ.");
      return;
    }

    setRows((current) =>
      [...current, ...newRows].sort((a, b) => a.key.localeCompare(b.key))
    );

    setScanCandidates([]);
    setMessage(
      `Đã thêm ${newRows.length} nội dung vào danh sách. Anh nhớ bấm Lưu thay đổi.`
    );
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-slate-50 px-6 py-10 text-slate-950">
        <div className="mx-auto max-w-6xl">Đang tải dữ liệu song ngữ...</div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 px-6 py-10 text-slate-950">
      {/* Floating save bar */}
      <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 rounded-full border border-slate-200 bg-white/90 p-2 shadow-2xl shadow-slate-900/15 backdrop-blur-xl">
        <button
          type="button"
          onClick={saveTranslations}
          disabled={!editable || saving}
          className="rounded-full bg-blue-600 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-blue-600/25 transition hover:-translate-y-0.5 hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-slate-300 disabled:shadow-none"
        >
          {saving ? "Đang lưu..." : "Lưu thay đổi"}
        </button>

        <a
          href="/"
          className="rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-bold text-slate-700 transition hover:border-blue-300 hover:text-blue-600"
        >
          Xem web
        </a>
      </div>

      <div className="mx-auto max-w-6xl">
        {/* Header card */}
        <div className="mb-8 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="mb-2 text-sm font-bold uppercase tracking-[0.2em] text-blue-600">
            T2M Local Admin
          </p>

          <h1 className="text-3xl font-bold tracking-tight">
            Quản lý nội dung VI / EN
          </h1>

          <p className="mt-3 max-w-3xl text-slate-600">
            Trang này dùng để sửa text song ngữ trên local. Khi deploy lên
            Vercel, chức năng lưu sẽ bị khóa để tránh lỗi ghi file.
          </p>

          {apiLoaded && !editable && (
            <div className="mt-5 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm font-semibold text-amber-800">
              Đang ở môi trường production. Anh chỉ xem được nội dung, không
              thể lưu.
            </div>
          )}

          {message && (
            <div className="mt-5 rounded-2xl border border-blue-200 bg-blue-50 px-4 py-3 text-sm font-semibold text-blue-700">
              {message}
            </div>
          )}

          <div className="mt-6 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={saveTranslations}
              disabled={!editable || saving}
              className="rounded-full bg-blue-600 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-slate-300 disabled:shadow-none"
            >
              {saving ? "Đang lưu..." : "Lưu thay đổi"}
            </button>

            <a
              href="/"
              className="rounded-full border border-slate-200 bg-white px-6 py-3 text-sm font-bold text-slate-700 transition hover:border-blue-300 hover:text-blue-600"
            >
              Xem trang chủ
            </a>
          </div>
        </div>

        {/* Scan website text */}
        <div className="mb-8 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="mb-2 text-sm font-bold uppercase tracking-[0.2em] text-blue-600">
            Quét nội dung website
          </p>

          <h2 className="text-2xl font-bold tracking-tight">
            Tự bắt text đang có trong source
          </h2>

          <p className="mt-2 text-sm leading-6 text-slate-600">
            Module này quét các file <span className="font-mono">.tsx</span>{" "}
            trong <span className="font-mono">app</span> và{" "}
            <span className="font-mono">components</span>, tìm text đang viết
            cứng rồi gợi ý key để thêm vào translations. Chỉ chạy ở local.
          </p>

          <div className="mt-5 flex flex-col gap-3 sm:flex-row">
            <select
              value={scanPage}
              onChange={(event) => setScanPage(event.target.value)}
              disabled={!editable || scanLoading}
              className="h-12 rounded-2xl border border-slate-200 bg-white px-4 text-sm font-bold text-slate-700 outline-none transition focus:border-blue-400 focus:ring-4 focus:ring-blue-100 disabled:bg-slate-50"
            >
              <option value="all">Tất cả</option>
              <option value="home">Home</option>
              <option value="services">Services</option>
              <option value="caseStudies">Case Studies</option>
              <option value="contact">Contact</option>
              <option value="insights">Insights</option>
              <option value="nav">Navigation</option>
              <option value="footer">Footer</option>
              <option value="common">Common</option>
            </select>

            <button
              type="button"
              onClick={scanTexts}
              disabled={!editable || scanLoading}
              className="h-12 rounded-full bg-slate-950 px-6 text-sm font-bold text-white transition hover:bg-blue-600 disabled:cursor-not-allowed disabled:bg-slate-300"
            >
              {scanLoading ? "Đang quét..." : "Quét nội dung"}
            </button>

            <button
              type="button"
              onClick={addAllScanCandidates}
              disabled={!editable || scanCandidates.length === 0}
              className="h-12 rounded-full border border-blue-200 bg-blue-50 px-6 text-sm font-bold text-blue-700 transition hover:border-blue-300 hover:bg-blue-100 disabled:cursor-not-allowed disabled:border-slate-200 disabled:bg-slate-50 disabled:text-slate-300"
            >
              Thêm tất cả
            </button>
          </div>

          {scanCandidates.length > 0 && (
            <div className="mt-6 overflow-hidden rounded-3xl border border-slate-200">
              <div className="grid bg-slate-50 px-4 py-3 text-xs font-bold uppercase tracking-[0.16em] text-slate-400 lg:grid-cols-[120px_260px_1fr_110px]">
                <div>Page</div>
                <div>Key gợi ý</div>
                <div>Nội dung bắt được</div>
                <div></div>
              </div>

              <div className="divide-y divide-slate-100">
                {scanCandidates.map((candidate) => (
                  <div
                    key={`${candidate.file}-${candidate.key}-${candidate.text}`}
                    className="grid gap-3 px-4 py-4 lg:grid-cols-[120px_260px_1fr_110px]"
                  >
                    <div className="text-sm font-bold text-blue-600">
                      {candidate.page}
                    </div>

                    <input
                      value={candidate.key}
                      onChange={(event) =>
                        updateScanCandidateKey(candidate, event.target.value)
                      }
                      className="rounded-xl border border-slate-200 px-3 py-2 font-mono text-xs outline-none focus:border-blue-400 focus:ring-4 focus:ring-blue-100"
                    />

                    <div>
                      <p className="text-sm leading-6 text-slate-700">
                        {candidate.text}
                      </p>
                      <p className="mt-1 font-mono text-xs text-slate-400">
                        {candidate.file}
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => addScanCandidate(candidate)}
                      className="h-10 rounded-full bg-blue-600 px-4 text-xs font-bold text-white transition hover:bg-blue-700"
                    >
                      Thêm
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Add new key */}
        <div className="mb-8 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="mb-2 text-sm font-bold uppercase tracking-[0.2em] text-blue-600">
            Thêm nội dung mới
          </p>

          <h2 className="text-2xl font-bold tracking-tight">
            Tạo key VI / EN mới
          </h2>

          <p className="mt-2 text-sm leading-6 text-slate-600">
            Dùng khi anh muốn thêm nội dung cho section mới hoặc page mới. Key
            nên đặt rõ ràng, ví dụ:{" "}
            <span className="font-mono font-bold">services.hero.title</span>,{" "}
            <span className="font-mono font-bold">footer.description</span>,{" "}
            <span className="font-mono font-bold">contact.hero.subtitle</span>.
          </p>

          <div className="mt-5 grid gap-4 lg:grid-cols-[260px_1fr_1fr_auto]">
            <div>
              <label className="mb-2 block text-xs font-bold uppercase tracking-[0.16em] text-slate-400">
                Key
              </label>
              <input
                value={newKey}
                onChange={(event) => setNewKey(event.target.value)}
                placeholder="vd: services.hero.title"
                disabled={!editable}
                className="h-12 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm font-semibold outline-none transition focus:border-blue-400 focus:ring-4 focus:ring-blue-100 disabled:bg-slate-50"
              />
            </div>

            <div>
              <label className="mb-2 block text-xs font-bold uppercase tracking-[0.16em] text-slate-400">
                Tiếng Việt
              </label>
              <input
                value={newVi}
                onChange={(event) => setNewVi(event.target.value)}
                placeholder="Nội dung tiếng Việt"
                disabled={!editable}
                className="h-12 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm outline-none transition focus:border-blue-400 focus:ring-4 focus:ring-blue-100 disabled:bg-slate-50"
              />
            </div>

            <div>
              <label className="mb-2 block text-xs font-bold uppercase tracking-[0.16em] text-slate-400">
                English
              </label>
              <input
                value={newEn}
                onChange={(event) => setNewEn(event.target.value)}
                placeholder="English content"
                disabled={!editable}
                className="h-12 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm outline-none transition focus:border-blue-400 focus:ring-4 focus:ring-blue-100 disabled:bg-slate-50"
              />
            </div>

            <div className="flex items-end">
              <button
                type="button"
                onClick={addNewRow}
                disabled={!editable}
                className="h-12 rounded-full bg-slate-950 px-6 text-sm font-bold text-white transition hover:bg-blue-600 disabled:cursor-not-allowed disabled:bg-slate-300"
              >
                Thêm key
              </button>
            </div>
          </div>
        </div>

        {/* Current translation rows */}
        <div className="space-y-8 pb-28">
          {Object.entries(groupedRows).map(([group, groupRows]) => (
            <section
              key={group}
              className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm"
            >
              <div className="border-b border-slate-200 bg-slate-50 px-6 py-4">
                <h2 className="text-xl font-bold capitalize">{group}</h2>
              </div>

              <div className="divide-y divide-slate-100">
                {groupRows.map((row) => (
                  <div
                    key={row.key}
                    className="grid gap-4 px-6 py-5 lg:grid-cols-[220px_1fr_1fr_80px]"
                  >
                    <div>
                      <p className="font-mono text-sm font-bold text-slate-700">
                        {row.key}
                      </p>
                    </div>

                    <div>
                      <label className="mb-2 block text-xs font-bold uppercase tracking-[0.16em] text-slate-400">
                        Tiếng Việt
                      </label>
                      <textarea
                        value={row.vi}
                        onChange={(event) =>
                          updateRow(row.key, "vi", event.target.value)
                        }
                        disabled={!editable}
                        rows={row.vi.length > 80 ? 4 : 2}
                        className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm leading-6 outline-none transition focus:border-blue-400 focus:ring-4 focus:ring-blue-100 disabled:bg-slate-50"
                      />
                    </div>

                    <div>
                      <label className="mb-2 block text-xs font-bold uppercase tracking-[0.16em] text-slate-400">
                        English
                      </label>
                      <textarea
                        value={row.en}
                        onChange={(event) =>
                          updateRow(row.key, "en", event.target.value)
                        }
                        disabled={!editable}
                        rows={row.en.length > 80 ? 4 : 2}
                        className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm leading-6 outline-none transition focus:border-blue-400 focus:ring-4 focus:ring-blue-100 disabled:bg-slate-50"
                      />
                    </div>

                    <div className="flex items-end">
                      <button
                        type="button"
                        onClick={() => deleteRow(row.key)}
                        disabled={!editable}
                        className="h-11 rounded-full border border-red-100 bg-red-50 px-4 text-xs font-bold text-red-600 transition hover:border-red-200 hover:bg-red-100 disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-300"
                      >
                        Xóa
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </main>
  );
}