"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import Wave from "./Wave";
import CarteNav, { type NavCategory } from "./CarteNav";
import type { Category, CategoryLayout, Menu, MenuItem } from "@/lib/menu/types";
import { chromeFor, DEFAULT_ITEMS_CLASS, DEFAULT_COLUMNS_CLASS, DEFAULT_HIGHLIGHT_GRADIENT } from "@/lib/menu/chrome";
import {
  saveMenuAction,
  uploadPhotoAction,
  deletePhotosAction,
} from "@/app/(site)/restauration/actions";
import { logout } from "@/app/admin/auth-actions";

const BALOO = "var(--font-baloo)";
const NUNITO = "var(--font-nunito)";

/* ─────────────── mutation helpers (operate on a cloned draft) ─────────────── */
const findCat = (m: Menu, id: string) => m.categories.find((c) => c.id === id);
function listOf(cat: Category, colId?: string): MenuItem[] {
  if (colId) return cat.columns!.find((c) => c.id === colId)!.items;
  if (!cat.items) cat.items = [];
  return cat.items;
}
function move<T>(arr: T[], i: number, dir: -1 | 1) {
  const j = i + dir;
  if (i < 0 || j < 0 || j >= arr.length) return;
  [arr[i], arr[j]] = [arr[j], arr[i]];
}
const uid = () => (crypto.randomUUID ? crypto.randomUUID() : String(Math.random()).slice(2));

type SaveStatus = "idle" | "pending" | "saving" | "saved" | "error";

