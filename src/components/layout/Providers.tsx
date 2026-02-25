// src/components/layout/Providers.tsx
"use client";
import { useEffect } from "react";
import { usePerfMode } from "@/hooks/usePerfMode";

export default function Providers({ children }: { children: React.ReactNode }) {
  usePerfMode();

  useEffect(() => {
    let lenis: any;

    async function initLenis() {
      const { default: Lenis } = await import("lenis");
      lenis = new Lenis({
        duration: 1.2,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      });

      function raf(time: number) {
        lenis.raf(time);
        requestAnimationFrame(raf);
      }
      requestAnimationFrame(raf);
    }

    initLenis();
    return () => {
      lenis?.destroy();
    };
  }, []);

  return <>{children}</>;
}
