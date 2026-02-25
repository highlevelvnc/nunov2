// src/app/[locale]/blog/page.tsx
import Image from "next/image";
import Link from "next/link";
import { posts } from "@/data/posts";
import { Clock, ArrowRight } from "lucide-react";

export default async function BlogPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const isPt = locale === "pt";

  return (
    <div className="pt-24 min-h-screen">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="text-center mb-14">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-6 h-px bg-terracotta" />
            <span className="font-mono text-[11px] tracking-[0.35em] text-terracotta uppercase">Blog</span>
            <div className="w-6 h-px bg-terracotta" />
          </div>
          <h1 className="font-display text-5xl font-light text-offwhite">
            {isPt ? "Dicas & Mercado" : "Tips & Market"}
          </h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <Link
              key={post.id}
              href={`/${locale}/blog/${post.slug}`}
              className="group block"
            >
              <div className="relative aspect-video overflow-hidden mb-4">
                <Image
                  src={post.cover}
                  alt={isPt ? post.title_pt : post.title_en}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="flex items-center gap-3 mb-3">
                {post.tags.slice(0, 2).map((tag) => (
                  <span key={tag} className="font-mono text-[9px] tracking-widest uppercase text-charcoal-400 border border-charcoal-600 px-2 py-0.5">
                    {tag}
                  </span>
                ))}
              </div>
              <h2 className="font-display text-xl text-offwhite group-hover:text-terracotta transition-colors mb-2 leading-snug">
                {isPt ? post.title_pt : post.title_en}
              </h2>
              <p className="font-sans text-xs text-charcoal-300 line-clamp-2 mb-3">
                {isPt ? post.excerpt_pt : post.excerpt_en}
              </p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1 text-charcoal-500 font-mono text-[10px]">
                  <Clock size={11} />
                  {post.readTime} min
                </div>
                <span className="flex items-center gap-1 font-sans text-xs text-terracotta">
                  {isPt ? "Ler" : "Read"}
                  <ArrowRight size={12} />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