/* ─────────────────────────── main component ─────────────────────────── */
export default function EditableMenu({ menu: initial, editable }: { menu: Menu; editable: boolean }) {
  const [menu, setMenu] = useState<Menu>(initial);
  const [editing, setEditing] = useState(false);
  const [status, setStatus] = useState<SaveStatus>("idle");
  const [uploading, setUploading] = useState<Record<string, boolean>>({});

  // Debounced auto-save whenever the menu changes (skipping the first render).
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const first = useRef(true);
  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    setStatus("pending");
    if (timer.current) clearTimeout(timer.current);
    const snapshot = menu;
    timer.current = setTimeout(async () => {
      setStatus("saving");
      try {
        await saveMenuAction(snapshot);
        setStatus("saved");
      } catch {
        setStatus("error");
      }
    }, 700);
  }, [menu]);

  const patch = useCallback((fn: (m: Menu) => void) => {
    setMenu((prev) => {
      const next = structuredClone(prev);
      fn(next);
      return next;
    });
  }, []);

  /* ── photo handlers ── */
  const pickPhoto = useCallback(
    async (catId: string, colId: string | undefined, itemId: string, file: File, oldUrl?: string) => {
      const key = `${catId}|${colId ?? ""}|${itemId}`;
      setUploading((u) => ({ ...u, [key]: true }));
      try {
        const fd = new FormData();
        fd.set("photo", file);
        if (oldUrl) fd.set("oldUrl", oldUrl);
        const url = await uploadPhotoAction(fd);
        patch((m) => {
          const it = listOf(findCat(m, catId)!, colId).find((i) => i.id === itemId);
          if (it) it.image = url;
        });
      } finally {
        setUploading((u) => ({ ...u, [key]: false }));
      }
    },
    [patch],
  );

  const removePhoto = useCallback(
    (catId: string, colId: string | undefined, itemId: string, url?: string) => {
      patch((m) => {
        const it = listOf(findCat(m, catId)!, colId).find((i) => i.id === itemId);
        if (it) delete it.image;
      });
      if (url) deletePhotosAction([url]);
    },
    [patch],
  );

  // A column's own header photo (Category.columns[].image), not one of its items.
  const pickColumnPhoto = useCallback(
    async (catId: string, colId: string, file: File, oldUrl?: string) => {
      const key = `${catId}|columns|${colId}`;
      setUploading((u) => ({ ...u, [key]: true }));
      try {
        const fd = new FormData();
        fd.set("photo", file);
        if (oldUrl) fd.set("oldUrl", oldUrl);
        const url = await uploadPhotoAction(fd);
        patch((m) => {
          const col = findCat(m, catId)!.columns!.find((c) => c.id === colId);
          if (col) col.image = url;
        });
      } finally {
        setUploading((u) => ({ ...u, [key]: false }));
      }
    },
    [patch],
  );

  const removeColumnPhoto = useCallback(
    (catId: string, colId: string, url?: string) => {
      patch((m) => {
        const col = findCat(m, catId)!.columns!.find((c) => c.id === colId);
        if (col) delete col.image;
      });
      if (url) deletePhotosAction([url]);
    },
    [patch],
  );

  // Promo banner photo (Category.highlight).
  const pickHighlightPhoto = useCallback(
    async (catId: string, file: File, oldUrl?: string) => {
      const key = `${catId}|highlight`;
      setUploading((u) => ({ ...u, [key]: true }));
      try {
        const fd = new FormData();
        fd.set("photo", file);
        if (oldUrl) fd.set("oldUrl", oldUrl);
        const url = await uploadPhotoAction(fd);
        patch((m) => {
          const cat = findCat(m, catId)!;
          if (cat.highlight) cat.highlight.image = url;
        });
      } finally {
        setUploading((u) => ({ ...u, [key]: false }));
      }
    },
    [patch],
  );

  const removeHighlightPhoto = useCallback(
    (catId: string, url?: string) => {
      patch((m) => {
        const cat = findCat(m, catId)!;
        if (cat.highlight) delete cat.highlight.image;
      });
      if (url) deletePhotosAction([url]);
    },
    [patch],
  );

  const nav: NavCategory[] = [
    ...menu.categories.map((c) => ({ id: c.id, label: c.label || "…", emoji: c.emoji })),
    { id: "evenements", label: "Fêtes", emoji: "🎉" },
  ];

  return (
    <>
      <EditableStyles />
      <CarteNav categories={nav} />

      {menu.categories.map((cat, i) => (
        <CategorySection
          key={cat.id}
          category={cat}
          index={i}
          total={menu.categories.length}
          editing={editing}
          uploading={uploading}
          patch={patch}
          pickPhoto={pickPhoto}
          removePhoto={removePhoto}
          pickColumnPhoto={pickColumnPhoto}
          removeColumnPhoto={removeColumnPhoto}
          pickHighlightPhoto={pickHighlightPhoto}
          removeHighlightPhoto={removeHighlightPhoto}
        />
      ))}

      {editing && <AddCategory patch={patch} />}

      {editable && (
        <EditToolbar
          editing={editing}
          setEditing={setEditing}
          status={status}
        />
      )}
    </>
  );
}

/* ─────────────────────────── category section ─────────────────────────── */
type SectionProps = {
  category: Category;
  index: number;
  total: number;
  editing: boolean;
  uploading: Record<string, boolean>;
  patch: (fn: (m: Menu) => void) => void;
  pickPhoto: (c: string, col: string | undefined, it: string, f: File, old?: string) => void;
  removePhoto: (c: string, col: string | undefined, it: string, url?: string) => void;
  pickColumnPhoto: (c: string, col: string, f: File, old?: string) => void;
  removeColumnPhoto: (c: string, col: string, url?: string) => void;
  pickHighlightPhoto: (c: string, f: File, old?: string) => void;
  removeHighlightPhoto: (c: string, url?: string) => void;
  // True once this category has scrolled into view — coordinates the header
  // fade-in with the staggered card/column delays below it, like the home page.
  // Always true while editing, so admin content is never hidden behind an
  // animation that hasn't fired yet.
  show: boolean;
};

