"use client";

import { useRef, useState } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ACTIVITES, type Activite } from "@/lib/activites";

function ActivityCard({ act, index }: { act: Activite; index: number }) {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [imgErr, setImgErr] = useState(false);

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    const x = ((e.clientY - r.top) / r.height - 0.5) * 14;
    const y = ((e.clientX - r.left) / r.width - 0.5) * 14;
    setTilt({ x, y });
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 55, scale: 0.96 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.55, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
      onMouseMove={onMove}
      onMouseLeave={() => setTilt({ x: 0, y: 0 })}
      className="tilt-card group relative rounded-3xl overflow-hidden bg-white shadow-lg hover:shadow-2xl transition-shadow duration-300 cursor-pointer"
      style={{
        transform: `perspective(900px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
        transition: "transform 0.25s ease, box-shadow 0.3s",
      }}
    >
      {/* Image zone */}
      <div className="relative h-48 overflow-hidden" style={{ background: act.accentLight }}>
        {!imgErr ? (
          <Image
            src={act.image}
            alt={act.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            onError={() => setImgErr(true)}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        ) : (
          /* Placeholder shown until real photo is provided */
          <div className="absolute inset-0 img-placeholder rounded-none border-0" style={{ background: act.accentLight }}>
            <span className="text-4xl opacity-40">📸</span>
            <span className="text-xs opacity-50">photo/{act.slug}.jpg</span>
          </div>
        )}

        {/* Gradient overlay at bottom of image */}
        <div
          className="absolute bottom-0 left-0 right-0 h-16"
          style={{ background: `linear-gradient(to top, ${act.accentLight}, transparent)` }}
        />
      </div>

      {/* Text */}
      <div className="p-5 flex flex-col gap-3">
        <h3
          className="text-xl font-extrabold mb-0.5"
          style={{ fontFamily: "var(--font-baloo)", color: act.accent }}
        >
          {act.name}
        </h3>
        <p
          className="text-sm text-amber-900/60 leading-relaxed flex-1"
          style={{ fontFamily: "var(--font-nunito)" }}
        >
          {act.cardDesc}
        </p>
        <Link
          href={`/activites/${act.slug}`}
          className="self-start mt-1 px-4 py-2 rounded-xl text-white text-xs font-extrabold transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
          style={{ background: act.accent, fontFamily: "var(--font-nunito)" }}
        >
          En savoir +
        </Link>
      </div>

      {/* Shine on hover */}
      <div
        className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-400"
        style={{
          background: `radial-gradient(circle at ${50 + tilt.y * 2}% ${50 + tilt.x * 2}%, rgba(255,255,255,0.22) 0%, transparent 60%)`,
        }}
      />
    </motion.div>
  );
}

export default function Activities() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] });
  const socksOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);

  return (
    <section ref={sectionRef} id="activites" className="relative pt-28 pb-24 overflow-hidden spots-pattern" style={{ background: "linear-gradient(160deg, #FFF8E1 0%, #FFF3C4 50%, #FFE8A0 100%)" }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-10">

        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="relative text-center mb-14"
        >
          {/* Socks mascot — desktop : flotte à gauche du h2 */}
          <motion.div
            className="hidden lg:block absolute pointer-events-none select-none z-10"
            style={{ left: "-1rem", top: "-8%", opacity: socksOpacity }}
          >
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            >
            <motion.div
              animate={{ y: [0, -14, -3, -10, 0], rotateZ: [0, 2, 0, -2, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              style={{ perspective: 900, transformStyle: "preserve-3d" }}
            >
              <motion.div
                animate={{ rotateY: [0, 8, 0, -8, 0], rotateX: [0, 4, 6, 2, 0], scale: [1, 1.04, 1.01, 1.03, 1] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                style={{ transformStyle: "preserve-3d" }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/chaussettes-obligatoires.png"
                  alt="Chaussettes obligatoires"
                  style={{
                    height: "clamp(80px, 10vw, 130px)",
                    width: "auto",
                    display: "block",
                    filter: "drop-shadow(-3px 8px 14px rgba(0,0,0,0.18))",
                  }}
                />
              </motion.div>
            </motion.div>
            </motion.div>
          </motion.div>
          <motion.span
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-50 border border-amber-200 text-amber-700 text-sm font-bold mb-4"
            style={{ fontFamily: "var(--font-nunito)" }}
          >
            9 activités pour s&rsquo;amuser sans limites
          </motion.span>
          <h2
            className="text-3xl sm:text-5xl md:text-6xl font-extrabold text-amber-900 mb-3 leading-tight"
            style={{ fontFamily: "var(--font-baloo)" }}
          >
            Des aventures pour{" "}
            <span className="text-giraffe">tous les âges</span>
          </h2>
          <p
            className="text-lg text-amber-800/60 max-w-xl mx-auto"
            style={{ fontFamily: "var(--font-nunito)" }}
          >
            Chaque visite chez Girafou est une nouvelle aventure. Survole, saute, joue, glisse…
          </p>
        </motion.div>

        {/* Grid */}
        <div className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Socks mascot — mobile : flotte juste au-dessus des cartes, à gauche (n'occupe pas d'espace) */}
          <motion.div
            className="lg:hidden absolute -left-2 bottom-full -mb-3 pointer-events-none select-none z-0"
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <motion.div
              animate={{ y: [0, -10, 0], rotateZ: [0, 2, 0, -2, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/chaussettes-obligatoires.png"
                alt="Chaussettes obligatoires"
                style={{ height: 72, width: "auto", display: "block", filter: "drop-shadow(-3px 8px 14px rgba(0,0,0,0.18))" }}
              />
            </motion.div>
          </motion.div>
          {ACTIVITES.map((act, i) => (
            <ActivityCard key={act.slug} act={act} index={i} />
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.7 }}
          className="mt-12 text-center"
        >
          <a
            href="#infos"
            className="btn-shine inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 text-white font-extrabold text-lg shadow-xl shadow-amber-200 hover:shadow-amber-300 hover:-translate-y-1 transition-all duration-200"
            style={{ fontFamily: "var(--font-nunito)" }}
          >
            Tarifs & horaires →
          </a>
        </motion.div>
      </div>
    </section>
  );
}
