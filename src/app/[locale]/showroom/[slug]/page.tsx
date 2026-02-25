// src/app/[locale]/showroom/[slug]/page.tsx
"use client";
import { use } from "react";
import { useRouter } from "next/navigation";
import { notFound } from "next/navigation";
import { AnimatePresence } from "framer-motion";
import { properties } from "@/data/properties";
import ShowroomMode from "@/components/showroom/ShowroomMode";
import { useStore } from "@/store";

export default function ShowroomPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = use(params);
  const property = properties.find((p) => p.slug === slug);
  const router = useRouter();
  const { setShowroomSlide } = useStore();

  if (!property) notFound();

  const handleClose = () => {
    setShowroomSlide(0);
    router.push(`/${locale}/propriedades/${slug}`);
  };

  return (
    <AnimatePresence>
      <ShowroomMode property={property} locale={locale} onClose={handleClose} />
    </AnimatePresence>
  );
}
