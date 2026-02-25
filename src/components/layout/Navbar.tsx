// src/components/layout/Navbar.tsx
"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone } from "lucide-react";
import { useTranslations } from "next-intl";

interface NavbarProps {
  locale: string;
}

const WHATSAPP = "https://wa.me/351938391853";

export default function Navbar({ locale }: NavbarProps) {
  const t = useTranslations("nav");
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const prefix = `/${locale}`;
  const links = [
    { href: `${prefix}/propriedades`, label: t("properties") },
    { href: `${prefix}/vender`, label: t("sell") },
    { href: `${prefix}/sobre`, label: t("about") },
    { href: `${prefix}/servicos`, label: t("services") },
    { href: `${prefix}/blog`, label: t("blog") },
    { href: `${prefix}/contato`, label: t("contact") },
  ];

  const otherLocale = locale === "pt" ? "en" : "pt";
  const otherPath = pathname.replace(`/${locale}`, `/${otherLocale}`);

  return (
    <>
      <motion.header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? "bg-glass" : "bg-transparent"
        }`}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link href={prefix} className="group">
            <span className="font-display text-xl font-light tracking-[0.12em] text-offwhite">
              NUNO REIS
            </span>
            <span className="font-sans text-[9px] tracking-[0.35em] text-charcoal-300 block -mt-1 uppercase">
              Real Estate Team
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-7">
            {links.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className={`font-sans text-[13px] tracking-wide transition-colors duration-200 hover:text-offwhite ${
                  pathname.startsWith(href) ? "text-offwhite" : "text-charcoal-300"
                }`}
              >
                {label}
              </Link>
            ))}
          </nav>

          {/* CTA + Lang */}
          <div className="hidden lg:flex items-center gap-3">
            <Link
              href={otherPath}
              className="font-mono text-[11px] tracking-widest text-charcoal-400 hover:text-offwhite transition-colors px-2 py-1"
            >
              {otherLocale.toUpperCase()}
            </Link>
            <a
              href={WHATSAPP}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-terracotta hover:bg-terracotta-light text-white font-sans text-[13px] px-5 py-2.5 rounded-sm transition-colors duration-200"
            >
              <Phone size={14} />
              {t("cta")}
            </a>
          </div>

          {/* Mobile menu button */}
          <button
            className="lg:hidden text-offwhite p-2"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-40 bg-charcoal-800 flex flex-col pt-20 px-6 lg:hidden"
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            {links.map(({ href, label }, i) => (
              <motion.div
                key={href}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 + 0.1 }}
              >
                <Link
                  href={href}
                  className="block py-4 font-display text-3xl font-light text-offwhite border-b border-charcoal-700"
                  onClick={() => setMenuOpen(false)}
                >
                  {label}
                </Link>
              </motion.div>
            ))}
            <div className="mt-8 flex items-center gap-4">
              <a
                href={WHATSAPP}
                target="_blank"
                className="flex-1 text-center bg-terracotta text-white py-4 font-sans"
                onClick={() => setMenuOpen(false)}
              >
                {t("cta")}
              </a>
              <Link
                href={otherPath}
                className="font-mono text-sm text-charcoal-300 px-4 py-4"
                onClick={() => setMenuOpen(false)}
              >
                {otherLocale.toUpperCase()}
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
