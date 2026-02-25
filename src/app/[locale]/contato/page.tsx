// src/app/[locale]/contato/page.tsx
import { getTranslations } from "next-intl/server";
import { Phone, Mail, MapPin } from "lucide-react";
import ContactForm from "@/components/forms/ContactForm";

export default async function ContatoPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "contact" });
  const isPt = locale === "pt";

  return (
    <div className="pt-24 min-h-screen">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="text-center mb-14">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-6 h-px bg-terracotta" />
            <span className="font-mono text-[11px] tracking-[0.35em] text-terracotta uppercase">
              {t("title")}
            </span>
            <div className="w-6 h-px bg-terracotta" />
          </div>
          <h1 className="font-display text-5xl font-light text-offwhite">
            {isPt ? "Fale Connosco" : "Get in Touch"}
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div>
            <div className="space-y-6 mb-10">
              {[
                { icon: <Phone size={18} />, label: t("phone"), value: "+351 938 391 853", href: "tel:+351938391853" },
                { icon: <Mail size={18} />, label: t("email"), value: "nuno@nunoreisrealteam.pt", href: "mailto:nuno@nunoreisrealteam.pt" },
                { icon: <MapPin size={18} />, label: t("address"), value: "Lisboa, Portugal", href: null },
              ].map(({ icon, label, value, href }) => (
                <div key={label} className="flex items-start gap-4">
                  <div className="text-terracotta mt-0.5">{icon}</div>
                  <div>
                    <div className="font-mono text-[10px] tracking-widest text-charcoal-400 uppercase mb-1">{label}</div>
                    {href ? (
                      <a href={href} className="font-sans text-offwhite hover:text-terracotta transition-colors">{value}</a>
                    ) : (
                      <span className="font-sans text-offwhite">{value}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
            <a
              href="https://wa.me/351938391853"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-terracotta hover:bg-terracotta-light text-white font-sans text-sm px-7 py-4 transition-colors"
            >
              {isPt ? "Abrir WhatsApp" : "Open WhatsApp"}
            </a>
          </div>

          <ContactForm locale={locale} />
        </div>
      </div>
    </div>
  );
}
