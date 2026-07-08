import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ActiviteDetail from "@/components/ActiviteDetail";
import { ACTIVITES, activiteBySlug } from "@/lib/activites";

// Pré-génère les 9 pages d'activités au build (SSG).
export function generateStaticParams() {
  return ACTIVITES.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata(props: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await props.params;
  const a = activiteBySlug(slug);
  if (!a) return { title: "Activité — Girafou" };
  return {
    title: `${a.name} — Activités Girafou, près de Caen`,
    description: `${a.name} : ${a.tagline.toLowerCase()}. ${a.description[0]} À découvrir au parc de jeux couvert Girafou, à Bénouville près de Caen.`,
  };
}

export default async function ActivitePage(props: { params: Promise<{ slug: string }> }) {
  const { slug } = await props.params;
  const activite = activiteBySlug(slug);
  if (!activite) notFound();

  return (
    <>
      <Navbar />
      <main>
        <ActiviteDetail activite={activite} />
      </main>
      <Footer waveColor="#FFFDF5" />
    </>
  );
}
