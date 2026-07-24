import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Karaoke from "@/components/Karaoke";
import { hasLocale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { alternates } from "@/lib/i18n/seo";

export async function generateMetadata({
  params,
}: PageProps<"/[lang]/karaoke">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const { meta } = await getDictionary(lang);
  return {
    title: meta.karaoke.title, description: meta.karaoke.description,
    alternates: alternates(lang, "/karaoke"),
  };
}

export default async function KaraokePage({ params }: PageProps<"/[lang]/karaoke">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang);

  return (
    <>
      <Navbar />
      <main>
        <Karaoke t={dict.pages.karaoke} />
      </main>
      <Footer waveColor="#150A2E" />
    </>
  );
}
