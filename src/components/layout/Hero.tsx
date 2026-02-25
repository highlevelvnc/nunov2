// src/components/layout/Hero.tsx
"use client";
import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, MessageCircle, TrendingUp } from "lucide-react";
import { useStore } from "@/store";
import { useTranslations } from "next-intl";

// ⚠️ CRITICAL: ssr:false prevents Three.js from running on the server
// (Three.js accesses window/document which don't exist server-side)
const LisboaCanvas = dynamic(() => import("@/components/webgl/LisboaCanvas"), {
  ssr: false,
  loading: () => null,
});

const WHATSAPP = "https://wa.me/351938391853";
const HERO_BG_IMAGE = "https://images.unsplash.com/photo-1555881400-74d7acaacd8b?w=1800&q=85";

export default function Hero({ locale }: { locale: string }) {
  const { perfMode } = useStore();
  const t = useTranslations("home");
  const [mounted, setMounted] = useState(false);

  // Only render WebGL after hydration
  useEffect(() => {
    setMounted(true);
  }, []);

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.12, delayChildren: 0.4 } },
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] } },
  };

  return (
    <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden">

      {/* Foto de fundo */}
      <div className="absolute inset-0">
        <Image
          src={HERO_BG_IMAGE}
          alt="Lisboa"
          fill
          priority
          quality={85}
          className="object-cover object-center"
          sizes="100vw"
        />
      </div>

      {/* WebGL overlay — only after mount + high perf */}
      {mounted && perfMode === "high" && (
        <div className="absolute inset-0 mix-blend-overlay opacity-50 pointer-events-none">
          <LisboaCanvas />
        </div>
      )}

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900/95 via-charcoal-900/55 to-charcoal-900/25" />

      {/* Grain */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Content */}
      <motion.div
        className="relative z-10 max-w-6xl mx-auto px-6 pt-20 pb-16"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants} className="flex items-center gap-3 mb-8">
          <div className="w-8 h-px bg-terracotta" />
          <span className="font-mono text-[11px] tracking-[0.35em] text-terracotta uppercase">
            Lisboa · Imobiliário Residencial
          </span>
        </motion.div>

        <motion.h1
          variants={itemVariants}
          className="font-display font-light text-6xl md:text-7xl lg:text-[6rem] xl:text-[7rem] leading-[0.95] tracking-[-0.02em] text-offwhite mb-8"
        >
          {t("headline")}
        </motion.h1>

        <motion.p
          variants={itemVariants}
          className="font-sans text-base md:text-lg text-offwhite/70 max-w-xl leading-relaxed mb-12"
        >
          {t("subheadline")}
        </motion.p>

        <motion.div variants={itemVariants} className="flex flex-wrap gap-4">
          <Link
            href={`/${locale}/contato`}
            className="flex items-center gap-2 bg-terracotta hover:bg-terracotta-light text-white font-sans text-sm px-7 py-4 transition-all duration-200 hover:gap-3"
          >
            {t("cta_visit")} <ArrowRight size={16} />
          </Link>
          <Link
            href={`/${locale}/vender`}
            className="flex items-center gap-2 bg-charcoal-800/60 backdrop-blur-sm border border-offwhite/20 hover:border-offwhite/50 text-offwhite font-sans text-sm px-7 py-4 transition-all duration-200"
          >
            <TrendingUp size={16} /> {t("cta_eval")}
          </Link>
          <a
            href={WHATSAPP}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-offwhite/70 hover:text-offwhite font-sans text-sm px-4 py-4 transition-colors duration-200"
          >
            <MessageCircle size={16} /> {t("cta_whatsapp")}
          </a>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6 border-t border-offwhite/15 pt-10"
        >
          {[
            { value: "320+", label: t("stats_deals") },
            { value: "12",   label: t("stats_years") },
            { value: "21",   label: t("stats_days") },
            { value: "98%",  label: t("stats_satisfaction") },
          ].map(({ value, label }) => (
            <div key={label}>
              <div className="font-display text-3xl md:text-4xl font-light text-offwhite mb-1">{value}</div>
              <div className="font-sans text-xs text-offwhite/50 tracking-wide">{label}</div>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="flex flex-col items-center gap-2">
          <div className="w-px h-12 bg-gradient-to-b from-transparent to-offwhite/30" />
          <div className="font-mono text-[10px] tracking-widest text-offwhite/30 rotate-90 mt-2">SCROLL</div>
        </div>
      </motion.div>
    </section>
  );
}
