// src/components/layout/PageTransition.tsx
"use client";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import { useStore } from "@/store";

export default function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { perfMode } = useStore();

  if (perfMode === "low") {
    return (
      <AnimatePresence mode="wait">
        <motion.div
          key={pathname}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {children}
        </motion.div>
      </AnimatePresence>
    );
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        initial={{ opacity: 0, filter: "blur(8px)", scale: 0.99 }}
        animate={{ opacity: 1, filter: "blur(0px)", scale: 1 }}
        exit={{ opacity: 0, filter: "blur(8px)", scale: 1.01 }}
        transition={{
          duration: 0.55,
          ease: [0.76, 0, 0.24, 1],
        }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
