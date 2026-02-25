// src/components/layout/CustomCursor.tsx
"use client";
import { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useStore } from "@/store";

export default function CustomCursor() {
  const { cursorVariant } = useStore();
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);
  const haloX = useSpring(mouseX, { damping: 25, stiffness: 200 });
  const haloY = useSpring(mouseY, { damping: 25, stiffness: 200 });
  const visible = useRef(false);

  useEffect(() => {
    // Only on desktop
    if ("ontouchstart" in window) return;

    const move = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!visible.current) visible.current = true;
    };

    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, [mouseX, mouseY]);

  const dotSize = cursorVariant === "link" ? 6 : cursorVariant === "card" ? 8 : 5;
  const haloSize = cursorVariant === "link" ? 40 : cursorVariant === "card" ? 50 : 32;

  return (
    <>
      {/* Dot */}
      <motion.div
        className="fixed top-0 left-0 rounded-full bg-offwhite pointer-events-none z-[9997] mix-blend-difference"
        style={{
          x: mouseX,
          y: mouseY,
          width: dotSize,
          height: dotSize,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{ scale: cursorVariant === "link" ? 1.5 : 1 }}
        transition={{ duration: 0.15 }}
      />
      {/* Halo */}
      <motion.div
        className="fixed top-0 left-0 rounded-full border border-offwhite/30 pointer-events-none z-[9996]"
        style={{
          x: haloX,
          y: haloY,
          width: haloSize,
          height: haloSize,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{ opacity: cursorVariant === "drag" ? 0.6 : 0.3 }}
      />
    </>
  );
}
