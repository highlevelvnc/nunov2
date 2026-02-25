// src/app/[locale]/servicos/page.tsx
import { Home, TrendingUp, Key, FileText, Camera, Users } from "lucide-react";

export default async function ServicosPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const isPt = locale === "pt";

  const services = [
    {
      icon: <TrendingUp size={28} />,
      title: isPt ? "Avaliação Imobiliária" : "Property Valuation",
      desc: isPt
        ? "Avaliação rigorosa com comparativos de mercado reais. Sem superestimar, sem desvalorizar."
        : "Rigorous valuation with real market comparables. No overpricing, no undervaluing.",
    },
    {
      icon: <Home size={28} />,
      title: isPt ? "Angariação Exclusiva" : "Exclusive Listing",
      desc: isPt
        ? "Dedicação total ao seu imóvel: fotografia profissional, divulgação nos principais portais e visitas qualificadas."
        : "Total dedication to your property: professional photography, promotion on major portals and qualified viewings.",
    },
    {
      icon: <Key size={28} />,
      title: isPt ? "Procura de Imóvel" : "Property Search",
      desc: isPt
        ? "Filtramos o mercado por si. Apresentamos apenas as opções que se encaixam no seu perfil e orçamento."
        : "We filter the market for you. We present only options that fit your profile and budget.",
    },
    {
      icon: <FileText size={28} />,
      title: isPt ? "Gestão de Processo" : "Process Management",
      desc: isPt
        ? "Tratamos de toda a documentação — IMT, escritura, registo predial — sem surpresas para o cliente."
        : "We handle all documentation — IMT, deed, land registry — no surprises for the client.",
    },
    {
      icon: <Camera size={28} />,
      title: isPt ? "Marketing Imobiliário" : "Real Estate Marketing",
      desc: isPt
        ? "Fotografia e vídeo profissional, home staging virtual e campanhas digitais direcionadas."
        : "Professional photography and video, virtual home staging and targeted digital campaigns.",
    },
    {
      icon: <Users size={28} />,
      title: isPt ? "Consultoria de Investimento" : "Investment Consulting",
      desc: isPt
        ? "Análise de rendimento, rentabilidade e potencial de valorização para investidores."
        : "Yield analysis, profitability and appreciation potential for investors.",
    },
  ];

  return (
    <div className="pt-24 min-h-screen">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="text-center mb-14">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-6 h-px bg-terracotta" />
            <span className="font-mono text-[11px] tracking-[0.35em] text-terracotta uppercase">
              {isPt ? "O Que Fazemos" : "What We Do"}
            </span>
            <div className="w-6 h-px bg-terracotta" />
          </div>
          <h1 className="font-display text-5xl font-light text-offwhite">
            {isPt ? "Serviços" : "Services"}
          </h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s, i) => (
            <div
              key={s.title}
              className="bg-charcoal-700/40 border border-charcoal-600 hover:border-charcoal-400 p-8 transition-colors group"
            >
              <div className="text-terracotta mb-5 inline-block">
                {s.icon}
              </div>
              <h3 className="font-display text-xl text-offwhite mb-3">{s.title}</h3>
              <p className="font-sans text-sm text-charcoal-300 leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