function CategorySection(props: Omit<SectionProps, "show">) {
  const { category: cat, index, total, editing, patch } = props;
  const chrome = chromeFor(cat.id);
  const isColumns = cat.layout === "columns";

  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const show = editing || inView;
  const sectionProps: SectionProps = { ...props, show };

  return (
    <>
      <Wave fill={chrome.waveFill} above={index === 0 ? chrome.waveFill : undefined} deep />
      <section
        id={cat.id}
        className={`relative scroll-mt-32 py-16 overflow-hidden ${chrome.patterned ? "spots-pattern" : ""}`}
        style={{ background: chrome.background }}
      >
        {chrome.glow && (
          <div
            className={`absolute ${chrome.glow.position} w-64 h-64 rounded-full pointer-events-none`}
            style={{ background: `radial-gradient(circle, ${chrome.glow.color} 0%, transparent 70%)`, filter: "blur(50px)" }}
          />
        )}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={show ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="relative max-w-5xl mx-auto px-6"
        >
          {editing && (
            <CategoryBar category={cat} index={index} total={total} patch={patch} />
          )}

          <EdText
            as="h2"
            editing={editing}
            value={cat.heading}
            placeholder="Titre de la catégorie"
            onCommit={(v) => patch((m) => { findCat(m, cat.id)!.heading = v; })}
            className="text-3xl md:text-4xl font-extrabold text-amber-900 mb-2"
            style={{ fontFamily: BALOO }}
          />
          {(editing || cat.subtitle) && (
            <EdText
              as="p"
              editing={editing}
              value={cat.subtitle ?? ""}
              placeholder="Sous-titre (optionnel)"
              onCommit={(v) => patch((m) => { const c = findCat(m, cat.id)!; if (v) c.subtitle = v; else delete c.subtitle; })}
              className="text-sm text-amber-800/55 mb-6 max-w-xl"
              style={{ fontFamily: NUNITO }}
              multiline
            />
          )}
          {!editing && !cat.subtitle && <div className="mb-4" />}

          {isColumns ? (
            <ColumnsLayout {...sectionProps} />
          ) : (
            <GridLayout {...sectionProps} />
          )}

          <HighlightSection {...sectionProps} />

          {/* Sous-catégories under a grid category (e.g. Chips & Fruits below the
              pizza grid). A columns category already shows these as its main
              content, so this secondary block is only for grid categories. */}
          {!isColumns && (cat.columns?.length || editing) ? (
            <div className="mt-6">
              <ColumnsLayout {...sectionProps} />
            </div>
          ) : null}
        </motion.div>
      </section>
    </>
  );
}

/* ─────────────────────────── grid layout ─────────────────────────── */
function GridLayout({ category: cat, editing, uploading, patch, pickPhoto, removePhoto, show }: SectionProps) {
  const chrome = chromeFor(cat.id);
  const items = cat.items ?? [];
  return (
    <div className={chrome.itemsClass ?? DEFAULT_ITEMS_CLASS}>
      {items.map((item, i) => (
        <motion.div
          key={item.id}
          initial={{ opacity: 0, y: 30 }}
          animate={show ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1 + i * 0.07 }}
          className="group relative rounded-2xl overflow-hidden bg-white shadow-md hover:shadow-xl transition-all duration-300 flex flex-col border border-amber-100"
        >
          <PhotoSlot
            image={item.image}
            label={item.name}
            emoji={cat.emoji}
            accent={chrome.accent}
            editing={editing}
            uploading={uploading[`${cat.id}||${item.id}`]}
            onPick={(f) => pickPhoto(cat.id, undefined, item.id, f, item.image)}
            onRemove={() => removePhoto(cat.id, undefined, item.id, item.image)}
          />
          <div className="p-4 flex flex-col gap-1 flex-1">
            <EdText
              as="p" editing={editing} value={item.name} placeholder="Nom"
              onCommit={(v) => patch((m) => { listOf(findCat(m, cat.id)!).find((x) => x.id === item.id)!.name = v; })}
              className="font-extrabold text-amber-900 text-sm leading-snug" style={{ fontFamily: BALOO }}
            />
            {(editing || item.desc) && (
              <EdText
                as="p" editing={editing} value={item.desc ?? ""} placeholder="Description (optionnel)"
                onCommit={(v) => patch((m) => { const it = listOf(findCat(m, cat.id)!).find((x) => x.id === item.id)!; if (v) it.desc = v; else delete it.desc; })}
                className="text-xs text-amber-800/50 leading-snug" style={{ fontFamily: NUNITO }}
              />
            )}
            <EdText
              as="span" editing={editing} value={item.price} placeholder="Prix"
              onCommit={(v) => patch((m) => { listOf(findCat(m, cat.id)!).find((x) => x.id === item.id)!.price = v; })}
              className="mt-auto pt-1 font-extrabold text-sm" style={{ color: chrome.accent, fontFamily: BALOO }}
            />
          </div>
          {editing && (
            <RowControls
              index={i} total={items.length}
              onUp={() => patch((m) => move(listOf(findCat(m, cat.id)!), i, -1))}
              onDown={() => patch((m) => move(listOf(findCat(m, cat.id)!), i, 1))}
              onDelete={() => { patch((m) => { const l = listOf(findCat(m, cat.id)!); l.splice(l.findIndex((x) => x.id === item.id), 1); }); if (item.image) deletePhotosAction([item.image]); }}
              label={item.name}
            />
          )}
        </motion.div>
      ))}
      {editing && (
        <AddCard onClick={() => patch((m) => { listOf(findCat(m, cat.id)!).push({ id: uid(), name: "Nouveau produit", price: "" }); })} />
      )}
    </div>
  );
}

