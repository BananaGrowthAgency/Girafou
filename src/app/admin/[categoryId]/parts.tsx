import Image from "next/image";
import type { Category, MenuColumn, MenuItem } from "@/lib/menu/types";
import { SubmitButton } from "../ui";
import {
  addColumn,
  addItem,
  deleteColumn,
  deleteItem,
  moveColumn,
  moveItem,
  removeItemPhoto,
  updateCategoryMeta,
  updateColumn,
  updateItem,
  uploadItemPhoto,
} from "../actions";

const input =
  "rounded-xl border border-amber-200 px-3 py-2 text-sm outline-none focus:border-orange-400 w-full";
const label = "text-xs font-bold text-amber-800";
const saveBtn =
  "self-start px-4 py-2 rounded-xl text-white font-extrabold text-sm shadow-sm";
const saveStyle = { background: "linear-gradient(135deg, #FF5722, #F5A623)" } as const;
const iconBtn = "w-8 h-8 rounded-lg text-amber-700 hover:bg-amber-50 disabled:opacity-30";

/* ── category meta ── */

export function MetaForm({ category }: { category: Category }) {
  return (
    <form action={updateCategoryMeta} className="bg-white rounded-2xl border border-amber-100 shadow-sm p-5 flex flex-col gap-3">
      <input type="hidden" name="categoryId" value={category.id} />
      <div className="flex gap-3">
        <label className="flex flex-col gap-1 w-20">
          <span className={label}>Emoji</span>
          <input name="emoji" defaultValue={category.emoji} maxLength={4} className={`${input} text-center text-lg`} />
        </label>
        <label className="flex flex-col gap-1 flex-1">
          <span className={label}>Nom (menu)</span>
          <input name="label" defaultValue={category.label} className={input} />
        </label>
      </div>
      <label className="flex flex-col gap-1">
        <span className={label}>Titre affiché</span>
        <input name="heading" defaultValue={category.heading} className={input} />
      </label>
      <label className="flex flex-col gap-1">
        <span className={label}>Sous-titre (optionnel)</span>
        <textarea name="subtitle" defaultValue={category.subtitle ?? ""} rows={2} className={input} />
      </label>
      <SubmitButton className={saveBtn} style={saveStyle} pendingLabel="Enregistrement…">
        Enregistrer
      </SubmitButton>
    </form>
  );
}

/* ── one item (dish / drink) ── */

export function ItemRow({
  categoryId,
  columnId = "",
  item,
  index,
  count,
  withPhoto,
}: {
  categoryId: string;
  columnId?: string;
  item: MenuItem;
  index: number;
  count: number;
  withPhoto: boolean;
}) {
  const hidden = (
    <>
      <input type="hidden" name="categoryId" value={categoryId} />
      <input type="hidden" name="columnId" value={columnId} />
      <input type="hidden" name="itemId" value={item.id} />
    </>
  );

  return (
    <div className="bg-white rounded-2xl border border-amber-100 shadow-sm p-4 flex flex-col gap-3">
      <div className="flex gap-3">
        {withPhoto && (
          <div className="flex-shrink-0 w-20">
            <div className="relative w-20 h-20 rounded-xl overflow-hidden bg-amber-50 border border-amber-100">
              {item.image ? (
                <Image src={item.image} alt={item.name} fill className="object-cover" sizes="80px" />
              ) : (
                <span className="absolute inset-0 flex items-center justify-center text-2xl opacity-40">📸</span>
              )}
            </div>
            <form action={uploadItemPhoto} className="mt-1.5 flex flex-col items-center gap-1">
              {hidden}
              <input type="file" name="photo" accept="image/*" required className="w-full text-[10px] text-amber-700 file:mr-1 file:rounded file:border-0 file:bg-amber-100 file:px-1.5 file:py-0.5 file:text-[10px] file:font-bold file:text-amber-800" />
              <SubmitButton className="text-[11px] font-bold text-orange-600 hover:underline" pendingLabel="Envoi…">
                {item.image ? "Changer" : "Ajouter"}
              </SubmitButton>
            </form>
            {item.image && (
              <form action={removeItemPhoto} className="text-center">
                {hidden}
                <SubmitButton className="text-[11px] text-red-500 hover:underline">Retirer</SubmitButton>
              </form>
            )}
          </div>
        )}

        <form action={updateItem} className="flex-1 flex flex-col gap-2">
          {hidden}
          <div className="flex gap-2">
            <input name="name" defaultValue={item.name} placeholder="Nom" required className={`${input} flex-1`} />
            <input name="price" defaultValue={item.price} placeholder="Prix" className={`${input} w-24`} />
          </div>
          <input name="desc" defaultValue={item.desc ?? ""} placeholder="Description (optionnel)" className={input} />
          <input name="note" defaultValue={item.note ?? ""} placeholder="Note, ex : halal sur demande (optionnel)" className={input} />
          <SubmitButton className={saveBtn} style={saveStyle} pendingLabel="…">
            Enregistrer
          </SubmitButton>
        </form>
      </div>

      <div className="flex items-center gap-1 border-t border-amber-50 pt-2">
        <form action={moveItem}>
          {hidden}
          <input type="hidden" name="dir" value="up" />
          <SubmitButton className={iconBtn} style={index === 0 ? { opacity: 0.3, pointerEvents: "none" } : undefined}>↑</SubmitButton>
        </form>
        <form action={moveItem}>
          {hidden}
          <input type="hidden" name="dir" value="down" />
          <SubmitButton className={iconBtn} style={index === count - 1 ? { opacity: 0.3, pointerEvents: "none" } : undefined}>↓</SubmitButton>
        </form>
        <form action={deleteItem} className="ml-auto">
          {hidden}
          <SubmitButton confirm={`Supprimer « ${item.name} » ?`} className="text-sm font-bold text-red-500 hover:text-red-600 px-3 py-1.5 rounded-lg hover:bg-red-50">
            Supprimer
          </SubmitButton>
        </form>
      </div>
    </div>
  );
}

