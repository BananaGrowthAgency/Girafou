import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import NosOffres from "@/components/NosOffres";
import { hasLocale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { alternates } from "@/lib/i18n/seo";

export async function generateMetadata({
  params,
}: PageProps<"/[lang]/nos-offres">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const { meta } = await getDictionary(lang);
  return {
    title: meta.nosOffres.title, description: meta.nosOffres.description,
    alternates: alternates(lang, "/nos-offres"),
  };
}

export default async function NosOffresPage({ params }: PageProps<"/[lang]/nos-offres">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang);

  return (
    <>
      <Navbar />
      <main>
        <NosOffres t={dict.pages.nosOffres} />
      </main>
      <Footer waveColor="#FFFDF5" />
    </>
  );
}
