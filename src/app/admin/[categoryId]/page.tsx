import { notFound } from "next/navigation";
import { getMenuFresh } from "@/lib/menu/store";
import AdminHeader from "../AdminHeader";
import { MetaForm, ItemRow, AddItemForm, ColumnBlock, AddColumnForm } from "./parts";

export default async function CategoryEditor({
  params,
}: {
  params: Promise<{ categoryId: string }>;
}) {
  const { categoryId } = await params;
  const menu = await getMenuFresh();
  const category = menu.categories.find((c) => c.id === categoryId);
  if (!category) notFound();

  const isColumns = category.layout === "columns";
  const items = category.items ?? [];
  const columns = category.columns ?? [];

  return (
    <>
      <AdminHeader back={{ href: "/admin", label: "Catégories" }} />
      <main className="max-w-3xl mx-auto px-5 py-6 flex flex-col gap-6">
        <div>
          <h1 className="text-2xl font-extrabold text-amber-900" style={{ fontFamily: "var(--font-baloo)" }}>
            {category.emoji} {category.label}
          </h1>
          <p className="text-sm text-amber-800/60">
            {isColumns ? "Présentation en colonnes (listes de prix)." : "Présentation en grille (avec photos)."}
          </p>
        </div>

        <MetaForm category={category} />

        {isColumns ? (
          <div className="flex flex-col gap-4">
            <h2 className="font-extrabold text-amber-900" style={{ fontFamily: "var(--font-baloo)" }}>
              Colonnes
            </h2>
            {columns.map((col, i) => (
              <ColumnBlock key={col.id} categoryId={category.id} column={col} index={i} count={columns.length} />
            ))}
            <AddColumnForm categoryId={category.id} />
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            <h2 className="font-extrabold text-amber-900" style={{ fontFamily: "var(--font-baloo)" }}>
              Articles
            </h2>
            {items.map((it, i) => (
              <ItemRow
                key={it.id}
                categoryId={category.id}
                item={it}
                index={i}
                count={items.length}
                withPhoto
              />
            ))}
            <AddItemForm categoryId={category.id} />
          </div>
        )}
      </main>
    </>
  );
}
