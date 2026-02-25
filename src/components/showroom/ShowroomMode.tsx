// src/components/showroom/ShowroomMode.tsx
"use client";
import { useEffect, useCallback, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, MessageCircle, Calendar, Bed, Bath, Maximize2, MapPin } from "lucide-react";
import { useStore } from "@/store";
import { Property } from "@/types";
import { formatPrice } from "@/lib/utils";
import { useTranslations } from "next-intl";

const WHATSAPP_BASE = "https://wa.me/351938391853";

interface ShowroomModeProps {
  property: Property;
  locale: string;
  onClose: () => void;
}

const slides = [
  { id: "hero", label: "Apresentação" },
  { id: "location", label: "Localização" },
  { id: "specs", label: "Especificações" },
  { id: "highlights", label: "Destaques" },
  { id: "visit", label: "Agendar Visita" },
];

export default function ShowroomMode({ property, locale, onClose }: ShowroomModeProps) {
  const { showroomSlide, setShowroomSlide } = useStore();
  const [direction, setDirection] = useState(1);
  const t = useTranslations("showroom");

  const goTo = useCallback((idx: number) => {
    setDirection(idx > showroomSlide ? 1 : -1);
    setShowroomSlide(Math.max(0, Math.min(idx, slides.length - 1)));
  }, [showroomSlide, setShowroomSlide]);

  const next = useCallback(() => goTo(showroomSlide + 1), [goTo, showroomSlide]);
  const prev = useCallback(() => goTo(showroomSlide - 1), [goTo, showroomSlide]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose, next, prev]);

  const slideVariants = {
    enter: (d: number) => ({ opacity: 0, x: d > 0 ? 60 : -60 }),
    center: { opacity: 1, x: 0 },
    exit: (d: number) => ({ opacity: 0, x: d > 0 ? -60 : 60 }),
  };

  const whatsappMsg = encodeURIComponent(
    `Olá! Vi o imóvel "${property.title}" no Showroom e gostaria de saber mais.`
  );

  const slideContent = [
    // 0 — Hero
    <div key="hero" className="flex flex-col lg:flex-row h-full">
      <div className="relative flex-1 overflow-hidden">
        <Image
          src={property.images[0]}
          alt={property.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal-800/70 via-transparent to-transparent" />
        <div className="absolute bottom-8 left-8 right-8">
          <div className="font-display text-4xl md:text-5xl font-light text-offwhite mb-2">
            {property.title}
          </div>
          <div className="flex items-center gap-2">
            <MapPin size={14} className="text-terracotta" />
            <span className="font-sans text-charcoal-200">{property.neighborhood}</span>
          </div>
        </div>
      </div>
      <div className="lg:w-80 bg-charcoal-800 p-8 flex flex-col justify-center">
        <div className="font-display text-4xl font-light text-offwhite mb-6">
          {formatPrice(property.price)}
        </div>
        <div className="space-y-3 mb-8">
          {property.bedrooms > 0 && (
            <div className="flex items-center gap-3 text-charcoal-200">
              <Bed size={16} className="text-terracotta" />
              <span className="font-sans text-sm">T{property.bedrooms}</span>
            </div>
          )}
          <div className="flex items-center gap-3 text-charcoal-200">
            <Bath size={16} className="text-terracotta" />
            <span className="font-sans text-sm">{property.bathrooms} casa{property.bathrooms !== 1 ? "s" : ""} de banho</span>
          </div>
          <div className="flex items-center gap-3 text-charcoal-200">
            <Maximize2 size={16} className="text-terracotta" />
            <span className="font-sans text-sm">{property.area_m2} m²</span>
          </div>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {property.tags.map((tag) => (
            <span key={tag} className="font-mono text-[9px] tracking-widest uppercase border border-charcoal-600 text-charcoal-400 px-2 py-1">
              {tag.replace("_", " ")}
            </span>
          ))}
        </div>
      </div>
    </div>,

    // 1 — Location
    <div key="location" className="flex flex-col items-center justify-center h-full p-8 text-center">
      <div className="font-mono text-[11px] tracking-widest text-terracotta uppercase mb-4">Localização</div>
      <div className="font-display text-5xl md:text-6xl font-light text-offwhite mb-3">{property.neighborhood}</div>
      <div className="font-sans text-charcoal-300 max-w-md mb-8">
        {locale === "pt"
          ? `Um dos bairros mais procurados de Lisboa. Excelente acessibilidade, serviços e qualidade de vida.`
          : `One of Lisbon's most sought-after neighborhoods. Excellent accessibility, services and quality of life.`}
      </div>
      {/* Map placeholder */}
      <div className="w-full max-w-lg aspect-video bg-charcoal-700 border border-charcoal-600 flex items-center justify-center">
        <div className="text-center">
          <MapPin size={32} className="text-terracotta mx-auto mb-2" />
          <div className="font-sans text-xs text-charcoal-400">
            {property.neighborhood}, Lisboa
          </div>
          <div className="font-mono text-[10px] text-charcoal-600 mt-1">
            {property.lat?.toFixed(4)}, {property.lng?.toFixed(4)}
          </div>
        </div>
      </div>
    </div>,

    // 2 — Specs
    <div key="specs" className="flex flex-col items-center justify-center h-full p-8">
      <div className="font-mono text-[11px] tracking-widest text-terracotta uppercase mb-4 text-center">Especificações</div>
      <div className="w-full max-w-2xl grid grid-cols-2 md:grid-cols-3 gap-4">
        {[
          { label: locale === "pt" ? "Tipologia" : "Type", value: `T${property.bedrooms}` },
          { label: locale === "pt" ? "Área" : "Area", value: `${property.area_m2} m²` },
          { label: locale === "pt" ? "Quartos" : "Bedrooms", value: property.bedrooms.toString() },
          { label: locale === "pt" ? "Casas Banho" : "Bathrooms", value: property.bathrooms.toString() },
          { label: locale === "pt" ? "Piso" : "Floor", value: property.floor !== undefined ? property.floor.toString() : "—" },
          { label: locale === "pt" ? "Ano" : "Year", value: property.year?.toString() || "—" },
          { label: "Condomínio", value: property.condo_fee ? `${property.condo_fee}€/mês` : "—" },
          { label: locale === "pt" ? "Preço" : "Price", value: formatPrice(property.price) },
        ].map(({ label, value }) => (
          <div key={label} className="bg-charcoal-700/50 border border-charcoal-600 p-4">
            <div className="font-mono text-[9px] tracking-widest text-charcoal-400 uppercase mb-1">{label}</div>
            <div className="font-display text-xl text-offwhite">{value}</div>
          </div>
        ))}
      </div>
    </div>,

    // 3 — Highlights
    <div key="highlights" className="flex flex-col items-center justify-center h-full p-8">
      <div className="font-mono text-[11px] tracking-widest text-terracotta uppercase mb-6 text-center">Destaques</div>
      <div className="w-full max-w-2xl grid grid-cols-1 md:grid-cols-2 gap-4">
        {property.features.map((feature, i) => (
          <motion.div
            key={feature}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.08 }}
            className="flex items-center gap-3 bg-charcoal-700/30 border border-charcoal-600 px-5 py-4"
          >
            <div className="w-1.5 h-1.5 bg-terracotta rounded-full flex-shrink-0" />
            <span className="font-sans text-sm text-charcoal-200">{feature}</span>
          </motion.div>
        ))}
      </div>
    </div>,

    // 4 — Visit
    <div key="visit" className="flex flex-col items-center justify-center h-full p-8 text-center">
      <div className="font-mono text-[11px] tracking-widest text-terracotta uppercase mb-4">Agendar Visita</div>
      <div className="font-display text-4xl md:text-5xl font-light text-offwhite mb-3">{property.title}</div>
      <div className="font-display text-2xl text-terracotta mb-8">{formatPrice(property.price)}</div>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <a
          href={`${WHATSAPP_BASE}?text=${whatsappMsg}`}
          target="_blank"
          className="flex items-center gap-2 bg-terracotta hover:bg-terracotta-light text-white font-sans text-sm px-8 py-4 transition-colors"
        >
          <MessageCircle size={16} />
          {t("whatsapp")}
        </a>
        <button className="flex items-center gap-2 bg-glass border border-charcoal-500 hover:border-offwhite text-offwhite font-sans text-sm px-8 py-4 transition-colors">
          <Calendar size={16} />
          {t("schedule")}
        </button>
      </div>
      <p className="font-sans text-xs text-charcoal-400 mt-6">
        +351 938 391 853 · nuno@nunoreisrealteam.pt
      </p>
    </div>,
  ];

  return (
    <motion.div
      className="fixed inset-0 z-[9990] bg-charcoal-900 flex flex-col"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-charcoal-700 flex-shrink-0">
        {/* Slide indicators */}
        <div className="flex items-center gap-3">
          {slides.map((s, i) => (
            <button
              key={s.id}
              onClick={() => goTo(i)}
              className="flex items-center gap-2 group"
            >
              <div className={`w-2 h-2 rounded-full transition-colors ${i === showroomSlide ? "bg-terracotta" : "bg-charcoal-600 group-hover:bg-charcoal-400"}`} />
              <span className={`font-mono text-[10px] tracking-wide hidden md:block transition-colors ${i === showroomSlide ? "text-offwhite" : "text-charcoal-500 group-hover:text-charcoal-300"}`}>
                {s.label}
              </span>
            </button>
          ))}
        </div>

        {/* Exit */}
        <button
          onClick={onClose}
          className="flex items-center gap-2 text-charcoal-400 hover:text-offwhite font-mono text-[10px] tracking-widest uppercase transition-colors"
        >
          <span className="hidden sm:block">{t("exit")}</span>
          <X size={18} />
        </button>
      </div>

      {/* Slide content */}
      <div className="flex-1 relative overflow-hidden">
        <AnimatePresence custom={direction} mode="wait">
          <motion.div
            key={showroomSlide}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0"
          >
            {slideContent[showroomSlide]}
          </motion.div>
        </AnimatePresence>

        {/* Nav arrows */}
        <button
          onClick={prev}
          disabled={showroomSlide === 0}
          className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center bg-glass border border-charcoal-600 hover:border-charcoal-400 text-offwhite disabled:opacity-20 transition-all z-10"
        >
          <ChevronLeft size={18} />
        </button>
        <button
          onClick={next}
          disabled={showroomSlide === slides.length - 1}
          className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center bg-glass border border-charcoal-600 hover:border-charcoal-400 text-offwhite disabled:opacity-20 transition-all z-10"
        >
          <ChevronRight size={18} />
        </button>
      </div>

      {/* Floating CTA */}
      <div className="absolute bottom-6 right-6 flex gap-3">
        <a
          href={`${WHATSAPP_BASE}?text=${whatsappMsg}`}
          target="_blank"
          className="flex items-center gap-2 bg-terracotta hover:bg-terracotta-light text-white font-sans text-xs px-4 py-2.5 transition-colors shadow-lg"
        >
          <MessageCircle size={14} />
          WhatsApp
        </a>
      </div>
    </motion.div>
  );
}