/* ─────────────────────────── columns layout ─────────────────────────── */
function ColumnsLayout({ category: cat, editing, uploading, patch, pickColumnPhoto, removeColumnPhoto, show }: SectionProps) {
  const chrome = chromeFor(cat.id);
  const columns = cat.columns ?? [];
  return (
    <div className={chrome.columnsClass ?? DEFAULT_COLUMNS_CLASS}>
      {columns.map((col, ci) => (
        <motion.div
          key={col.id}
          initial={{ opacity: 0, y: 35 }}
          animate={show ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, delay: 0.1 + ci * 0.12 }}
          className="bg-white rounded-3xl overflow-hidden shadow-md shadow-amber-50 border border-amber-100"
        >
          <PhotoSlot
            image={col.image}
            label={col.title}
            emoji={col.emoji ?? cat.emoji}
            accent={chrome.accent}
            editing={editing}
            uploading={uploading[`${cat.id}|col|${col.id}`]}
            onPick={(f) => pickColumnPhoto(cat.id, col.id, f, col.image)}
            onRemove={() => removeColumnPhoto(cat.id, col.id, col.image)}
            heightClass="h-32"
          />
          <div className="p-6">
            {editing && (
              <RowControls
                index={ci} total={columns.length} inline
                onUp={() => patch((m) => move(findCat(m, cat.id)!.columns!, ci, -1))}
                onDown={() => patch((m) => move(findCat(m, cat.id)!.columns!, ci, 1))}
                onDelete={() => { patch((m) => { const cols = findCat(m, cat.id)!.columns!; cols.splice(cols.findIndex((x) => x.id === col.id), 1); }); const imgs = col.items.map((i) => i.image).filter(Boolean) as string[]; if (imgs.length) deletePhotosAction(imgs); }}
                label={col.title}
              />
            )}
            <EdText
              as="h3" editing={editing} value={col.title} placeholder="Titre de la sous-catégorie"
              onCommit={(v) => patch((m) => { findCat(m, cat.id)!.columns!.find((x) => x.id === col.id)!.title = v; })}
              className="text-lg font-extrabold mb-2" style={{ color: chrome.accent, fontFamily: BALOO }}
            />
            <div>
              {col.items.map((item, ii) => (
                <PriceRowEditable
                  key={item.id}
                  item={item} index={ii} total={col.items.length}
                  editing={editing}
                  onCommit={(field, v) => patch((m) => {
                    const it = findCat(m, cat.id)!.columns!.find((x) => x.id === col.id)!.items.find((y) => y.id === item.id)!;
                    if (field === "note") { if (v) it.note = v; else delete it.note; }
                    else if (field === "desc") { if (v) it.desc = v; else delete it.desc; }
                    else it[field] = v;
                  })}
                  onUp={() => patch((m) => move(findCat(m, cat.id)!.columns!.find((x) => x.id === col.id)!.items, ii, -1))}
                  onDown={() => patch((m) => move(findCat(m, cat.id)!.columns!.find((x) => x.id === col.id)!.items, ii, 1))}
                  onDelete={() => patch((m) => { const l = findCat(m, cat.id)!.columns!.find((x) => x.id === col.id)!.items; l.splice(l.findIndex((y) => y.id === item.id), 1); })}
                />
              ))}
            </div>
            {editing && (
              <button
                onClick={() => patch((m) => { findCat(m, cat.id)!.columns!.find((x) => x.id === col.id)!.items.push({ id: uid(), name: "Nouveau produit", price: "" }); })}
                className="mt-2 text-sm font-bold text-orange-600 hover:underline"
              >
                + Ajouter un produit
              </button>
            )}
            {(editing || col.footnote) && (
              <EdText
                as="p" editing={editing} value={col.footnote ?? ""} placeholder="Note de bas (optionnel)"
                onCommit={(v) => patch((m) => { const c = findCat(m, cat.id)!.columns!.find((x) => x.id === col.id)!; if (v) c.footnote = v; else delete c.footnote; })}
                className="text-xs text-amber-800/45 mt-3 italic" style={{ fontFamily: NUNITO }}
              />
            )}
          </div>
        </motion.div>
      ))}
      {editing && (
        <AddCard
          tall
          onClick={() => patch((m) => { const c = findCat(m, cat.id)!; if (!c.columns) c.columns = []; c.columns.push({ id: uid(), title: "Nouvelle sous-catégorie", items: [] }); })}
          label="+ Ajouter une sous-catégorie"
        />
      )}
    </div>
  );
}

