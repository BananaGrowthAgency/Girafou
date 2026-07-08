import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Activities from "@/components/Activities";
import WhyGirafou from "@/components/WhyGirafou";
import Restauration from "@/components/Restauration";
import Birthday from "@/components/Birthday";
import PracticalInfo from "@/components/PracticalInfo";
import Footer from "@/components/Footer";

export default function Home() {
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
        <Restauration />
        <Birthday />
        <PracticalInfo />
      </main>
      <Footer />
    </>
  );
}
