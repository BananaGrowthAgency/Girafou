import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Activities from "@/components/Activities";
import WhyGirafou from "@/components/WhyGirafou";
import Restauration from "@/components/Restauration";
import Birthday from "@/components/Birthday";
import PracticalInfo from "@/components/PracticalInfo";
import Footer from "@/components/Footer";
import { getMenu } from "@/lib/menu/store";
import { buildRestaurationSummary } from "@/lib/menu/summary";

export default async function Home() {
  // Le résumé « restauration » lit la même source que la carte complète, pour
  // que les plats et les prix ne divergent jamais de /restauration.
  const restaurationCards = buildRestaurationSummary(await getMenu());

  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Activities />
        <WhyGirafou />
        {/* Wave divider */}
        <div className="relative w-full pointer-events-none" style={{ height: 100, marginTop: -2, marginBottom: -100, zIndex: 10 }}>
          <svg viewBox="0 0 1440 100" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" className="w-full h-full">
            <path d="M0,0 L1440,0 L1440,40 C1200,100 960,10 720,60 C480,110 240,30 0,70 Z" fill="#FFFDF5" />
          </svg>
        </div>
        <Restauration cards={restaurationCards} />
        <Birthday />
        <PracticalInfo />
      </main>
      <Footer />
    </>
  );
}
