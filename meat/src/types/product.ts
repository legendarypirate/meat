import type { MeatType } from "@/data/meatCategories";
import type { BundleInfo } from "@/data/bundles";

export type Product = {
  id: string;
  slug: string;
  name: string;
  nameEn?: string;
  description: string;
  longDescription: string;
  price: number;
  priceUnit: string;
  image: string;
  images: string[];
  badge?: string;
  badgeVariant?: "green" | "dark" | "olive";
  grade?: string;
  category: string;
  meatTypes?: MeatType[];
  cutType?: string;
  weight?: string;
  sizes?: { label: string; weight: string }[];
  highlights?: { icon: string; title: string; description: string }[];
  cookingTips?: string[];
  bundle?: BundleInfo;
};
