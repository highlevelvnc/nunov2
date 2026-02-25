// src/components/forms/ContactForm.tsx
"use client";
import { useTranslations } from "next-intl";

export default function ContactForm({ locale }: { locale: string }) {
  const t = useTranslations("contact");

  return (
    <form className="space-y-4">
      <div>
        <label className="font-mono text-[10px] tracking-widest text-charcoal-400 uppercase block mb-2">
          {t("form_name")}
        </label>
        <input
          type="text"
          className="w-full bg-charcoal-700 border border-charcoal-600 text-offwhite font-sans text-sm px-4 py-3 focus:outline-none focus:border-terracotta transition-colors"
        />
      </div>
      <div>
        <label className="font-mono text-[10px] tracking-widest text-charcoal-400 uppercase block mb-2">
          {t("form_email")}
        </label>
        <input
          type="email"
          className="w-full bg-charcoal-700 border border-charcoal-600 text-offwhite font-sans text-sm px-4 py-3 focus:outline-none focus:border-terracotta transition-colors"
        />
      </div>
      <div>
        <label className="font-mono text-[10px] tracking-widest text-charcoal-400 uppercase block mb-2">
          {t("form_message")}
        </label>
        <textarea
          rows={5}
          className="w-full bg-charcoal-700 border border-charcoal-600 text-offwhite font-sans text-sm px-4 py-3 focus:outline-none focus:border-terracotta transition-colors resize-none"
        />
      </div>
      <button
        type="submit"
        className="w-full bg-terracotta hover:bg-terracotta-light text-white font-sans text-sm py-4 transition-colors"
      >
        {t("form_submit")}
      </button>
    </form>
  );
}
