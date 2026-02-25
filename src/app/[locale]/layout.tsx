// src/app/[locale]/layout.tsx
import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import Providers from "@/components/layout/Providers";
import CinematicLoader from "@/components/layout/CinematicLoader";
import CustomCursor from "@/components/layout/CustomCursor";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import "@/app/globals.css";

export const metadata: Metadata = {
  title: {
    default: "Nuno Reis Real Estate Team",
    template: "%s | Nuno Reis Real Estate Team",
  },
  description:
    "Imobiliário residencial em Lisboa. Comprar, vender e arrendar com acompanhamento real.",
  metadataBase: new URL("https://nunoreisrealteam.pt"),
  openGraph: {
    siteName: "Nuno Reis Real Estate Team",
    type: "website",
  },
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as "pt" | "en")) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-charcoal-800 text-offwhite antialiased">
        <NextIntlClientProvider messages={messages}>
          <Providers>
            <CinematicLoader />
            <CustomCursor />
            <Navbar locale={locale} />
            <main>{children}</main>
            <Footer locale={locale} />
          </Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
