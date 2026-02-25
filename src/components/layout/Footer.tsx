// src/components/layout/Footer.tsx
"use client";
import Link from "next/link";
import { Phone, Mail, MapPin } from "lucide-react";
import { useTranslations } from "next-intl";

const WHATSAPP = "https://wa.me/351938391853";

export default function Footer({ locale }: { locale: string }) {
  const t = useTranslations("footer");
  const tNav = useTranslations("nav");
  const prefix = `/${locale}`;

  return (
    <footer className="bg-charcoal-900 border-t border-charcoal-700 mt-24">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="font-display text-2xl font-light tracking-[0.12em] text-offwhite mb-1">
              NUNO REIS
            </div>
            <div className="font-sans text-[10px] tracking-[0.35em] text-charcoal-400 uppercase mb-4">
              Real Estate Team
            </div>
            <p className="font-sans text-sm text-charcoal-300 leading-relaxed max-w-xs">
              Imobiliário residencial em Lisboa. Respostas rápidas, acompanhamento real, resultados concretos.
            </p>
            <div className="mt-6 flex flex-col gap-2">
              <a href="tel:+351938391853" className="flex items-center gap-2 text-sm text-charcoal-300 hover:text-offwhite transition-colors">
                <Phone size={14} className="text-terracotta" />
                +351 938 391 853
              </a>
              <a href="mailto:nuno@nunoreisrealteam.pt" className="flex items-center gap-2 text-sm text-charcoal-300 hover:text-offwhite transition-colors">
                <Mail size={14} className="text-terracotta" />
                nuno@nunoreisrealteam.pt
              </a>
              <span className="flex items-center gap-2 text-sm text-charcoal-300">
                <MapPin size={14} className="text-terracotta" />
                Lisboa, Portugal
              </span>
            </div>
          </div>

          {/* Nav */}
          <div>
            <div className="font-sans text-[10px] tracking-[0.3em] uppercase text-charcoal-400 mb-4">Menu</div>
            <nav className="flex flex-col gap-2">
              {([
                [tNav("properties"), `${prefix}/propriedades`],
                [tNav("sell"), `${prefix}/vender`],
                [tNav("about"), `${prefix}/sobre`],
                [tNav("services"), `${prefix}/servicos`],
                [tNav("blog"), `${prefix}/blog`],
                [tNav("contact"), `${prefix}/contato`],
              ] as [string, string][]).map(([label, href]) => (
                <Link key={href} href={href} className="font-sans text-sm text-charcoal-300 hover:text-offwhite transition-colors">
                  {label}
                </Link>
              ))}
            </nav>
          </div>

          {/* CTA */}
          <div>
            <div className="font-sans text-[10px] tracking-[0.3em] uppercase text-charcoal-400 mb-4">Contacto Rápido</div>
            <a
              href={WHATSAPP}
              target="_blank"
              rel="noopener noreferrer"
              className="block text-center bg-terracotta hover:bg-terracotta-light text-white font-sans text-sm py-3 px-4 mb-3 transition-colors"
            >
              WhatsApp
            </a>
            <Link
              href={`${prefix}/vender`}
              className="block text-center border border-charcoal-600 hover:border-offwhite text-offwhite font-sans text-sm py-3 px-4 transition-colors"
            >
              Pedir Avaliação
            </Link>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-charcoal-700 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="font-sans text-xs text-charcoal-500">
            © {new Date().getFullYear()} Nuno Reis Real Estate Team. {t("rights")}
          </p>
          <div className="flex gap-4">
            <Link href={`${prefix}/privacidade`} className="font-sans text-xs text-charcoal-500 hover:text-offwhite transition-colors">
              {t("privacy")}
            </Link>
            <Link href={`${prefix}/termos`} className="font-sans text-xs text-charcoal-500 hover:text-offwhite transition-colors">
              {t("terms")}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
