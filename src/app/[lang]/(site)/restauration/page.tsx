import type { Metadata } from "next";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CarteHero from "@/components/CarteHero";
import CarteEvents from "@/components/CarteEvents";
import EditableMenu from "@/components/EditableMenu";
import { getMenu } from "@/lib/menu/store";
import { localizeMenu } from "@/lib/menu/localize";
import { SESSION_COOKIE, verifySessionToken } from "@/lib/auth";
import { hasLocale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { alternates } from "@/lib/i18n/seo";

export async function generateMetadata({
  params,
}: PageProps<"/[lang]/restauration">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const { meta } = await getDictionary(lang);
  return {
    title: meta.restauration.title, description: meta.restauration.description,
    alternates: alternates(lang, "/restauration"),
  };
}

export default async function RestaurationPage({ params }: PageProps<"/[lang]/restauration">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  const dict = await getDictionary(lang);
  const menu = await getMenu();

  // Only a logged-in manager sees the edit affordances (pencil, in-place editing).
  const token = (await cookies()).get(SESSION_COOKIE)?.value;
  const editable = await verifySessionToken(token);

  // Les titres de rubrique sont traduits à l'affichage seulement : en mode
  // édition le gérant travaille sur les valeurs françaises réelles du CMS,
  // sinon un enregistrement écraserait le français par la traduction.
  const shown = editable ? menu : localizeMenu(menu, dict.carte);

  return (
    <>
      <Navbar />
      <main>
        <CarteHero t={dict.pages.restauration} />
        <EditableMenu menu={shown} editable={editable} eventsLabel={dict.carte.eventsLabel} />
        <CarteEvents t={dict.pages.restauration} />
      </main>
      <Footer waveColor="#FFFDF5" />
    </>
  );
}
