// src/components/forms/SellForm.tsx
"use client";
import { useTranslations } from "next-intl";
import { ArrowRight } from "lucide-react";

export default function SellForm({ locale }: { locale: string }) {
  const t = useTranslations("sell");

  return (
    <form className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="font-mono text-[10px] tracking-widest text-charcoal-400 uppercase block mb-2">
            {t("form_name")}
          </label>
          <input
            type="text"
            className="w-full bg-charcoal-700 border border-charcoal-600 text-offwhite font-sans text-sm px-4 py-3 focus:outline-none focus:border-terracotta transition-colors"
            placeholder="João Silva"
          />
        </div>
        <div>
          <label className="font-mono text-[10px] tracking-widest text-charcoal-400 uppercase block mb-2">
            {t("form_phone")}
          </label>
          <input
            type="tel"
            className="w-full bg-charcoal-700 border border-charcoal-600 text-offwhite font-sans text-sm px-4 py-3 focus:outline-none focus:border-terracotta transition-colors"
            placeholder="+351 9xx xxx xxx"
          />
        </div>
      </div>
      <div>
        <label className="font-mono text-[10px] tracking-widest text-charcoal-400 uppercase block mb-2">
          {t("form_email")}
        </label>
        <input
          type="email"
          className="w-full bg-charcoal-700 border border-charcoal-600 text-offwhite font-sans text-sm px-4 py-3 focus:outline-none focus:border-terracotta transition-colors"
          placeholder="email@exemplo.com"
        />
      </div>
      <div>
        <label className="font-mono text-[10px] tracking-widest text-charcoal-400 uppercase block mb-2">
          {t("form_address")}
        </label>
        <input
          type="text"
          className="w-full bg-charcoal-700 border border-charcoal-600 text-offwhite font-sans text-sm px-4 py-3 focus:outline-none focus:border-terracotta transition-colors"
        />
      </div>
      <div>
        <label className="font-mono text-[10px] tracking-widest text-charcoal-400 uppercase block mb-2">
          {t("form_type")}
        </label>
        <select className="w-full bg-charcoal-700 border border-charcoal-600 text-offwhite font-sans text-sm px-4 py-3 focus:outline-none focus:border-terracotta transition-colors">
          {["T0", "T1", "T2", "T3", "T4", "T5+"].map((opt) => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>
      </div>
      <div>
        <label className="font-mono text-[10px] tracking-widest text-charcoal-400 uppercase block mb-2">
          {t("form_message")}
        </label>
        <textarea
          rows={4}
          className="w-full bg-charcoal-700 border border-charcoal-600 text-offwhite font-sans text-sm px-4 py-3 focus:outline-none focus:border-terracotta transition-colors resize-none"
        />
      </div>
      <button
        type="submit"
        className="w-full bg-terracotta hover:bg-terracotta-light text-white font-sans text-sm py-4 transition-colors flex items-center justify-center gap-2"
      >
        {t("form_submit")}
        <ArrowRight size={16} />
      </button>
    </form>
  );
}
