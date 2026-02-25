// src/store/index.ts
import { create } from "zustand";
import { FilterState } from "@/types";

type PerfMode = "high" | "low";

interface AppStore {
  // Loader
  isLoading: boolean;
  loadProgress: number;
  setLoading: (v: boolean) => void;
  setLoadProgress: (v: number) => void;

  // Perf
  perfMode: PerfMode;
  setPerfMode: (v: PerfMode) => void;

  // Locale
  locale: "pt" | "en";
  setLocale: (v: "pt" | "en") => void;

  // Filters
  filters: FilterState;
  setFilters: (f: Partial<FilterState>) => void;
  resetFilters: () => void;

  // Showroom
  showroomActive: boolean;
  showroomSlide: number;
  setShowroomActive: (v: boolean) => void;
  setShowroomSlide: (v: number) => void;

  // Cursor
  cursorVariant: "default" | "link" | "drag" | "card";
  setCursorVariant: (v: AppStore["cursorVariant"]) => void;
}

const defaultFilters: FilterState = {
  minPrice: 0,
  maxPrice: 2000000,
  bedrooms: [],
  neighborhoods: [],
  minArea: 0,
  maxArea: 500,
  tags: [],
  search: "",
};

export const useStore = create<AppStore>((set) => ({
  isLoading: true,
  loadProgress: 0,
  setLoading: (v) => set({ isLoading: v }),
  setLoadProgress: (v) => set({ loadProgress: v }),

  perfMode: "high",
  setPerfMode: (v) => set({ perfMode: v }),

  locale: "pt",
  setLocale: (v) => set({ locale: v }),

  filters: defaultFilters,
  setFilters: (f) => set((s) => ({ filters: { ...s.filters, ...f } })),
  resetFilters: () => set({ filters: defaultFilters }),

  showroomActive: false,
  showroomSlide: 0,
  setShowroomActive: (v) => set({ showroomActive: v }),
  setShowroomSlide: (v) => set({ showroomSlide: v }),

  cursorVariant: "default",
  setCursorVariant: (v) => set({ cursorVariant: v }),
}));
