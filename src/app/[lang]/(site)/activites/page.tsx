import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ActivitesHub from "@/components/ActivitesHub";
import { hasLocale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { alternates } from "@/lib/i18n/seo";

export async function generateMetadata({ params }: PageProps<"/[lang]/activites">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const { meta } = await getDictionary(lang);
  return {
    title: meta.activites.title, description: meta.activites.description,
    alternates: alternates(lang, "/activites"),
  };
}

export default async function ActivitesPage({ params }: PageProps<"/[lang]/activites">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang);

  return (
    <>
      <Navbar />
      <main>
        <ActivitesHub t={dict.pages.activites.hub} activites={dict.activites} />
      </main>
      <Footer waveColor="#FFFDF5" />
    </>
  );
}
