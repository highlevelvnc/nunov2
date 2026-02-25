// src/app/[locale]/angariacoes/page.tsx
export default async function AngariacoesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  return (
    <div className="pt-24 min-h-screen">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <h1 className="font-display text-5xl font-light text-offwhite mb-12 text-center">
          Materiais de Angariação
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Placa Vende-se */}
          <div className="flex flex-col items-center">
            <div className="font-mono text-[10px] tracking-widest text-charcoal-400 uppercase mb-4">Placa Vende-se</div>
            <div className="w-72 h-48 bg-terracotta flex flex-col items-center justify-center shadow-2xl border-4 border-white/10 relative overflow-hidden">
              <div className="font-display text-4xl font-light text-white tracking-widest mb-1">VENDE-SE</div>
              <div className="w-12 h-px bg-white/40 mb-3" />
              <div className="font-sans text-sm text-white/90 font-medium tracking-wider mb-1">NUNO REIS</div>
              <div className="font-mono text-[10px] text-white/70 tracking-widest">REAL ESTATE TEAM</div>
              <div className="mt-3 font-mono text-sm text-white font-bold tracking-widest">938 391 853</div>
            </div>
          </div>

          {/* Folha A4 */}
          <div className="flex flex-col items-center">
            <div className="font-mono text-[10px] tracking-widest text-charcoal-400 uppercase mb-4">Folha A4 — 1-Pager</div>
            <div className="w-64 aspect-[3/4] bg-offwhite text-charcoal-800 flex flex-col shadow-2xl overflow-hidden">
              <div className="h-2 bg-terracotta" />
              <div className="flex-1 p-5 flex flex-col">
                <div className="font-sans text-[9px] font-bold tracking-widest uppercase text-terracotta mb-3">NUNO REIS REAL ESTATE TEAM</div>
                <div className="bg-charcoal-200 aspect-video mb-3 flex items-center justify-center text-[8px] text-charcoal-400">FOTO PRINCIPAL</div>
                <div className="font-sans text-sm font-bold text-charcoal-800 mb-1">T3 Renovado em Arroios</div>
                <div className="font-sans text-[10px] text-charcoal-500 mb-2">Arroios · Lisboa · 98 m²</div>
                <div className="font-sans text-base font-bold text-terracotta mb-3">385.000 €</div>
                <div className="grid grid-cols-2 gap-1 text-[8px] text-charcoal-600 mb-3">
                  {["T3", "2 WC", "98 m²", "Piso 3"].map((spec) => (
                    <div key={spec} className="border border-charcoal-300 px-1 py-0.5 text-center">{spec}</div>
                  ))}
                </div>
                <div className="text-[7px] text-charcoal-500 leading-relaxed flex-1">
                  Apartamento completamente renovado no coração de Arroios...
                </div>
                <div className="mt-2 flex items-center justify-between border-t border-charcoal-200 pt-2">
                  <div className="text-[7px] text-charcoal-500">
                    <div className="font-bold text-charcoal-700">Nuno Reis</div>
                    <div>+351 938 391 853</div>
                  </div>
                  <div className="w-10 h-10 bg-charcoal-200 flex items-center justify-center text-[6px] text-charcoal-400">QR</div>
                </div>
              </div>
              <div className="h-1.5 bg-terracotta" />
            </div>
          </div>

          {/* Cartão Digital */}
          <div className="flex flex-col items-center">
            <div className="font-mono text-[10px] tracking-widest text-charcoal-400 uppercase mb-4">Cartão Digital</div>
            <div className="w-72 h-40 bg-gradient-to-br from-charcoal-800 to-charcoal-700 border border-charcoal-600 flex items-center gap-5 px-6 shadow-2xl">
              <div className="w-16 h-16 rounded-full bg-charcoal-600 flex items-center justify-center flex-shrink-0">
                <div className="font-display text-xl text-offwhite">NR</div>
              </div>
              <div>
                <div className="font-display text-lg text-offwhite mb-0.5">Nuno Reis</div>
                <div className="font-mono text-[9px] tracking-widest text-terracotta uppercase mb-3">Real Estate Team · Lisboa</div>
                <div className="font-sans text-[11px] text-charcoal-300">+351 938 391 853</div>
                <div className="font-sans text-[11px] text-charcoal-300">nuno@nunoreisrealteam.pt</div>
              </div>
            </div>
          </div>

          {/* Instagram Post */}
          <div className="flex flex-col items-center">
            <div className="font-mono text-[10px] tracking-widest text-charcoal-400 uppercase mb-4">Post Instagram</div>
            <div className="w-48 aspect-[4/5] bg-charcoal-700 relative overflow-hidden shadow-2xl flex flex-col">
              <div className="flex-1 bg-gradient-to-br from-charcoal-600 to-charcoal-800 flex items-center justify-center">
                <span className="font-sans text-xs text-charcoal-400">🏠 Foto do Imóvel</span>
              </div>
              <div className="bg-terracotta px-3 py-2">
                <div className="font-sans text-[8px] text-white/80 tracking-widest uppercase">Imóvel da Semana</div>
                <div className="font-display text-sm text-white font-light">T3 em Arroios</div>
                <div className="font-sans text-[10px] text-white font-bold">385.000 €</div>
              </div>
              <div className="bg-charcoal-800 px-3 py-1.5 flex items-center justify-between">
                <div className="font-mono text-[7px] text-charcoal-300 tracking-widest uppercase">Nuno Reis Real Estate</div>
                <div className="font-mono text-[7px] text-terracotta">938 391 853</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
