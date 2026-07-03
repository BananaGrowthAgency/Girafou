import Link from "next/link";
import { getMenuFresh } from "@/lib/menu/store";
import AdminHeader from "./AdminHeader";
import { SubmitButton } from "./ui";
import { addCategory, deleteCategory, moveCategory } from "./actions";

function countItems(cat: { items?: unknown[]; columns?: { items: unknown[] }[] }): number {
  if (cat.columns) return cat.columns.reduce((n, c) => n + c.items.length, 0);
  return cat.items?.length ?? 0;
}

export default async function AdminHome() {
  const menu = await getMenuFresh();

  return (
    <>
      <AdminHeader />
      <main className="max-w-3xl mx-auto px-5 py-6">
        <h1 className="text-2xl font-extrabold text-amber-900 mb-1" style={{ fontFamily: "var(--font-baloo)" }}>
          Catégories de la carte
        </h1>
        <p className="text-sm text-amber-800/60 mb-5">
          Modifiez vos plats, prix et photos. Les changements sont visibles aussitôt sur la page{" "}
          <Link href="/restauration" className="underline font-semibold" target="_blank">
            Restauration
          </Link>
          .
        </p>

        <ul className="flex flex-col gap-2.5 mb-8">
          {menu.categories.map((cat, i) => (
            <li
              key={cat.id}
              className="flex items-center gap-3 bg-white rounded-2xl border border-amber-100 shadow-sm px-4 py-3"
            >
              <span className="text-2xl">{cat.emoji}</span>
              <div className="min-w-0 flex-1">
                <p className="font-extrabold text-amber-900 truncate" style={{ fontFamily: "var(--font-baloo)" }}>
                  {cat.label}
                </p>
                <p className="text-xs text-amber-800/50">
                  {cat.layout === "columns" ? "Colonnes" : "Grille"} · {countItems(cat)} article(s)
                </p>
              </div>

              <div className="flex items-center gap-1">
                <form action={moveCategory}>
                  <input type="hidden" name="categoryId" value={cat.id} />
                  <input type="hidden" name="dir" value="up" />
                  <SubmitButton className="w-8 h-8 rounded-lg hover:bg-amber-50 text-amber-700 disabled:opacity-30" style={i === 0 ? { opacity: 0.3, pointerEvents: "none" } : undefined}>
                    ↑
                  </SubmitButton>
                </form>
                <form action={moveCategory}>
                  <input type="hidden" name="categoryId" value={cat.id} />
                  <input type="hidden" name="dir" value="down" />
                  <SubmitButton className="w-8 h-8 rounded-lg hover:bg-amber-50 text-amber-700 disabled:opacity-30" style={i === menu.categories.length - 1 ? { opacity: 0.3, pointerEvents: "none" } : undefined}>
                    ↓
                  </SubmitButton>
                </form>
                <Link
                  href={`/admin/${cat.id}`}
                  className="ml-1 px-3 py-1.5 rounded-lg text-sm font-bold text-white"
                  style={{ background: "linear-gradient(135deg, #FF5722, #F5A623)" }}
                >
                  Modifier
                </Link>
                <form action={deleteCategory}>
                  <input type="hidden" name="categoryId" value={cat.id} />
                  <SubmitButton
                    confirm={`Supprimer la catégorie « ${cat.label} » et tous ses articles ?`}
                    className="w-8 h-8 rounded-lg hover:bg-red-50 text-red-500"
                  >
                    🗑
                  </SubmitButton>
                </form>
              </div>
            </li>
          ))}
          {menu.categories.length === 0 && (
            <li className="text-sm text-amber-800/50 text-center py-6">Aucune catégorie pour l’instant.</li>
          )}
        </ul>

        {/* Add category */}
        <section className="bg-white rounded-2xl border border-amber-100 shadow-sm p-5">
          <h2 className="font-extrabold text-amber-900 mb-3" style={{ fontFamily: "var(--font-baloo)" }}>
            Ajouter une catégorie
          </h2>
          <form action={addCategory} className="flex flex-col gap-3">
            <div className="flex gap-3">
              <label className="flex flex-col gap-1 w-20">
                <span className="text-xs font-bold text-amber-800">Emoji</span>
                <input name="emoji" defaultValue="🍽️" maxLength={4} className="rounded-xl border border-amber-200 px-3 py-2 text-center text-lg outline-none focus:border-orange-400" />
              </label>
              <label className="flex flex-col gap-1 flex-1">
                <span className="text-xs font-bold text-amber-800">Nom</span>
                <input name="label" required placeholder="Ex : Salades" className="rounded-xl border border-amber-200 px-3 py-2 outline-none focus:border-orange-400" />
              </label>
            </div>
            <label className="flex flex-col gap-1">
              <span className="text-xs font-bold text-amber-800">Présentation</span>
              <select name="layout" defaultValue="grid" className="rounded-xl border border-amber-200 px-3 py-2 outline-none focus:border-orange-400 bg-white">
                <option value="grid">Grille (avec photos)</option>
                <option value="columns">Colonnes (listes de prix)</option>
              </select>
            </label>
            <SubmitButton
              className="self-start px-5 py-2.5 rounded-xl text-white font-extrabold shadow-sm"
              style={{ background: "linear-gradient(135deg, #FF5722, #F5A623)", fontFamily: "var(--font-baloo)" }}
            >
              + Ajouter
            </SubmitButton>
          </form>
        </section>
      </main>
    </>
  );
}
