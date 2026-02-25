# Nuno Reis Real Estate Team — Next.js 15 Website

Website cinematic completo para Nuno Reis Real Estate Team, Lisboa.

## Stack

- **Next.js 15+** (App Router)
- **TypeScript**
- **TailwindCSS** (paleta Lisboa: charcoal / off-white / terracotta / river)
- **Framer Motion** (microinterações + page transitions)
- **Three.js + @react-three/fiber** (WebGL shader na home)
- **Zustand** (estado global: loader, perfMode, filtros, showroom)
- **next-intl** (PT + EN)
- **Lenis** (smooth scroll)

## Setup

```bash
pnpm install
pnpm dev        # http://localhost:3000
pnpm build
pnpm start
```

## Estrutura de Pastas

```
src/
├── app/
│   ├── [locale]/
│   │   ├── layout.tsx          # Layout principal com fonts + providers
│   │   ├── page.tsx            # Home
│   │   ├── propriedades/
│   │   │   ├── page.tsx        # Listagem + filtros
│   │   │   └── [slug]/page.tsx # Detalhe do imóvel
│   │   ├── showroom/
│   │   │   └── [slug]/page.tsx # Showroom fullscreen
│   │   ├── vender/page.tsx     # Angariação / avaliação
│   │   ├── sobre/page.tsx      # Equipa (foto Nuno Reis)
│   │   ├── servicos/page.tsx   # Serviços
│   │   ├── blog/
│   │   │   ├── page.tsx
│   │   │   └── [slug]/page.tsx
│   │   ├── contato/page.tsx
│   │   └── angariacoes/page.tsx # Mockups de angariação
│   ├── globals.css
│   └── layout.tsx
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx
│   │   ├── Footer.tsx
│   │   ├── Hero.tsx            # Hero com WebGL background
│   │   ├── CinematicLoader.tsx # Loader com progress bar
│   │   ├── CustomCursor.tsx    # Cursor custom (desktop only)
│   │   ├── PageTransition.tsx  # Transições blur/dissolve
│   │   ├── Providers.tsx       # Lenis + perfMode init
│   │   ├── TestimonialsSection.tsx
│   │   └── SellCTASection.tsx
│   ├── property/
│   │   ├── PropertyCard.tsx    # Card imóvel
│   │   └── PropertyFilters.tsx # Filtros (preço, tipologia, bairro)
│   ├── showroom/
│   │   └── ShowroomMode.tsx    # Showroom fullscreen (5 slides)
│   └── webgl/
│       └── LisboaCanvas.tsx    # WebGL shader "luz de Lisboa"
├── data/
│   ├── properties.ts  # 14 imóveis mock (Lisboa)
│   ├── team.ts        # 4 membros incluindo Nuno Reis
│   ├── testimonials.ts # 6 testemunhos
│   └── posts.ts       # 6 posts blog
├── store/index.ts     # Zustand store global
├── hooks/usePerfMode.ts
├── lib/utils.ts
├── i18n/
│   ├── routing.ts
│   └── request.ts
├── types/index.ts
└── middleware.ts

messages/
├── pt.json
└── en.json

public/
└── team/
    └── nuno-reis.jpg  ← COLOCAR AQUI A FOTO DO NUNO REIS
```

## Foto do Nuno Reis

Coloque o retrato do consultor em:
```
public/team/nuno-reis.jpg
```

A imagem é usada na página `/sobre` e em áreas de confiança/autoridade.

## WebGL Shader — "Luz de Lisboa"

O shader GLSL está inline em `src/components/webgl/LisboaCanvas.tsx`.

**Uniforms:**
- `uTime` — tempo para movimento silk/wind
- `uMouse` — posição do cursor (ripple/parallax)
- `uScroll` — posição de scroll para parallax
- `uIntensity` — intensidade dos efeitos
- `uColorA/B/C` — paleta: charcoal escuro / azul rio / terracota

**Fallback:** Gradient CSS quando `perfMode=low`.

## Performance Mode

`usePerfMode.ts` detecta automaticamente dispositivos fracos:
- `prefers-reduced-motion`
- `deviceMemory <= 4` GB
- `hardwareConcurrency <= 4` cores + touch

Em `low` mode: sem WebGL, sem cursor custom, animações mínimas.

## Showroom Mode

Rota: `/pt/showroom/[slug]` e `/en/showroom/[slug]`

- 5 slides: Hero, Localização, Especificações, Destaques, Agendar Visita
- Navegação: ← → teclado + botões
- ESC para sair
- CTA flutuante WhatsApp +351 938 391 853
- Transições Framer Motion com easing premium

## Bairros de Lisboa

Arroios, Avenidas Novas, Alvalade, Campo de Ourique, Estrela, Marvila, Parque das Nações, Benfica, Lumiar

## SEO

Adicionar Schema.org em cada página:
```tsx
// Exemplo RealEstateAgent schema
<script type="application/ld+json">{JSON.stringify({
  "@context": "https://schema.org",
  "@type": "RealEstateAgent",
  "name": "Nuno Reis Real Estate Team",
  "telephone": "+351938391853",
  "address": { "@type": "PostalAddress", "addressLocality": "Lisboa" }
})}</script>
```

## Integrações a completar

- [ ] Foto `public/team/nuno-reis.jpg`
- [ ] Google Maps API (componente pronto para integrar)
- [ ] CMS para imóveis reais (Sanity, Strapi, etc.)
- [ ] Email form action (Resend, SendGrid)
- [ ] Google Analytics / Meta Pixel
