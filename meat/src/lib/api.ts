import type { Product } from "@/types/product";
import type { BundleInfo } from "@/data/bundles";
import type { MeatType } from "@/data/meatCategories";

const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

type ApiProduct = {
  id: string;
  slug: string;
  name: string;
  description?: string;
  longDescription?: string;
  price: number;
  priceUnit: string;
  image?: string;
  images?: string[];
  badge?: string;
  badgeVariant?: string;
  grade?: string;
  category?: string;
  cutType?: string;
  weight?: string;
  meatTypes?: string[];
  highlights?: Product["highlights"];
  cookingTips?: string[];
  sizes?: Product["sizes"];
  bundle?: BundleInfo;
};

function normalizeBundle(bundle: BundleInfo | undefined): BundleInfo | undefined {
  if (!bundle) return undefined;
  return {
    ...bundle,
    items: (bundle.items ?? []).map((item) => ({
      ...item,
      image: item.image || "",
    })),
    extras: bundle.extras ?? [],
    bundleBenefits: bundle.bundleBenefits ?? [],
    regularOrderDrawbacks: bundle.regularOrderDrawbacks ?? [],
  };
}

function normalizeProduct(raw: ApiProduct): Product {
  const images = raw.images?.length ? raw.images : raw.image ? [raw.image] : [];
  const image = raw.image || images[0] || "";
  const category = (
    raw.bundle ? "bundles" : raw.category || "beef"
  ) as Product["category"];

  return {
    id: String(raw.id),
    slug: raw.slug,
    name: raw.name,
    description: raw.description ?? "",
    longDescription: raw.longDescription ?? raw.description ?? "",
    price: Number(raw.price),
    priceUnit: raw.priceUnit,
    image,
    images,
    badge: raw.badge,
    badgeVariant: raw.badgeVariant as Product["badgeVariant"],
    grade: raw.grade,
    category,
    meatTypes: raw.meatTypes as MeatType[] | undefined,
    cutType: raw.cutType,
    weight: raw.weight,
    sizes: raw.sizes,
    highlights: raw.highlights,
    cookingTips: raw.cookingTips,
    bundle: normalizeBundle(raw.bundle),
  };
}

export type FetchProductsParams = {
  category?: string;
  type?: string;
  q?: string;
};

export async function fetchProducts(
  params?: FetchProductsParams,
): Promise<Product[]> {
  const search = new URLSearchParams();
  if (params?.category) search.set("category", params.category);
  if (params?.type) search.set("type", params.type);
  if (params?.q) search.set("q", params.q);
  const qs = search.toString();

  const res = await fetch(`${API}/api/products${qs ? `?${qs}` : ""}`, {
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch products (${res.status})`);
  }

  const data = (await res.json()) as ApiProduct[];
  return data.map(normalizeProduct);
}

export async function fetchProductBySlug(slug: string): Promise<Product | null> {
  const res = await fetch(`${API}/api/products/${encodeURIComponent(slug)}`, {
    next: { revalidate: 60 },
  });

  if (res.status === 404) return null;
  if (!res.ok) {
    throw new Error(`Failed to fetch product (${res.status})`);
  }

  return normalizeProduct((await res.json()) as ApiProduct);
}
