"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { CHAUSSETTES } from "@/lib/anniversaires";

const BALOO = "var(--font-baloo)";
const NUNITO = "var(--font-nunito)";

// Encart « Chaussettes obligatoires » — badge rouge flottant + carte blanche,
// identique au bloc utilisé sur les pages Anniversaires / Activités.
export default function ChaussettesNote({ text = CHAUSSETTES }: { text?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5 }}
      className="relative flex items-center gap-4 rounded-2xl bg-white border border-amber-100 shadow-md p-5 lg:pl-24"
    >
      {/* Badge flottant (desktop) — coin haut-gauche */}
      <motion.div
        className="hidden lg:block absolute pointer-events-none select-none z-10"
        style={{ left: "-1.9rem", top: "-2rem" }}
      >
        <motion.div
          initial={{ opacity: 0, x: -30, scale: 0.9 }}
          animate={inView ? { opacity: 1, x: 0, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.div
            animate={{ y: [0, -10, -2, -8, 0], rotateZ: [0, 2, 0, -2, 0] }}
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
                style={{ height: "clamp(66px, 7vw, 92px)", width: "auto", display: "block", filter: "drop-shadow(-3px 8px 14px rgba(0,0,0,0.18))" }}
              />
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Sticker (mobile) */}
      <motion.div
        className="lg:hidden flex-shrink-0"
        animate={{ y: [0, -8, 0], rotateZ: [0, 2, 0, -2, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/chaussettes-obligatoires.png"
          alt="Chaussettes obligatoires"
          style={{ height: 56, width: "auto", display: "block", filter: "drop-shadow(-2px 6px 10px rgba(0,0,0,0.18))" }}
        />
      </motion.div>

      <div>
        <p className="font-extrabold text-amber-900 mb-0.5" style={{ fontFamily: BALOO }}>Chaussettes obligatoires</p>
        <p className="text-sm text-amber-800/60 leading-snug" style={{ fontFamily: NUNITO }}>{text}</p>
      </div>
    </motion.div>
  );
}
