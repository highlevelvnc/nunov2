// src/app/[locale]/sobre/page.tsx
import Image from "next/image";
import { team } from "@/data/team";
import { Phone, Mail } from "lucide-react";
import { getTranslations } from "next-intl/server";

export default async function SobrePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "about" });
  const isPt = locale === "pt";

  return (
    <div className="pt-24 min-h-screen">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-6 h-px bg-terracotta" />
            <span className="font-mono text-[11px] tracking-[0.35em] text-terracotta uppercase">
              {isPt ? "Equipa" : "Team"}
            </span>
            <div className="w-6 h-px bg-terracotta" />
          </div>
          <h1 className="font-display text-5xl md:text-6xl font-light text-offwhite mb-4">
            {t("title")}
          </h1>
          <p className="font-sans text-charcoal-300 max-w-xl mx-auto">{t("subtitle")}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {team.map((member) => (
            <div key={member.id} className="group">
              <div className="relative aspect-[3/4] overflow-hidden mb-5">
                <Image
                  src={member.photo}
                  alt={member.name}
                  fill
                  className="object-cover object-top group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal-800/60 to-transparent" />
              </div>
              <h3 className="font-display text-xl text-offwhite mb-1">{member.name}</h3>
              <div className="font-mono text-[10px] tracking-widest text-terracotta uppercase mb-3">
                {isPt ? member.role_pt : member.role_en}
              </div>
              <p className="font-sans text-xs text-charcoal-300 leading-relaxed mb-3">
                {isPt ? member.bio_pt : member.bio_en}
              </p>
              {member.phone && (
                <div className="flex flex-col gap-1.5">
                  <a href={`tel:${member.phone}`} className="flex items-center gap-2 text-xs text-charcoal-400 hover:text-offwhite transition-colors">
                    <Phone size={11} />
                    {member.phone}
                  </a>
                  {member.email && (
                    <a href={`mailto:${member.email}`} className="flex items-center gap-2 text-xs text-charcoal-400 hover:text-offwhite transition-colors">
                      <Mail size={11} />
                      {member.email}
                    </a>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="max-w-3xl mx-auto text-center border-t border-charcoal-700 pt-16">
          <h2 className="font-display text-3xl text-offwhite mb-4">{t("mission_title")}</h2>
          <p className="font-sans text-charcoal-200 leading-relaxed text-lg">{t("mission_text")}</p>
        </div>
      </div>
    </div>
  );
}
