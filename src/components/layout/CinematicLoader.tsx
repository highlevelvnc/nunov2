// src/components/layout/CinematicLoader.tsx
"use client";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useStore } from "@/store";

export default function CinematicLoader() {
  const { isLoading, loadProgress, setLoading, setLoadProgress } = useStore();
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    // Simulate loading: preload critical images + warm-up
    let progress = 0;
    const criticalImages = [
      "https://images.unsplash.com/photo-1555881400-74d7acaacd8b?w=1200&q=80",
    ];

    const interval = setInterval(() => {
      progress += Math.random() * 15 + 5;
      if (progress >= 100) {
        progress = 100;
        setLoadProgress(100);
        clearInterval(interval);
        setTimeout(() => {
          setLoading(false);
          setTimeout(() => setVisible(false), 800);
        }, 400);
      } else {
        setLoadProgress(Math.min(progress, 95));
      }
    }, 100);

    // Preload images
    criticalImages.forEach((src) => {
      const img = new Image();
      img.src = src;
    });

    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-charcoal-800"
          exit={{
            opacity: 0,
            filter: "blur(20px)",
            scale: 1.05,
          }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
        >
          {/* Grain */}
          <div className="absolute inset-0 opacity-5" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          }} />

          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="text-center mb-16"
          >
            <div className="font-display text-4xl md:text-5xl font-light tracking-[0.15em] text-offwhite mb-2">
              NUNO REIS
            </div>
            <div className="font-sans text-xs tracking-[0.4em] text-charcoal-300 uppercase">
              Real Estate Team
            </div>
            <div className="mt-3 w-8 h-px bg-terracotta mx-auto" />
          </motion.div>

          {/* Progress */}
          <div className="w-48 space-y-3">
            <div className="relative h-px bg-charcoal-600 overflow-hidden">
              <motion.div
                className="absolute inset-y-0 left-0 bg-terracotta"
                style={{ width: `${loadProgress}%` }}
                transition={{ type: "tween", ease: "linear", duration: 0.1 }}
              />
            </div>
            <div className="flex justify-between items-center">
              <span className="font-mono text-xs text-charcoal-400 tracking-widest">
                Lisboa
              </span>
              <span className="font-mono text-xs text-charcoal-300">
                {Math.round(loadProgress)}%
              </span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
