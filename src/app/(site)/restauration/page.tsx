import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CarteHero from "@/components/CarteHero";
import CarteNav, { type NavCategory } from "@/components/CarteNav";
import CarteEvents from "@/components/CarteEvents";
import MenuSections from "@/components/MenuSections";
import { getMenu } from "@/lib/menu/store";

export const metadata: Metadata = {
  title: "La Carte — Girafou",
  description:
    "Pizzas maison, crêpes, gaufres, glaces et boissons à déguster sur place au parc Girafou, près de Caen.",
};

export default async function RestaurationPage() {
  const menu = await getMenu();

  // Nav mirrors the editable categories, plus the static "Fêtes" section (CarteEvents).
  const navCategories: NavCategory[] = [
    ...menu.categories.map((c) => ({ id: c.id, label: c.label, emoji: c.emoji })),
    { id: "evenements", label: "Fêtes", emoji: "🎉" },
  ];

  return (
    <>
      <Navbar />
      <main>
        <CarteHero />
        <CarteNav categories={navCategories} />
        <MenuSections menu={menu} />
        <CarteEvents />
      </main>
      <Footer waveColor="#FFFDF5" />
    </>
  );
}
