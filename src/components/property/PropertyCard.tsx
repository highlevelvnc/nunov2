// src/components/property/PropertyCard.tsx
"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Bed, Bath, Maximize2, MapPin, ArrowRight } from "lucide-react";
import { Property } from "@/types";
import { formatPrice } from "@/lib/utils";

interface PropertyCardProps {
  property: Property;
  locale: string;
  index?: number;
}

export default function PropertyCard({ property, locale, index = 0 }: PropertyCardProps) {
  const [hovered, setHovered] = useState(false);

  const statusColors = {
    for_sale: "bg-terracotta/90",
    sold: "bg-charcoal-500/90",
    reserved: "bg-river/90",
  };

  const statusLabels = {
    for_sale: locale === "pt" ? "Venda" : "For Sale",
    sold: locale === "pt" ? "Vendido" : "Sold",
    reserved: locale === "pt" ? "Reservado" : "Reserved",
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.7, delay: index * 0.07, ease: [0.16, 1, 0.3, 1] }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      className="group relative bg-charcoal-700/50 border border-charcoal-600 hover:border-charcoal-400 transition-colors duration-300 overflow-hidden"
    >
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={property.images[0]}
          alt={property.title}
          fill
          className={`object-cover transition-transform duration-700 ${hovered ? "scale-105" : "scale-100"}`}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal-800/60 to-transparent" />

        {/* Status badge */}
        <div className={`absolute top-3 left-3 ${statusColors[property.status]} text-white font-mono text-[10px] tracking-widest uppercase px-2 py-1`}>
          {statusLabels[property.status]}
        </div>

        {/* Price overlay */}
        <div className="absolute bottom-3 left-3">
          <div className="font-display text-xl font-light text-offwhite">
            {formatPrice(property.price)}
          </div>
        </div>

        {/* Showroom CTA */}
        <Link
          href={`/${locale}/showroom/${property.slug}`}
          className="absolute top-3 right-3 bg-glass text-offwhite font-mono text-[10px] tracking-widest uppercase px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        >
          Showroom
        </Link>
      </div>

      {/* Content */}
      <div className="p-5">
        <div className="flex items-start justify-between gap-2 mb-3">
          <div>
            <h3 className="font-sans text-base font-medium text-offwhite leading-tight">
              {property.title}
            </h3>
            <div className="flex items-center gap-1 mt-1">
              <MapPin size={11} className="text-terracotta flex-shrink-0" />
              <span className="font-sans text-xs text-charcoal-300">{property.neighborhood}</span>
            </div>
          </div>
        </div>

        {/* Specs */}
        <div className="flex items-center gap-4 mb-4">
          {property.bedrooms > 0 && (
            <div className="flex items-center gap-1 text-charcoal-300">
              <Bed size={13} />
              <span className="font-sans text-xs">T{property.bedrooms}</span>
            </div>
          )}
          <div className="flex items-center gap-1 text-charcoal-300">
            <Bath size={13} />
            <span className="font-sans text-xs">{property.bathrooms}</span>
          </div>
          <div className="flex items-center gap-1 text-charcoal-300">
            <Maximize2 size={13} />
            <span className="font-sans text-xs">{property.area_m2} m²</span>
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {property.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="font-mono text-[9px] tracking-widest uppercase text-charcoal-400 border border-charcoal-600 px-2 py-0.5"
            >
              {tag.replace("_", " ")}
            </span>
          ))}
        </div>

        {/* CTA */}
        <Link
          href={`/${locale}/propriedades/${property.slug}`}
          className="flex items-center justify-between text-sm text-offwhite border-t border-charcoal-600 pt-4 group/link hover:text-terracotta transition-colors"
        >
          <span className="font-sans text-xs tracking-wide">
            {locale === "pt" ? "Ver imóvel" : "View property"}
          </span>
          <ArrowRight size={14} className="transition-transform group-hover/link:translate-x-1" />
        </Link>
      </div>
    </motion.article>
  );
}
