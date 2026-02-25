// src/hooks/usePerfMode.ts
"use client";
import { useEffect } from "react";
import { useStore } from "@/store";

export function usePerfMode() {
  const setPerfMode = useStore((s) => s.setPerfMode);

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const lowMemory = (navigator as any).deviceMemory != null && (navigator as any).deviceMemory <= 4;
    const lowCPU = navigator.hardwareConcurrency != null && navigator.hardwareConcurrency <= 4;
    const isTouch = "ontouchstart" in window;

    if (prefersReduced || lowMemory || (lowCPU && isTouch)) {
      setPerfMode("low");
    } else {
      setPerfMode("high");
    }
  }, [setPerfMode]);
}
