import type { Product } from "@/data/products";
import type { MeatType } from "@/data/meatCategories";

export type ProductCategory = Product["category"];

export type CutTypeFilter =
  | "all"
  | "ribeye"
  | "strip"
  | "filet"
  | "tbone";

export type GradeFilter = "ПРЕМИУМ" | "ХАТААСАН" | "СОНГОДОГ";

export type SortOption = "featured" | "price-asc" | "price-desc";

const cutTypeMap: Record<Exclude<CutTypeFilter, "all">, string[]> = {
  ribeye: ["ribeye"],
  strip: ["strip"],
  filet: ["filet"],
  tbone: ["tbone"],
};

export function matchesCutType(product: Product, cut: CutTypeFilter): boolean {
  if (cut === "all") return true;
  return product.cutType ? cutTypeMap[cut].includes(product.cutType) : false;
}

export function matchesGrade(product: Product, grades: GradeFilter[]): boolean {
  if (grades.length === 0) return true;

  return grades.some((grade) => {
    if (grade === "ПРЕМИУМ") {
      return Boolean(product.grade) || product.badge?.includes("ПРЕМИУМ");
    }
    if (grade === "ХАТААСАН") {
      return (
        product.category === "dry-aged" ||
        Boolean(product.badge?.includes("ХАТААСАН")) ||
        Boolean(product.badge?.includes("ХОНОГ"))
      );
    }
    if (grade === "СОНГОДОГ") {
      return product.category === "bundles" || product.category === "beef";
    }
    return false;
  });
}

export function filterProducts(
  products: Product[],
  {
    category,
    cut,
    grades,
    sort,
    query,
    meatType,
    excludeBundles,
    bundlesOnly,
  }: {
    category?: ProductCategory | null;
    cut?: CutTypeFilter;
    grades?: GradeFilter[];
    sort?: SortOption;
    query?: string;
    meatType?: MeatType | null;
    excludeBundles?: boolean;
    bundlesOnly?: boolean;
  },
): Product[] {
  let result = [...products];

  if (excludeBundles) {
    result = result.filter((p) => p.category !== "bundles" && !p.bundle);
  }

  if (bundlesOnly) {
    result = result.filter((p) => p.category === "bundles" || Boolean(p.bundle));
  }

  if (category) {
    result = result.filter((p) => p.category === category);
  }

  if (meatType) {
    result = result.filter((p) => p.meatTypes?.includes(meatType));
  }

  if (cut && cut !== "all") {
    result = result.filter((p) => matchesCutType(p, cut));
  }

  if (grades && grades.length > 0) {
    result = result.filter((p) => matchesGrade(p, grades));
  }

  if (query) {
    const q = query.toLowerCase();
    result = result.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q),
    );
  }

  if (sort === "price-asc") {
    result.sort((a, b) => a.price - b.price);
  } else if (sort === "price-desc") {
    result.sort((a, b) => b.price - a.price);
  }

  return result;
}

export const PACKAGING_FEE = 12500;
export const DELIVERY_FEE = 15000;
export const TAX_RATE = 0.08;

export function calculateOrderTotal(subtotal: number) {
  const packaging = subtotal > 0 ? PACKAGING_FEE : 0;
  const delivery = subtotal > 0 ? DELIVERY_FEE : 0;
  const tax = Math.round(subtotal * TAX_RATE);
  const total = subtotal + packaging + delivery + tax;

  return { subtotal, packaging, delivery, tax, total };
}
