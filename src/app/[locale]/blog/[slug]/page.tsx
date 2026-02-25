// src/app/[locale]/blog/[slug]/page.tsx
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { posts } from "@/data/posts";
import { Clock, ChevronLeft } from "lucide-react";

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const post = posts.find((p) => p.slug === slug);
  if (!post) notFound();

  const isPt = locale === "pt";

  return (
    <div className="pt-24 min-h-screen">
      <div className="max-w-3xl mx-auto px-6 py-12">
        <Link
          href={`/${locale}/blog`}
          className="inline-flex items-center gap-2 font-mono text-[10px] tracking-widest text-charcoal-400 uppercase hover:text-offwhite transition-colors mb-8"
        >
          <ChevronLeft size={14} />
          Blog
        </Link>

        <div className="flex items-center gap-3 mb-4">
          {post.tags.map((tag) => (
            <span key={tag} className="font-mono text-[9px] tracking-widest uppercase text-terracotta border border-terracotta/30 px-2 py-0.5">
              {tag}
            </span>
          ))}
        </div>

        <h1 className="font-display text-4xl md:text-5xl font-light text-offwhite mb-4 leading-tight">
          {isPt ? post.title_pt : post.title_en}
        </h1>

        <div className="flex items-center gap-4 mb-8 font-mono text-[10px] tracking-widest text-charcoal-500">
          <span>{new Date(post.date).toLocaleDateString(isPt ? "pt-PT" : "en-GB")}</span>
          <div className="flex items-center gap-1">
            <Clock size={11} />
            {post.readTime} min
          </div>
        </div>

        <div className="relative aspect-video overflow-hidden mb-10">
          <Image src={post.cover} alt={isPt ? post.title_pt : post.title_en} fill className="object-cover" />
        </div>

        <div className="font-sans text-charcoal-200 leading-relaxed space-y-4">
          <p className="text-lg">{isPt ? post.excerpt_pt : post.excerpt_en}</p>
          <div className="h-px bg-charcoal-700 my-6" />
          <p className="whitespace-pre-line">{isPt ? post.content_pt : post.content_en}</p>
          <div className="mt-12 p-6 bg-charcoal-700/40 border border-charcoal-600">
            <div className="font-display text-lg text-offwhite mb-2">
              {isPt ? "Tem dúvidas sobre o mercado imobiliário?" : "Questions about the real estate market?"}
            </div>
            <p className="font-sans text-sm text-charcoal-300 mb-4">
              {isPt ? "Fale connosco no WhatsApp. Resposta rápida garantida." : "Talk to us on WhatsApp. Quick response guaranteed."}
            </p>
            <a
              href="https://wa.me/351938391853"
              target="_blank"
              className="inline-flex items-center gap-2 bg-terracotta text-white font-sans text-sm px-6 py-3 hover:bg-terracotta-light transition-colors"
            >
              WhatsApp
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