/* ─────────────────────────── editable primitives ─────────────────────────── */
function EdText({
  as: Tag = "span", editing, value, onCommit, className, style, placeholder, multiline,
}: {
  as?: React.ElementType;
  editing: boolean;
  value: string;
  onCommit: (v: string) => void;
  className?: string;
  style?: React.CSSProperties;
  placeholder?: string;
  multiline?: boolean;
}) {
  if (!editing) {
    if (!value) return null;
    return <Tag className={className} style={style}>{value}</Tag>;
  }
  return (
    <Tag
      contentEditable
      suppressContentEditableWarning
      data-placeholder={placeholder}
      onBlur={(e: React.FocusEvent<HTMLElement>) => onCommit((e.currentTarget.textContent ?? "").trim())}
      onKeyDown={(e: React.KeyboardEvent) => {
        if (!multiline && e.key === "Enter") { e.preventDefault(); (e.currentTarget as HTMLElement).blur(); }
      }}
      className={`${className ?? ""} ed-field`}
      style={style}
    >
      {value}
    </Tag>
  );
}

function PhotoSlot({
  image, label, emoji, accent, editing, uploading, onPick, onRemove, heightClass = "h-36",
}: {
  image?: string; label: string; emoji: string; accent: string; editing: boolean; uploading?: boolean;
  onPick: (f: File) => void; onRemove: () => void; heightClass?: string;
}) {
  const [broken, setBroken] = useState(false);
  const showPhoto = !!image && !broken;
  return (
    <div className={`relative flex-shrink-0 bg-amber-50 ${heightClass}`}>
      {showPhoto ? (
        <Image src={image} alt={label} fill className="object-cover" sizes="(max-width: 640px) 50vw, 340px" onError={() => setBroken(true)} />
      ) : (
        <div className="absolute inset-0 flex items-center justify-center border-b-2" style={{ borderColor: accent + "40" }}>
          <span className="text-3xl opacity-50">{emoji}</span>
        </div>
      )}
      {uploading && (
        <div className="absolute inset-0 bg-white/70 flex items-center justify-center text-sm font-bold text-amber-800">Envoi…</div>
      )}
      {editing && !uploading && (
        <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-1.5">
          <label className="px-3 py-1.5 rounded-lg bg-white text-xs font-extrabold text-amber-900 cursor-pointer shadow">
            {image ? "Changer la photo" : "Ajouter une photo"}
            <input type="file" accept="image/*" className="hidden" onChange={(e) => { const f = e.target.files?.[0]; if (f) onPick(f); e.target.value = ""; }} />
          </label>
          {image && (
            <button onClick={onRemove} className="px-2 py-1 rounded-lg bg-red-500/90 text-white text-[11px] font-bold">Retirer</button>
          )}
        </div>
      )}
    </div>
  );
}

