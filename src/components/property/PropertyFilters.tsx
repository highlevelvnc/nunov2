// src/components/property/PropertyFilters.tsx
"use client";
import { useState } from "react";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { useStore } from "@/store";
import { neighborhoods } from "@/data/properties";

export default function PropertyFilters({ locale }: { locale: string }) {
  const { filters, setFilters, resetFilters } = useStore();
  const [open, setOpen] = useState(false);

  const bedOptions = [0, 1, 2, 3, 4, 5];
  const hasActiveFilters =
    filters.neighborhoods.length > 0 ||
    filters.bedrooms.length > 0 ||
    filters.minPrice > 0 ||
    filters.maxPrice < 2000000 ||
    filters.search !== "";

  return (
    <div className="sticky top-16 z-30 bg-glass border-b border-charcoal-700 py-4">
      <div className="max-w-7xl mx-auto px-6">
        {/* Search + toggle */}
        <div className="flex items-center gap-3">
          <div className="relative flex-1 max-w-md">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-charcoal-400" />
            <input
              type="text"
              value={filters.search}
              onChange={(e) => setFilters({ search: e.target.value })}
              placeholder={locale === "pt" ? "Procurar por bairro ou referência..." : "Search by neighborhood or reference..."}
              className="w-full bg-charcoal-700 border border-charcoal-600 text-offwhite placeholder-charcoal-500 font-sans text-sm pl-9 pr-4 py-2.5 focus:outline-none focus:border-terracotta transition-colors"
            />
          </div>
          <button
            onClick={() => setOpen(!open)}
            className="flex items-center gap-2 bg-charcoal-700 border border-charcoal-600 hover:border-charcoal-400 text-offwhite font-sans text-sm px-4 py-2.5 transition-colors"
          >
            <SlidersHorizontal size={14} />
            {locale === "pt" ? "Filtros" : "Filters"}
            {hasActiveFilters && (
              <span className="w-1.5 h-1.5 rounded-full bg-terracotta" />
            )}
          </button>
          {hasActiveFilters && (
            <button
              onClick={resetFilters}
              className="flex items-center gap-1 text-charcoal-400 hover:text-offwhite text-sm transition-colors"
            >
              <X size={14} />
            </button>
          )}
        </div>

        {/* Expanded filters */}
        {open && (
          <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 border-t border-charcoal-700">
            {/* Bedrooms */}
            <div>
              <label className="font-mono text-[10px] tracking-widest text-charcoal-400 uppercase block mb-3">
                {locale === "pt" ? "Tipologia" : "Type"}
              </label>
              <div className="flex flex-wrap gap-2">
                {bedOptions.map((b) => (
                  <button
                    key={b}
                    onClick={() => {
                      const curr = filters.bedrooms;
                      setFilters({
                        bedrooms: curr.includes(b)
                          ? curr.filter((x) => x !== b)
                          : [...curr, b],
                      });
                    }}
                    className={`font-sans text-xs px-3 py-1.5 border transition-colors ${
                      filters.bedrooms.includes(b)
                        ? "bg-terracotta border-terracotta text-white"
                        : "border-charcoal-600 text-charcoal-300 hover:border-charcoal-400"
                    }`}
                  >
                    {b === 0 ? "T0" : `T${b}`}
                  </button>
                ))}
              </div>
            </div>

            {/* Neighborhood */}
            <div>
              <label className="font-mono text-[10px] tracking-widest text-charcoal-400 uppercase block mb-3">
                {locale === "pt" ? "Bairro" : "Neighborhood"}
              </label>
              <div className="grid grid-cols-2 gap-1.5">
                {neighborhoods.map((n) => (
                  <button
                    key={n}
                    onClick={() => {
                      const curr = filters.neighborhoods;
                      setFilters({
                        neighborhoods: curr.includes(n)
                          ? curr.filter((x) => x !== n)
                          : [...curr, n],
                      });
                    }}
                    className={`font-sans text-xs px-2 py-1 text-left border transition-colors ${
                      filters.neighborhoods.includes(n)
                        ? "bg-terracotta/20 border-terracotta/50 text-offwhite"
                        : "border-charcoal-700 text-charcoal-400 hover:border-charcoal-500"
                    }`}
                  >
                    {n}
                  </button>
                ))}
              </div>
            </div>

            {/* Price range */}
            <div>
              <label className="font-mono text-[10px] tracking-widest text-charcoal-400 uppercase block mb-3">
                {locale === "pt" ? "Preço Máx" : "Max Price"}
              </label>
              <div className="space-y-2">
                <input
                  type="range"
                  min={100000}
                  max={1500000}
                  step={25000}
                  value={filters.maxPrice}
                  onChange={(e) => setFilters({ maxPrice: Number(e.target.value) })}
                  className="w-full accent-terracotta"
                />
                <div className="flex justify-between">
                  <span className="font-mono text-xs text-charcoal-400">100k</span>
                  <span className="font-sans text-sm text-offwhite">
                    {filters.maxPrice >= 1500000
                      ? "Sem limite"
                      : `${(filters.maxPrice / 1000).toFixed(0)}k €`}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
