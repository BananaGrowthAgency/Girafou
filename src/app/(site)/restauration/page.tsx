import type { Metadata } from "next";
import { cookies } from "next/headers";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CarteHero from "@/components/CarteHero";
import CarteEvents from "@/components/CarteEvents";
import EditableMenu from "@/components/EditableMenu";
import { getMenu } from "@/lib/menu/store";
import { SESSION_COOKIE, verifySessionToken } from "@/lib/auth";

export const metadata: Metadata = {
  title: "La Carte — Girafou",
  description:
    "Pizzas maison, crêpes, gaufres, glaces et boissons à déguster sur place au parc Girafou, près de Caen.",
};

export default async function RestaurationPage() {
  const menu = await getMenu();

  // Only a logged-in manager sees the edit affordances (pencil, in-place editing).
  const token = (await cookies()).get(SESSION_COOKIE)?.value;
  const editable = await verifySessionToken(token);

  return (
    <>
      <Navbar />
      <main>
        <CarteHero />
        <EditableMenu menu={menu} editable={editable} />
        <CarteEvents />
      </main>
      <Footer waveColor="#FFFDF5" />
    </>
  );
}