function PriceRowEditable({
  item, index, total, editing, onCommit, onUp, onDown, onDelete,
}: {
  item: MenuItem; index: number; total: number; editing: boolean;
  onCommit: (field: "name" | "price" | "desc" | "note", v: string) => void;
  onUp: () => void; onDown: () => void; onDelete: () => void;
}) {
  return (
    <div className="group flex items-start justify-between gap-3 py-2.5 border-b border-dashed border-amber-900/10 last:border-0">
      <div className="min-w-0 flex-1">
        <p className="font-bold text-amber-900 text-[15px] leading-snug" style={{ fontFamily: NUNITO }}>
          <EdText as="span" editing={editing} value={item.name} placeholder="Nom" onCommit={(v) => onCommit("name", v)} />
          {!editing && item.note && <span className="ml-2 text-xs font-semibold text-orange-500">({item.note})</span>}
          {editing && (
            <EdText as="span" editing value={item.note ?? ""} placeholder="note (optionnel)" onCommit={(v) => onCommit("note", v)} className="ml-2 text-xs font-semibold text-orange-500" />
          )}
        </p>
        {(editing || item.desc) && (
          <EdText as="p" editing={editing} value={item.desc ?? ""} placeholder="description (optionnel)" onCommit={(v) => onCommit("desc", v)} className="text-xs text-amber-800/50 leading-snug mt-0.5" style={{ fontFamily: NUNITO }} />
        )}
      </div>
      <EdText as="span" editing={editing} value={item.price} placeholder="Prix" onCommit={(v) => onCommit("price", v)} className="flex-shrink-0 font-extrabold text-orange-600 text-[15px]" style={{ fontFamily: BALOO }} />
      {editing && (
        <span className="flex-shrink-0 flex items-center">
          <MiniBtn disabled={index === 0} onClick={onUp}>↑</MiniBtn>
          <MiniBtn disabled={index === total - 1} onClick={onDown}>↓</MiniBtn>
          <MiniBtn danger onClick={onDelete}>✕</MiniBtn>
        </span>
      )}
    </div>
  );
}

/* ─────────────────────────── small controls ─────────────────────────── */
function MiniBtn({ children, onClick, disabled, danger }: { children: React.ReactNode; onClick: () => void; disabled?: boolean; danger?: boolean }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`w-6 h-6 rounded-md text-sm leading-none ${danger ? "text-red-500 hover:bg-red-50" : "text-amber-700 hover:bg-amber-100"} disabled:opacity-25`}
    >
      {children}
    </button>
  );
}

function RowControls({ index, total, onUp, onDown, onDelete, label, inline }: { index: number; total: number; onUp: () => void; onDown: () => void; onDelete: () => void; label: string; inline?: boolean }) {
  return (
    <div className={`flex items-center gap-1 ${inline ? "mb-2" : "border-t border-amber-50 px-3 py-1.5"}`}>
      <MiniBtn disabled={index === 0} onClick={onUp}>↑</MiniBtn>
      <MiniBtn disabled={index === total - 1} onClick={onDown}>↓</MiniBtn>
      <button
        onClick={() => { if (window.confirm(`Supprimer « ${label} » ?`)) onDelete(); }}
        className="ml-auto text-xs font-bold text-red-500 hover:text-red-600 px-2 py-1 rounded hover:bg-red-50"
      >
        Supprimer
      </button>
    </div>
  );
}

