import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AnniversairesHub from "@/components/AnniversairesHub";
import { SECTION_BG as REVIEWS_BG } from "@/components/Reviews";
import { hasLocale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { alternates } from "@/lib/i18n/seo";

export async function generateMetadata({
  params,
}: PageProps<"/[lang]/anniversaires">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const { meta } = await getDictionary(lang);
  return {
    title: meta.anniversaires.title, description: meta.anniversaires.description,
    alternates: alternates(lang, "/anniversaires"),
  };
}

export default async function AnniversairesPage({ params }: PageProps<"/[lang]/anniversaires">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang);

  return (
    <>
      <Navbar />
      <main>
        <AnniversairesHub
          t={dict.pages.anniversaires.hub}
          reviews={dict.pages.anniversaires.reviews}
          formules={dict.anniversaires.formules}
          anniversaires={dict.anniversaires}
        />
      </main>
      <Footer waveColor={REVIEWS_BG} />
    </>
  );
}
