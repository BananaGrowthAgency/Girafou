import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FormuleDetail from "@/components/FormuleDetail";
import { FORMULES, formuleBySlug } from "@/lib/anniversaires";
import { hasLocale } from "@/lib/i18n/config";
import { fill, getDictionary } from "@/lib/i18n/dictionaries";
import { ui } from "@/lib/i18n/ui";
import { alternates } from "@/lib/i18n/seo";

// Pré-génère les 3 pages formules au build (SSG) — une fois par langue :
// Next exécute ce generateStaticParams pour chaque `lang` du layout parent.
export function generateStaticParams() {
  return FORMULES.map((f) => ({ slug: f.slug }));
}

export async function generateMetadata(
  props: PageProps<"/[lang]/anniversaires/[slug]">,
): Promise<Metadata> {
  const { lang, slug } = await props.params;
  if (!hasLocale(lang)) notFound();
  const { meta, anniversaires } = await getDictionary(lang);

  const texte = anniversaires.formules[slug];
  if (!texte) return { title: meta.formuleDetail.fallback };

  const values = {
    name: ui(lang).names.formules[slug],
    price: texte.price,
    tagline: texte.tagline,
  };
  return {
    alternates: alternates(lang, `/anniversaires/${slug}`),
    title: fill(meta.formuleDetail.title, values),
    description: fill(meta.formuleDetail.description, values),
  };
}

export default async function FormulePage(props: PageProps<"/[lang]/anniversaires/[slug]">) {
  const { lang, slug } = await props.params;
  if (!hasLocale(lang)) notFound();

  const formule = formuleBySlug(slug);
  if (!formule) notFound();

  const dict = await getDictionary(lang);

  return (
    <>
      <Navbar />
      <main>
        <FormuleDetail
          formule={formule}
          t={dict.pages.anniversaires.detail}
          anniversaires={dict.anniversaires}
        />
      </main>
      <Footer waveColor="#FFFDF5" />
    </>
  );
}
