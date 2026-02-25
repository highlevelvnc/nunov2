// src/app/[locale]/propriedades/page.tsx
"use client";
import { use, useMemo } from "react";
import PropertyCard from "@/components/property/PropertyCard";
import PropertyFilters from "@/components/property/PropertyFilters";
import { properties } from "@/data/properties";
import { useStore } from "@/store";

export default function PropertiesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = use(params);
  const { filters } = useStore();

  const filtered = useMemo(() => {
    return properties.filter((p) => {
      if (filters.search) {
        const q = filters.search.toLowerCase();
        if (!p.title.toLowerCase().includes(q) && !p.neighborhood.toLowerCase().includes(q)) return false;
      }
      if (filters.bedrooms.length > 0 && !filters.bedrooms.includes(p.bedrooms)) return false;
      if (filters.neighborhoods.length > 0 && !filters.neighborhoods.includes(p.neighborhood)) return false;
      if (p.price > filters.maxPrice) return false;
      if (p.price < filters.minPrice) return false;
      return true;
    });
  }, [filters]);

  return (
    <div className="pt-16 min-h-screen">
      <PropertyFilters locale={locale} />

      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="mb-8">
          <h1 className="font-display text-3xl md:text-4xl font-light text-offwhite">
            {locale === "pt" ? "Propriedades" : "Properties"}
          </h1>
          <p className="font-sans text-sm text-charcoal-400 mt-1">
            {filtered.length} {locale === "pt" ? "imóveis encontrados" : "properties found"}
          </p>
        </div>

        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((p, i) => (
              <PropertyCard key={p.id} property={p} locale={locale} index={i} />
            ))}
          </div>
        ) : (
          <div className="text-center py-24">
            <div className="font-display text-4xl text-charcoal-600 mb-3">
              {locale === "pt" ? "Sem resultados" : "No results"}
            </div>
            <p className="font-sans text-charcoal-400">
              {locale === "pt" ? "Tente ajustar os filtros." : "Try adjusting your filters."}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
