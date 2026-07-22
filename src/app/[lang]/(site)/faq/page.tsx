import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Faq from "@/components/Faq";
import { hasLocale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { alternates } from "@/lib/i18n/seo";

export async function generateMetadata({ params }: PageProps<"/[lang]/faq">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const { meta } = await getDictionary(lang);
  return {
    title: meta.faq.title, description: meta.faq.description,
    alternates: alternates(lang, "/faq"),
  };
}

export default async function FaqPage({ params }: PageProps<"/[lang]/faq">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang);

  return (
    <>
      <Navbar />
      <main>
        <Faq t={dict.pages.faq} />
      </main>
      <Footer waveColor="#FFF3D0" />
    </>
  );
}
