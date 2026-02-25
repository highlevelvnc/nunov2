// src/app/[locale]/page.tsx
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import Link from "next/link";
import Hero from "@/components/layout/Hero";
import PropertyCard from "@/components/property/PropertyCard";
import TestimonialsSection from "@/components/layout/TestimonialsSection";
import SellCTASection from "@/components/layout/SellCTASection";
import { properties } from "@/data/properties";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: locale === "pt" ? "Imobiliário Residencial em Lisboa" : "Residential Real Estate in Lisbon",
    description:
      locale === "pt"
        ? "Comprar ou vender em Lisboa com acompanhamento real, respostas rápidas e resultados concretos."
        : "Buy or sell in Lisbon with real support, fast responses and concrete results.",
  };
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "home" });

  const featured = properties.filter((p) => p.status === "for_sale").slice(0, 6);

  return (
    <>
      <Hero locale={locale} />

      {/* Lisboa marquee stripe */}
      <div className="overflow-hidden bg-terracotta py-3">
        <div
          className="flex gap-12 whitespace-nowrap"
          style={{ animation: "marquee 30s linear infinite" }}
        >
          {[...Array(6)].map((_, i) => (
            <span key={i} className="font-mono text-[11px] tracking-[0.4em] uppercase text-white/80 inline-flex items-center gap-12 flex-shrink-0">
              Arroios · Alvalade · Campo de Ourique · Marvila · Estrela · Parque das Nações · Lumiar
            </span>
          ))}
        </div>
      </div>

      {/* Properties */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="flex items-end justify-between mb-12">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-6 h-px bg-terracotta" />
              <span className="font-mono text-[10px] tracking-[0.35em] text-terracotta uppercase">
                {locale === "pt" ? "Disponíveis Agora" : "Available Now"}
              </span>
            </div>
            <h2 className="font-display text-4xl md:text-5xl font-light text-offwhite">
              {t("properties_title")}
            </h2>
          </div>
          <Link
            href={`/${locale}/propriedades`}
            className="hidden md:flex items-center gap-2 font-sans text-sm text-charcoal-300 hover:text-offwhite transition-colors"
          >
            {locale === "pt" ? "Ver todos" : "View all"} →
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featured.map((p, i) => (
            <PropertyCard key={p.id} property={p} locale={locale} index={i} />
          ))}
        </div>

        <div className="mt-10 text-center md:hidden">
          <Link
            href={`/${locale}/propriedades`}
            className="inline-flex items-center gap-2 border border-charcoal-600 text-offwhite font-sans text-sm px-8 py-4 hover:border-charcoal-400 transition-colors"
          >
            {locale === "pt" ? "Ver todos os imóveis" : "View all properties"}
          </Link>
        </div>
      </section>

      <SellCTASection locale={locale} />
      <TestimonialsSection locale={locale} />
    </>
  );
}