export function AddItemForm({ categoryId, columnId = "" }: { categoryId: string; columnId?: string }) {
  return (
    <form action={addItem} className="bg-amber-50/60 rounded-2xl border border-dashed border-amber-200 p-4 flex flex-col gap-2">
      <input type="hidden" name="categoryId" value={categoryId} />
      <input type="hidden" name="columnId" value={columnId} />
      <div className="flex gap-2">
        <input name="name" placeholder="Nouvel article" required className={`${input} flex-1`} />
        <input name="price" placeholder="Prix" className={`${input} w-24`} />
      </div>
      <input name="desc" placeholder="Description (optionnel)" className={input} />
      <SubmitButton className={`${saveBtn} bg-amber-700`} style={{ background: "#B45309" }} pendingLabel="…">
        + Ajouter l’article
      </SubmitButton>
    </form>
  );
}

/* ── one column (for columns-layout categories) ── */

export function ColumnBlock({
  categoryId,
  column,
  index,
  count,
}: {
  categoryId: string;
  column: MenuColumn;
  index: number;
  count: number;
}) {
  return (
    <section className="rounded-2xl border border-amber-100 bg-amber-50/40 p-4 flex flex-col gap-3">
      <form action={updateColumn} className="flex flex-wrap items-end gap-2">
        <input type="hidden" name="categoryId" value={categoryId} />
        <input type="hidden" name="columnId" value={column.id} />
        <label className="flex flex-col gap-1 w-16">
          <span className={label}>Emoji</span>
          <input name="emoji" defaultValue={column.emoji ?? ""} maxLength={4} className={`${input} text-center`} />
        </label>
        <label className="flex flex-col gap-1 flex-1 min-w-[8rem]">
          <span className={label}>Titre de la colonne</span>
          <input name="title" defaultValue={column.title} className={input} />
        </label>
        <label className="flex flex-col gap-1 w-full">
          <span className={label}>Note de bas de colonne (optionnel)</span>
          <input name="footnote" defaultValue={column.footnote ?? ""} className={input} />
        </label>
        <SubmitButton className={saveBtn} style={saveStyle} pendingLabel="…">Enregistrer</SubmitButton>
      </form>

      <div className="flex flex-col gap-2">
        {column.items.map((it, i) => (
          <ItemRow
            key={it.id}
            categoryId={categoryId}
            columnId={column.id}
            item={it}
            index={i}
            count={column.items.length}
            withPhoto={false}
          />
        ))}
      </div>
      <AddItemForm categoryId={categoryId} columnId={column.id} />

      <div className="flex items-center gap-1 border-t border-amber-100 pt-2">
        <form action={moveColumn}>
          <input type="hidden" name="categoryId" value={categoryId} />
          <input type="hidden" name="columnId" value={column.id} />
          <input type="hidden" name="dir" value="up" />
          <SubmitButton className={iconBtn} style={index === 0 ? { opacity: 0.3, pointerEvents: "none" } : undefined}>↑</SubmitButton>
        </form>
        <form action={moveColumn}>
          <input type="hidden" name="categoryId" value={categoryId} />
          <input type="hidden" name="columnId" value={column.id} />
          <input type="hidden" name="dir" value="down" />
          <SubmitButton className={iconBtn} style={index === count - 1 ? { opacity: 0.3, pointerEvents: "none" } : undefined}>↓</SubmitButton>
        </form>
        <form action={deleteColumn} className="ml-auto">
          <input type="hidden" name="categoryId" value={categoryId} />
          <input type="hidden" name="columnId" value={column.id} />
          <SubmitButton confirm={`Supprimer la colonne « ${column.title} » ?`} className="text-sm font-bold text-red-500 hover:text-red-600 px-3 py-1.5 rounded-lg hover:bg-red-50">
            Supprimer la colonne
          </SubmitButton>
        </form>
      </div>
    </section>
  );
}

export function AddColumnForm({ categoryId }: { categoryId: string }) {
  return (
    <form action={addColumn} className="bg-white rounded-2xl border border-dashed border-amber-200 p-4 flex items-end gap-2">
      <input type="hidden" name="categoryId" value={categoryId} />
      <label className="flex flex-col gap-1 w-16">
        <span className={label}>Emoji</span>
        <input name="emoji" maxLength={4} className={`${input} text-center`} />
      </label>
      <label className="flex flex-col gap-1 flex-1">
        <span className={label}>Nouvelle colonne</span>
        <input name="title" placeholder="Ex : Boissons chaudes" required className={input} />
      </label>
      <SubmitButton className={saveBtn} style={saveStyle} pendingLabel="…">+ Ajouter</SubmitButton>
    </form>
  );
}
