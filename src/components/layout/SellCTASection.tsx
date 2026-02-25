// src/components/layout/SellCTASection.tsx
"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle } from "lucide-react";
import Image from "next/image";

export default function SellCTASection({ locale }: { locale: string }) {
  const isPt = locale === "pt";

  const points = isPt ? [
    "Avaliação realista com dados reais de mercado",
    "Fotografia e vídeo profissional incluídos",
    "Divulgação nos principais portais imobiliários",
    "Acompanhamento até à escritura, sem surpresas",
  ] : [
    "Realistic valuation with real market data",
    "Professional photography and video included",
    "Promotion on major real estate portals",
    "Accompanied until the deed, no surprises",
  ];

  return (
    <section className="relative overflow-hidden py-24 bg-charcoal-700/30 border-y border-charcoal-700">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-6 h-px bg-terracotta" />
              <span className="font-mono text-[10px] tracking-[0.35em] text-terracotta uppercase">
                {isPt ? "Quer Vender?" : "Want to Sell?"}
              </span>
            </div>
            <h2 className="font-display text-4xl md:text-5xl font-light text-offwhite mb-4 leading-tight">
              {isPt ? "Venda bem. Venda rápido." : "Sell well. Sell fast."}
            </h2>
            <p className="font-sans text-charcoal-300 leading-relaxed mb-8">
              {isPt
                ? "Avaliação gratuita, estratégia de venda e acompanhamento do início ao fim. Sem compromisso."
                : "Free valuation, sales strategy and support from start to finish. No commitment."}
            </p>
            <ul className="space-y-3 mb-10">
              {points.map((point) => (
                <li key={point} className="flex items-start gap-3">
                  <CheckCircle size={16} className="text-terracotta flex-shrink-0 mt-0.5" />
                  <span className="font-sans text-sm text-charcoal-200">{point}</span>
                </li>
              ))}
            </ul>
            <Link
              href={`/${locale}/vender`}
              className="inline-flex items-center gap-2 bg-terracotta hover:bg-terracotta-light text-white font-sans text-sm px-8 py-4 transition-colors"
            >
              {isPt ? "Pedir Avaliação Gratuita" : "Request Free Valuation"}
              <ArrowRight size={16} />
            </Link>
          </motion.div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
            className="relative aspect-[4/3] overflow-hidden"
          >
            <Image
              src="https://images.unsplash.com/photo-1555881400-74d7acaacd8b?w=900&q=80"
              alt="Lisboa"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-charcoal-800/20" />
            <div className="absolute bottom-4 left-4 bg-glass px-4 py-2">
              <div className="font-mono text-[10px] tracking-widest text-charcoal-300 uppercase">
                {isPt ? "Tempo médio de venda" : "Average selling time"}
              </div>
              <div className="font-display text-2xl text-offwhite">21 {isPt ? "dias" : "days"}</div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
