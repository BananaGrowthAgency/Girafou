import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PrixEntrees from "@/components/PrixEntrees";
import { hasLocale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { alternates } from "@/lib/i18n/seo";

export async function generateMetadata({
  params,
}: PageProps<"/[lang]/prix-des-entrees">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const { meta } = await getDictionary(lang);
  return {
    title: meta.prix.title, description: meta.prix.description,
    alternates: alternates(lang, "/prix-des-entrees"),
  };
}

export default async function PrixDesEntreesPage({ params }: PageProps<"/[lang]/prix-des-entrees">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang);

  return (
    <>
      <Navbar />
      <main>
        <PrixEntrees t={dict.pages.prix} />
      </main>
      <Footer waveColor="#FFFDF5" />
    </>
  );
}