function CategoryBar({ category: cat, index, total, patch }: { category: Category; index: number; total: number; patch: (fn: (m: Menu) => void) => void }) {
  return (
    <div className="flex flex-wrap items-center gap-2 mb-3 p-2 rounded-xl bg-white/70 border border-amber-100 text-sm">
      <span className="font-bold text-amber-800">Catégorie :</span>
      <label className="flex items-center gap-1">
        <span className="text-xs text-amber-700">emoji</span>
        <input defaultValue={cat.emoji} maxLength={4} onBlur={(e) => patch((m) => { findCat(m, cat.id)!.emoji = e.target.value || "🍽️"; })} className="w-12 text-center rounded border border-amber-200 px-1 py-0.5" />
      </label>
      <label className="flex items-center gap-1">
        <span className="text-xs text-amber-700">nom (menu)</span>
        <input defaultValue={cat.label} onBlur={(e) => patch((m) => { findCat(m, cat.id)!.label = e.target.value; })} className="rounded border border-amber-200 px-2 py-0.5" />
      </label>
      <span className="ml-auto flex items-center gap-1">
        <MiniBtn disabled={index === 0} onClick={() => patch((m) => move(m.categories, index, -1))}>↑</MiniBtn>
        <MiniBtn disabled={index === total - 1} onClick={() => patch((m) => move(m.categories, index, 1))}>↓</MiniBtn>
        <button onClick={() => { if (window.confirm(`Supprimer la catégorie « ${cat.label} » et tous ses produits ?`)) patch((m) => { m.categories = m.categories.filter((c) => c.id !== cat.id); }); }} className="text-xs font-bold text-red-500 hover:text-red-600 px-2 py-1 rounded hover:bg-red-50">Supprimer la catégorie</button>
      </span>
    </div>
  );
}

