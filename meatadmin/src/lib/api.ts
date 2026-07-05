const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${API}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options?.headers,
    },
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: res.statusText }));
    throw new Error(err.error || err.message || "Request failed");
  }

  if (res.status === 204) return undefined as T;
  return res.json();
}

export type Category = {
  id: number;
  slug: string;
  name: string;
  image?: string;
  productCount?: number;
};

export type ProductImage = {
  id: number;
  url: string;
  sortOrder: number;
  cloudinaryPublicId?: string | null;
};

export type ProductImageInput = {
  url: string;
  publicId?: string;
};

export type BundleItem = {
  productId?: number;
  name: string;
  quantity: string;
  individualPrice: number;
  image?: string;
  description?: string;
};

export type BundleData = {
  totalWeight?: string;
  serves?: string;
  regularTotalPrice?: number;
  items: BundleItem[];
  extras?: string[];
  bundleBenefits?: string[];
  regularOrderDrawbacks?: string[];
};

export type Product = {
  id: number;
  slug: string;
  name: string;
  description?: string;
  longDescription?: string;
  price: number;
  priceUnit: string;
  image?: string;
  badge?: string;
  badgeVariant?: string;
  grade?: string;
  cutType?: string;
  weight?: string;
  isBundle?: boolean;
  bundleData?: BundleData;
  meatTypes?: string[];
  categoryId?: number;
  category?: Category;
  images?: ProductImage[];
};

export type Stats = {
  productCount: number;
  categoryCount: number;
  bundleCount: number;
  recentProducts: Product[];
};

export type ProductInput = Partial<Omit<Product, "images">> & {
  categorySlug?: string;
  images?: ProductImageInput[];
};

export type PurchaseOrderItem = {
  id: number;
  productId: number | null;
  productName: string;
  quantity: number;
  unitPrice: number;
  lineTotal: number;
  isBundle: boolean;
  product?: Product;
};

export type PurchaseOrder = {
  id: number;
  orderNumber: string;
  status: string;
  customerName: string;
  customerPhone?: string;
  customerEmail?: string;
  deliveryAddress?: string;
  notes?: string;
  subtotal: number;
  totalAmount: number;
  items: PurchaseOrderItem[];
  createdAt?: string;
};

export type PurchaseOrderItemInput = {
  productId?: number | null;
  productName?: string;
  quantity: number;
  unitPrice: number;
  isBundle?: boolean;
};

export type PurchaseOrderInput = {
  customerName: string;
  customerPhone?: string;
  customerEmail?: string;
  deliveryAddress?: string;
  notes?: string;
  status?: string;
  items: PurchaseOrderItemInput[];
};

export const api = {
  health: () => request<{ status: string; database: string }>("/api/health"),

  getStats: () => request<Stats>("/api/admin/stats"),

  getCategories: () => request<Category[]>("/api/admin/categories"),

  createCategory: (data: { slug: string; name: string; image?: string }) =>
    request<Category>("/api/admin/categories", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  updateCategory: (id: number, data: { slug?: string; name?: string; image?: string }) =>
    request<Category>(`/api/admin/categories/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    }),

  deleteCategory: (id: number) =>
    request<void>(`/api/admin/categories/${id}`, { method: "DELETE" }),

  getProducts: (params?: { isBundle?: boolean }) => {
    const q =
      params?.isBundle === true
        ? "?isBundle=true"
        : params?.isBundle === false
          ? "?isBundle=false"
          : "";
    return request<Product[]>(`/api/admin/products${q}`);
  },

  getProduct: (id: number) => request<Product>(`/api/admin/products/${id}`),

  createProduct: (data: ProductInput) =>
    request<Product>("/api/admin/products", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  updateProduct: (id: number, data: ProductInput) =>
    request<Product>(`/api/admin/products/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    }),

  deleteProduct: (id: number) =>
    request<void>(`/api/admin/products/${id}`, { method: "DELETE" }),

  uploadImage: async (file: File) => {
    const form = new FormData();
    form.append("file", file);
    const res = await fetch(`${API}/api/admin/upload`, {
      method: "POST",
      body: form,
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({ error: res.statusText }));
      throw new Error(err.error || "Upload failed");
    }
    return res.json() as Promise<{ url: string; publicId: string }>;
  },

  getPurchaseOrders: () => request<PurchaseOrder[]>("/api/admin/purchase-orders"),

  getPurchaseOrder: (id: number) =>
    request<PurchaseOrder>(`/api/admin/purchase-orders/${id}`),

  createPurchaseOrder: (data: PurchaseOrderInput) =>
    request<PurchaseOrder>("/api/admin/purchase-orders", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  updatePurchaseOrder: (id: number, data: PurchaseOrderInput) =>
    request<PurchaseOrder>(`/api/admin/purchase-orders/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    }),

  deletePurchaseOrder: (id: number) =>
    request<void>(`/api/admin/purchase-orders/${id}`, { method: "DELETE" }),
};
