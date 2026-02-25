// src/app/[locale]/propriedades/[slug]/page.tsx
"use client";
import { use, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Bed, Bath, Maximize2, MapPin, X, ChevronLeft, ChevronRight, MessageCircle, Download, Tv2 } from "lucide-react";
import { properties } from "@/data/properties";
import { formatPrice } from "@/lib/utils";

const WHATSAPP_BASE = "https://wa.me/351938391853";

export default function PropertyDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = use(params);
  const property = properties.find((p) => p.slug === slug);
  if (!property) notFound();

  const [lightbox, setLightbox] = useState<number | null>(null);
  const isPt = locale === "pt";

  const whatsappMsg = encodeURIComponent(
    `Olá! Tenho interesse no imóvel "${property.title}" (${formatPrice(property.price)}).`
  );

  return (
    <div className="pt-16 min-h-screen">
      {/* Hero gallery */}
      <div className="relative">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-1 h-[60vh]">
          {property.images.slice(0, 4).map((img, i) => (
            <button
              key={i}
              onClick={() => setLightbox(i)}
              className={`relative overflow-hidden ${i === 0 ? "col-span-2 row-span-2" : ""}`}
            >
              <Image
                src={img}
                alt={`${property.title} — ${i + 1}`}
                fill
                className="object-cover hover:scale-105 transition-transform duration-500"
              />
              {i === 0 && (
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal-800/50 to-transparent" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main info */}
          <div className="lg:col-span-2">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 font-mono text-[10px] tracking-widest text-charcoal-400 uppercase mb-6">
              <Link href={`/${locale}`} className="hover:text-offwhite transition-colors">
                {isPt ? "Início" : "Home"}
              </Link>
              <span>/</span>
              <Link href={`/${locale}/propriedades`} className="hover:text-offwhite transition-colors">
                {isPt ? "Propriedades" : "Properties"}
              </Link>
              <span>/</span>
              <span className="text-offwhite truncate max-w-[200px]">{property.title}</span>
            </div>

            <div className="flex items-start justify-between gap-4 mb-2">
              <h1 className="font-display text-3xl md:text-4xl font-light text-offwhite leading-tight">
                {property.title}
              </h1>
              <div className="flex-shrink-0">
                <span className="bg-terracotta/20 border border-terracotta/30 text-terracotta font-mono text-[10px] tracking-widest uppercase px-2 py-1">
                  {isPt ? "Para Venda" : "For Sale"}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2 mb-6">
              <MapPin size={14} className="text-terracotta" />
              <span className="font-sans text-charcoal-300">{property.neighborhood}, Lisboa</span>
            </div>

            <div className="font-display text-4xl font-light text-offwhite mb-8">
              {formatPrice(property.price)}
            </div>

            {/* Quick specs */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
              {[
                { icon: <Bed size={18} />, label: isPt ? "Tipologia" : "Type", value: `T${property.bedrooms}` },
                { icon: <Bath size={18} />, label: isPt ? "Casas Banho" : "Bathrooms", value: property.bathrooms.toString() },
                { icon: <Maximize2 size={18} />, label: isPt ? "Área" : "Area", value: `${property.area_m2} m²` },
                { icon: <MapPin size={18} />, label: isPt ? "Piso" : "Floor", value: property.floor !== undefined ? property.floor.toString() : "R/C" },
              ].map(({ icon, label, value }) => (
                <div key={label} className="bg-charcoal-700/40 border border-charcoal-600 p-4">
                  <div className="text-terracotta mb-2">{icon}</div>
                  <div className="font-mono text-[9px] tracking-widest text-charcoal-400 uppercase mb-1">{label}</div>
                  <div className="font-display text-xl text-offwhite">{value}</div>
                </div>
              ))}
            </div>

            {/* Description */}
            <div className="mb-10">
              <h2 className="font-display text-xl text-offwhite mb-4">
                {isPt ? "Descrição" : "Description"}
              </h2>
              <p className="font-sans text-charcoal-200 leading-relaxed">
                {isPt ? property.description_pt : property.description_en}
              </p>
            </div>

            {/* Features */}
            <div className="mb-10">
              <h2 className="font-display text-xl text-offwhite mb-4">
                {isPt ? "Características" : "Features"}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {property.features.map((f) => (
                  <div key={f} className="flex items-center gap-2 font-sans text-sm text-charcoal-200">
                    <div className="w-1.5 h-1.5 bg-terracotta rounded-full flex-shrink-0" />
                    {f}
                  </div>
                ))}
              </div>
            </div>

            {/* Map placeholder */}
            <div>
              <h2 className="font-display text-xl text-offwhite mb-4">
                {isPt ? "Localização" : "Location"}
              </h2>
              <div className="aspect-video bg-charcoal-700 border border-charcoal-600 flex items-center justify-center">
                <div className="text-center">
                  <MapPin size={28} className="text-terracotta mx-auto mb-2" />
                  <div className="font-sans text-sm text-charcoal-300">{property.neighborhood}, Lisboa</div>
                  <div className="font-mono text-[10px] text-charcoal-500 mt-1">
                    Mapa disponível com integração Google Maps
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-4">
              {/* Contact card */}
              <div className="bg-charcoal-700/50 border border-charcoal-600 p-6">
                <div className="font-mono text-[10px] tracking-widest text-charcoal-400 uppercase mb-4">
                  {isPt ? "Contactar" : "Contact"}
                </div>
                <div className="font-display text-2xl text-offwhite mb-1">Nuno Reis</div>
                <div className="font-sans text-xs text-charcoal-300 mb-5">+351 938 391 853</div>

                <a
                  href={`${WHATSAPP_BASE}?text=${whatsappMsg}`}
                  target="_blank"
                  className="w-full flex items-center justify-center gap-2 bg-terracotta hover:bg-terracotta-light text-white font-sans text-sm py-3 mb-3 transition-colors"
                >
                  <MessageCircle size={15} />
                  {isPt ? "Falar no WhatsApp" : "Chat on WhatsApp"}
                </a>

                <Link
                  href={`/${locale}/showroom/${property.slug}`}
                  className="w-full flex items-center justify-center gap-2 bg-glass border border-charcoal-500 hover:border-charcoal-300 text-offwhite font-sans text-sm py-3 mb-3 transition-colors"
                >
                  <Tv2 size={15} />
                  {isPt ? "Ver em Showroom" : "View in Showroom"}
                </Link>

                <button className="w-full flex items-center justify-center gap-2 border border-charcoal-600 hover:border-charcoal-400 text-charcoal-300 hover:text-offwhite font-sans text-sm py-3 transition-colors">
                  <Download size={15} />
                  {isPt ? "Download Ficha PDF" : "Download PDF Sheet"}
                </button>
              </div>

              {/* Info */}
              {property.condo_fee && (
                <div className="bg-charcoal-700/30 border border-charcoal-700 px-4 py-3">
                  <div className="font-mono text-[9px] tracking-widest text-charcoal-500 uppercase">
                    {isPt ? "Condomínio mensal" : "Monthly condo fee"}
                  </div>
                  <div className="font-sans text-sm text-charcoal-200 mt-0.5">
                    {property.condo_fee}€/mês
                  </div>
                </div>
              )}

              <div className="font-mono text-[9px] tracking-widest text-charcoal-600 text-center pt-2">
                Ref. NR-{property.id.padStart(4, "0")}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox !== null && (
          <motion.div
            className="fixed inset-0 z-[9980] bg-charcoal-900/95 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightbox(null)}
          >
            <button
              onClick={() => setLightbox(null)}
              className="absolute top-4 right-4 text-offwhite hover:text-terracotta"
            >
              <X size={24} />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); setLightbox(Math.max(0, lightbox - 1)); }}
              className="absolute left-4 text-offwhite hover:text-terracotta disabled:opacity-20"
              disabled={lightbox === 0}
            >
              <ChevronLeft size={36} />
            </button>
            <div
              className="relative w-full max-w-4xl aspect-[16/10] mx-12"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={property.images[lightbox]}
                alt={property.title}
                fill
                className="object-contain"
              />
            </div>
            <button
              onClick={(e) => { e.stopPropagation(); setLightbox(Math.min(property.images.length - 1, lightbox + 1)); }}
              className="absolute right-4 text-offwhite hover:text-terracotta disabled:opacity-20"
              disabled={lightbox === property.images.length - 1}
            >
              <ChevronRight size={36} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Sticky WhatsApp */}
      <div className="fixed bottom-6 right-6 z-50">
        <a
          href={`${WHATSAPP_BASE}?text=${whatsappMsg}`}
          target="_blank"
          className="flex items-center gap-2 bg-terracotta hover:bg-terracotta-light text-white font-sans text-sm px-5 py-3 shadow-lg transition-colors"
        >
          <MessageCircle size={16} />
          WhatsApp
        </a>
      </div>
    </div>
  );
}