function AddCard({ onClick, label = "+ Ajouter un produit", tall, className = "" }: { onClick: () => void; label?: string; tall?: boolean; className?: string }) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center justify-center rounded-2xl border-2 border-dashed border-amber-300 text-amber-700 font-bold hover:bg-amber-50 transition-colors ${tall ? "min-h-[8rem] p-6" : "min-h-[8rem]"} ${className}`}
    >
      {label}
    </button>
  );
}

function AddCategory({ patch }: { patch: (fn: (m: Menu) => void) => void }) {
  const add = (layout: CategoryLayout) =>
    patch((m) => {
      const cat: Category = { id: uid(), label: "Nouvelle catégorie", emoji: "🍽️", layout, heading: "Nouvelle catégorie" };
      if (layout === "columns") cat.columns = [];
      else cat.items = [];
      m.categories.push(cat);
    });
  return (
    <div className="max-w-5xl mx-auto px-6 py-10 flex flex-col items-center gap-3">
      <p className="font-extrabold text-amber-900" style={{ fontFamily: BALOO }}>Ajouter une catégorie</p>
      <div className="flex gap-3">
        <button onClick={() => add("grid")} className="px-5 py-2.5 rounded-xl border-2 border-dashed border-amber-300 font-bold text-amber-800 hover:bg-amber-50">🖼️ Grille (avec photos)</button>
        <button onClick={() => add("columns")} className="px-5 py-2.5 rounded-xl border-2 border-dashed border-amber-300 font-bold text-amber-800 hover:bg-amber-50">📋 Listes de prix</button>
      </div>
    </div>
  );
}

/* ─────────────────────────── floating toolbar ─────────────────────────── */
function EditToolbar({ editing, setEditing, status }: { editing: boolean; setEditing: (v: boolean) => void; status: SaveStatus }) {
  const statusText: Record<SaveStatus, string> = {
    idle: "", pending: "Modifications…", saving: "Enregistrement…", saved: "Enregistré ✓", error: "Erreur d’enregistrement",
  };
  return (
    <div className="fixed bottom-5 right-5 z-50 flex items-center gap-2">
      {editing && (
        <>
          <span className={`text-sm font-bold px-3 py-1.5 rounded-full bg-white shadow ${status === "error" ? "text-red-600" : "text-amber-800"}`} style={{ fontFamily: NUNITO }}>
            {statusText[status]}
          </span>
          <form action={logout}>
            <button type="submit" className="text-sm font-bold text-amber-700 hover:text-red-600 px-3 py-2 rounded-full bg-white shadow">Quitter</button>
          </form>
        </>
      )}
      <button
        onClick={() => setEditing(!editing)}
        className="px-5 py-3 rounded-full text-white font-extrabold shadow-lg"
        style={{ background: editing ? "#16a34a" : "linear-gradient(135deg, #FF5722, #F5A623)", fontFamily: BALOO }}
      >
        {editing ? "✓ Terminer" : "✏️ Modifier la carte"}
      </button>
    </div>
  );
}


/* ─────────────────────────── promo banner (Category.highlight) ─────────────────────────── */
function HighlightSection({
  category: cat, editing, uploading, patch, pickHighlightPhoto, removeHighlightPhoto, show,
}: SectionProps) {
  const chrome = chromeFor(cat.id);

  if (!cat.highlight) {
    if (!editing) return null;
    return (
      <AddCard
        tall
        label="+ Ajouter un encart promo"
        onClick={() => patch((m) => {
          findCat(m, cat.id)!.highlight = { badge: "⭐ Offre spéciale", text: "Description de l’offre", price: "0,00 €" };
        })}
        className="mt-6 mb-5"
      />
    );
  }

  const h = cat.highlight;
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={show ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: 0.4 }}
      className="relative rounded-3xl overflow-hidden text-white shadow-xl mt-6 mb-5"
      style={{ background: chrome.highlightGradient ?? DEFAULT_HIGHLIGHT_GRADIENT }}
    >
      <PhotoSlot
        image={h.image} label={h.badge || "Offre"} emoji={cat.emoji} accent="#ffffff"
        editing={editing}
        uploading={uploading[`${cat.id}|highlight`]}
        onPick={(f) => pickHighlightPhoto(cat.id, f, h.image)}
        onRemove={() => removeHighlightPhoto(cat.id, h.image)}
        heightClass="h-32"
      />
      <div className="p-6 md:p-7">
        {editing && (
          <button
            onClick={() => {
              if (!window.confirm("Supprimer cet encart promo ?")) return;
              patch((m) => { delete findCat(m, cat.id)!.highlight; });
              if (h.image) deletePhotosAction([h.image]);
            }}
            className="float-right text-xs font-bold text-white/70 hover:text-white bg-black/20 hover:bg-black/30 px-2 py-1 rounded"
          >
            ✕ Supprimer
          </button>
        )}
        <EdText
          as="span" editing={editing} value={h.badge} placeholder="Badge (ex : ⭐ Formule)"
          onCommit={(v) => patch((m) => { findCat(m, cat.id)!.highlight!.badge = v; })}
          className="inline-block px-3 py-1 rounded-full bg-white/20 text-xs font-extrabold mb-2" style={{ fontFamily: NUNITO }}
        />
        <div className="flex items-center justify-between flex-wrap gap-3">
          <EdText
            as="p" editing={editing} value={h.text} placeholder="Description de l’offre"
            onCommit={(v) => patch((m) => { findCat(m, cat.id)!.highlight!.text = v; })}
            className="text-lg font-extrabold leading-snug" style={{ fontFamily: BALOO }}
          />
          <EdText
            as="span" editing={editing} value={h.price} placeholder="Prix"
            onCommit={(v) => patch((m) => { findCat(m, cat.id)!.highlight!.price = v; })}
            className="text-3xl font-extrabold" style={{ fontFamily: BALOO }}
          />
        </div>
      </div>
    </motion.div>
  );
}

/* CSS for contentEditable fields (dashed outline + placeholder). */
function EditableStyles() {
  return (
    <style>{`
      .ed-field { outline: 1.5px dashed rgba(234,88,12,.45); outline-offset: 3px; border-radius: 6px; cursor: text; min-width: 2ch; transition: background .15s; }
      .ed-field:focus { outline-style: solid; outline-color: #EA580C; background: rgba(255,247,237,.7); }
      .ed-field:empty:before { content: attr(data-placeholder); color: #c4b2a1; font-weight: 400; }
    `}</style>
  );
}
