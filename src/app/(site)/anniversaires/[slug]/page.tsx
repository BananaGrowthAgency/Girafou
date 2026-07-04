import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FormuleDetail from "@/components/FormuleDetail";
import { FORMULES, formuleBySlug } from "@/lib/anniversaires";

// Pré-génère les 3 pages formules au build (SSG).
export function generateStaticParams() {
  return FORMULES.map((f) => ({ slug: f.slug }));
}

export async function generateMetadata(props: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await props.params;
  const f = formuleBySlug(slug);
  if (!f) return { title: "Anniversaire — Girafou" };
  return {
    title: `${f.name} — Anniversaire chez Girafou`,
    description: `${f.name} : anniversaire tout inclus à ${f.price} par enfant chez Girafou, près de Caen. ${f.tagline}.`,
  };
}

export default async function FormulePage(props: { params: Promise<{ slug: string }> }) {
  const { slug } = await props.params;
  const formule = formuleBySlug(slug);
  if (!formule) notFound();

  return (
    <>
      <Navbar />
      <main>
        <FormuleDetail formule={formule} />
      </main>
      <Footer />
    </>
  );
}
