// src/components/layout/TestimonialsSection.tsx
"use client";
import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import { testimonials } from "@/data/testimonials";
import { useTranslations } from "next-intl";

export default function TestimonialsSection({ locale }: { locale: string }) {
  const t = useTranslations("home");

  return (
    <section className="max-w-7xl mx-auto px-6 py-20">
      <div className="mb-12 text-center">
        <div className="flex items-center justify-center gap-3 mb-3">
          <div className="w-6 h-px bg-terracotta" />
          <span className="font-mono text-[10px] tracking-[0.35em] text-terracotta uppercase">
            {locale === "pt" ? "Clientes" : "Clients"}
          </span>
          <div className="w-6 h-px bg-terracotta" />
        </div>
        <h2 className="font-display text-4xl md:text-5xl font-light text-offwhite">
          {t("testimonials_title")}
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {testimonials.map((t, i) => (
          <motion.div
            key={t.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08, duration: 0.6 }}
            className="bg-charcoal-700/40 border border-charcoal-600 p-6"
          >
            <Quote size={20} className="text-terracotta/40 mb-4" />
            <p className="font-sans text-sm text-charcoal-200 leading-relaxed mb-5">
              "{locale === "pt" ? t.text_pt : t.text_en}"
            </p>
            <div className="flex items-center justify-between">
              <div>
                <div className="font-sans text-sm font-medium text-offwhite">{t.name}</div>
                <div className="font-mono text-[10px] text-charcoal-400 tracking-wide mt-0.5">{t.neighborhood}</div>
              </div>
              <div className="flex gap-0.5">
                {[...Array(t.rating)].map((_, j) => (
                  <Star key={j} size={12} className="text-terracotta fill-terracotta" />
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
