import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ContactForm from "@/components/ContactForm";
import { hasLocale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { alternates } from "@/lib/i18n/seo";

export async function generateMetadata({
  params,
}: PageProps<"/[lang]/contactez-nous">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const { meta } = await getDictionary(lang);
  return {
    title: meta.contact.title, description: meta.contact.description,
    alternates: alternates(lang, "/contactez-nous"),
  };
}

export default async function ContactezNousPage({ params }: PageProps<"/[lang]/contactez-nous">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang);

  return (
    <>
      <Navbar />
      <main>
        <ContactForm t={dict.pages.contact} />
      </main>
      <Footer waveColor="#FFFDF5" />
    </>
  );
}
