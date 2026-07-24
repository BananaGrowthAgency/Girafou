import { existsSync } from "node:fs";
import { join } from "node:path";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ActiviteDetail from "@/components/ActiviteDetail";
import { ACTIVITES, activiteBySlug } from "@/lib/activites";
import { hasLocale } from "@/lib/i18n/config";
import { fill, getDictionary } from "@/lib/i18n/dictionaries";
import { ui } from "@/lib/i18n/ui";
import { alternates } from "@/lib/i18n/seo";

// Pré-génère les 9 pages d'activités au build (SSG) — une fois par langue :
// Next exécute ce generateStaticParams pour chaque `lang` du layout parent.
export function generateStaticParams() {
  return ACTIVITES.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata(
  props: PageProps<"/[lang]/activites/[slug]">,
): Promise<Metadata> {
  const { lang, slug } = await props.params;
  if (!hasLocale(lang)) notFound();
  const { meta, activites } = await getDictionary(lang);

  const texte = activites[slug];
  if (!texte) return { title: meta.activiteDetail.fallback };

  const values = {
    name: ui(lang).names.activites[slug],
    tagline: texte.tagline.toLowerCase(),
    desc: texte.description[0],
  };
  return {
    alternates: alternates(lang, `/activites/${slug}`),
    title: fill(meta.activiteDetail.title, values),
    description: fill(meta.activiteDetail.description, values),
  };
}

export default async function ActivitePage(props: PageProps<"/[lang]/activites/[slug]">) {
  const { lang, slug } = await props.params;
  if (!hasLocale(lang)) notFound();

  const activite = activiteBySlug(slug);
  if (!activite) notFound();

  const dict = await getDictionary(lang);

  // Le bloc « Grande Fête » n'affiche sa vidéo que si le fichier a été déposé
  // dans public/videos/ — sinon on rend juste le texte, pas un lecteur vide.
  // Vérifié côté serveur (SSG) : pas de coût client, et ça se met à jour dès
  // que le parc ajoute la vidéo.
  const grandeFeteVideo = existsSync(join(process.cwd(), "public/videos/grande-fete.mp4"))
    ? "/videos/grande-fete.mp4"
    : null;

  // Vidéo illustrative de « L'attraction », propre à chaque activité : elle
  // n'apparaît que si public/videos/attraction-<slug>.mp4 a été déposé.
  const attractionVideo = existsSync(join(process.cwd(), `public/videos/attraction-${activite.slug}.mp4`))
    ? `/videos/attraction-${activite.slug}.mp4`
    : null;

  // À défaut de vidéo, une simple photo illustrative
  // (public/images/attraction-<slug>/photo.jpg) occupe le même emplacement.
  const attractionImage = existsSync(join(process.cwd(), `public/images/attraction-${activite.slug}/photo.jpg`))
    ? `/images/attraction-${activite.slug}/photo.jpg`
    : null;

  return (
    <>
      <Navbar />
      <main>
        <ActiviteDetail
          activite={activite}
          t={dict.pages.activites.detail}
          activites={dict.activites}
          grandeFeteVideo={grandeFeteVideo}
          attractionVideo={attractionVideo}
          attractionImage={attractionImage}
        />
      </main>
      <Footer waveColor="#FFFDF5" />
    </>
  );
}
