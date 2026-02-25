// src/app/[locale]/vender/page.tsx
import { getTranslations } from "next-intl/server";
import Link from "next/link";
import { ArrowRight, ClipboardList, Camera, Handshake } from "lucide-react";
import SellForm from "@/components/forms/SellForm";

export default async function VenderPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "sell" });
  const isPt = locale === "pt";

  const steps = [
    {
      num: "01",
      icon: <ClipboardList size={24} />,
      title: t("step1_title"),
      desc: t("step1_desc"),
    },
    {
      num: "02",
      icon: <Camera size={24} />,
      title: t("step2_title"),
      desc: t("step2_desc"),
    },
    {
      num: "03",
      icon: <Handshake size={24} />,
      title: t("step3_title"),
      desc: t("step3_desc"),
    },
  ];

  return (
    <div className="pt-24 min-h-screen">
      <div className="max-w-5xl mx-auto px-6 py-16 text-center">
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="w-6 h-px bg-terracotta" />
          <span className="font-mono text-[11px] tracking-[0.35em] text-terracotta uppercase">
            {isPt ? "Vender o Seu Imóvel" : "Sell Your Property"}
          </span>
          <div className="w-6 h-px bg-terracotta" />
        </div>
        <h1 className="font-display text-5xl md:text-6xl font-light text-offwhite mb-4">
          {t("title")}
        </h1>
        <p className="font-sans text-lg text-charcoal-300 max-w-2xl mx-auto">
          {t("subtitle")}
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {steps.map((step, i) => (
            <div
              key={step.num}
              className="relative bg-charcoal-700/40 border border-charcoal-600 p-8"
            >
              <div className="absolute top-6 right-6 font-mono text-5xl text-charcoal-700 font-bold select-none">
                {step.num}
              </div>
              <div className="text-terracotta mb-4">{step.icon}</div>
              <h3 className="font-display text-xl text-offwhite mb-3">{step.title}</h3>
              <p className="font-sans text-sm text-charcoal-300 leading-relaxed">{step.desc}</p>
              {i < steps.length - 1 && (
                <div className="hidden md:block absolute -right-4 top-1/2 -translate-y-1/2 z-10">
                  <ArrowRight size={20} className="text-terracotta" />
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="font-display text-3xl text-offwhite mb-2">{t("form_title")}</h2>
            <p className="font-sans text-sm text-charcoal-400">
              {isPt ? "Resposta em menos de 24 horas." : "Response in less than 24 hours."}
            </p>
          </div>
          <SellForm locale={locale} />
        </div>
      </div>
    </div>
  );
}
