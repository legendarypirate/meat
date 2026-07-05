"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import type { Product } from "@/types/product";
import { useProductCatalog } from "@/context/ProductCatalogContext";

type WishlistContextValue = {
  items: Product[];
  itemCount: number;
  isInWishlist: (productId: string) => boolean;
  toggleItem: (productId: string) => void;
  removeItem: (productId: string) => void;
  clearWishlist: () => void;
  toast: string | null;
  dismissToast: () => void;
};

const WishlistContext = createContext<WishlistContextValue | null>(null);

const STORAGE_KEY = "burkhant-wishlist";

function loadWishlist(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as string[]) : [];
  } catch {
    return [];
  }
}

function saveWishlist(ids: string[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
}

export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const products = useProductCatalog();
  const [ids, setIds] = useState<string[]>([]);
  const [hydrated, setHydrated] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => {
    setIds(loadWishlist());
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated) saveWishlist(ids);
  }, [ids, hydrated]);

  const dismissToast = useCallback(() => setToast(null), []);

  const isInWishlist = useCallback(
    (productId: string) => ids.includes(productId),
    [ids],
  );

  const toggleItem = useCallback((productId: string) => {
    const product = products.find((p) => p.id === productId);
    if (!product) return;

    setIds((prev) => {
      const exists = prev.includes(productId);
      if (exists) {
        setToast(`${product.name} хадгалснаас хасагдлаа`);
        return prev.filter((id) => id !== productId);
      }
      setToast(`${product.name} хадгалсан жагсаалтад нэмэгдлээ`);
      return [...prev, productId];
    });
    setTimeout(() => setToast(null), 3000);
  }, [products]);

  const removeItem = useCallback((productId: string) => {
    setIds((prev) => prev.filter((id) => id !== productId));
  }, []);

  const clearWishlist = useCallback(() => setIds([]), []);

  const items = useMemo(
    () =>
      ids
        .map((id) => products.find((p) => p.id === id))
        .filter((p): p is Product => p !== undefined),
    [ids, products],
  );

  const value = useMemo(
    () => ({
      items,
      itemCount: items.length,
      isInWishlist,
      toggleItem,
      removeItem,
      clearWishlist,
      toast,
      dismissToast,
    }),
    [
      items,
      isInWishlist,
      toggleItem,
      removeItem,
      clearWishlist,
      toast,
      dismissToast,
    ],
  );

  return (
    <WishlistContext.Provider value={value}>
      {children}
      {toast && (
        <div className="fixed bottom-6 left-1/2 z-[100] -translate-x-1/2">
          <div className="flex items-center gap-3 rounded-xl bg-primary-dark px-6 py-3 text-sm font-semibold text-white shadow-lg">
            {toast}
            <button
              type="button"
              onClick={dismissToast}
              className="ml-2 text-white/70 hover:text-white"
              aria-label="Хаах"
            >
              ×
            </button>
          </div>
        </div>
      )}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error("useWishlist must be used within WishlistProvider");
  }
  return context;
}
