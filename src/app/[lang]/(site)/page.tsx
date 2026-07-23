import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Activities from "@/components/Activities";
import WhyGirafou from "@/components/WhyGirafou";
import Restauration from "@/components/Restauration";
import Birthday from "@/components/Birthday";
import Fidelite from "@/components/Fidelite";
import Reviews, { REVIEWS_PARC, SECTION_BG as REVIEWS_BG } from "@/components/Reviews";
import Wave from "@/components/Wave";
import PracticalInfo from "@/components/PracticalInfo";
import Footer from "@/components/Footer";
import { getMenu } from "@/lib/menu/store";
import { buildRestaurationSummary } from "@/lib/menu/summary";
import { hasLocale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { alternates } from "@/lib/i18n/seo";
import type { Metadata } from "next";

// Le titre et la description viennent du layout [lang] ; ici on ne pose que
// le canonical et les alternates, qui sont propres à la page.
export async function generateMetadata({ params }: PageProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  return { alternates: alternates(lang, "/") };
}

// Le dictionnaire est lu ici, côté serveur, et distribué en tranches aux
// composants : chacun ne reçoit que ses propres textes, et le JSON complet ne
// part jamais dans le bundle client.
export default async function Home({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  const dict = await getDictionary(lang);
  const t = dict.home;

  // Le résumé « restauration » lit la même source que la carte complète, pour
  // que les plats et les prix ne divergent jamais de /restauration.
  const restaurationCards = buildRestaurationSummary(await getMenu(), dict.carte);

  return (
    <>
      <Navbar />
      <main>
        <Hero t={t.hero} />
        <Activities t={t.activities} toddler={t.toddler} activites={dict.activites} />
        <WhyGirafou t={t.why} />
        {/* Wave divider */}
        <div className="relative w-full pointer-events-none" style={{ height: 100, marginTop: -2, marginBottom: -100, zIndex: 10 }}>
          <svg viewBox="0 0 1440 100" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" className="w-full h-full">
            <path d="M0,0 L1440,0 L1440,40 C1200,100 960,10 720,60 C480,110 240,30 0,70 Z" fill="#FFFDF5" />
          </svg>
        </div>
        <Restauration cards={restaurationCards} t={t.restauration} />
        <Birthday t={t.birthday} formules={dict.anniversaires.formules} />
        <Fidelite t={t.fidelite} />
        {/* Les avis coupent sur fond sombre entre le blanc des anniversaires et
            le crème des infos pratiques — d'où une vague de chaque côté. */}
        <Wave above="#ffffff" fill={REVIEWS_BG} />
        <Reviews t={t.reviews} appId={REVIEWS_PARC} />
        <Wave above={REVIEWS_BG} fill="#FFF8E1" />
        <PracticalInfo t={t.practical} beach={dict.pages.prix.beach} />
      </main>
      <Footer />
    </>
  );
}
