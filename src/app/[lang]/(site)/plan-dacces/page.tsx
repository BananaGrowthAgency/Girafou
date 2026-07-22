import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PlanAcces from "@/components/PlanAcces";
import { hasLocale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { alternates } from "@/lib/i18n/seo";

export async function generateMetadata({
  params,
}: PageProps<"/[lang]/plan-dacces">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const { meta } = await getDictionary(lang);
  return {
    title: meta.planAcces.title, description: meta.planAcces.description,
    alternates: alternates(lang, "/plan-dacces"),
  };
}

export default async function PlanAccesPage({ params }: PageProps<"/[lang]/plan-dacces">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang);

  return (
    <>
      <Navbar />
      <main>
        <PlanAcces t={dict.pages.planAcces} />
      </main>
      <Footer waveColor="#FFFDF5" />
    </>
  );
}
