// src/types/index.ts

export interface Property {
  id: string;
  slug: string;
  title: string;
  neighborhood: string;
  price: number;
  currency: string;
  bedrooms: number;
  bathrooms: number;
  area_m2: number;
  floor?: number;
  year?: number;
  condo_fee?: number;
  tags: string[];
  features: string[];
  description_pt: string;
  description_en: string;
  images: string[];
  lat?: number;
  lng?: number;
  status: "for_sale" | "sold" | "reserved";
}

export interface TeamMember {
  id: string;
  name: string;
  role_pt: string;
  role_en: string;
  bio_pt: string;
  bio_en: string;
  photo: string;
  phone?: string;
  email?: string;
}

export interface Testimonial {
  id: string;
  name: string;
  text_pt: string;
  text_en: string;
  neighborhood: string;
  date: string;
  rating: number;
}

export interface BlogPost {
  id: string;
  slug: string;
  title_pt: string;
  title_en: string;
  excerpt_pt: string;
  excerpt_en: string;
  content_pt: string;
  content_en: string;
  cover: string;
  date: string;
  readTime: number;
  tags: string[];
}

export interface FilterState {
  minPrice: number;
  maxPrice: number;
  bedrooms: number[];
  neighborhoods: string[];
  minArea: number;
  maxArea: number;
  tags: string[];
  search: string;
}
