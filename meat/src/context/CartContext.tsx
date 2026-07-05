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

export type CartItem = {
  productId: string;
  quantity: number;
  size?: string;
};

export type CartLineItem = CartItem & {
  product: Product;
};

type CartContextValue = {
  items: CartLineItem[];
  itemCount: number;
  subtotal: number;
  addItem: (productId: string, quantity?: number, size?: string) => void;
  removeItem: (productId: string, size?: string) => void;
  updateQuantity: (productId: string, quantity: number, size?: string) => void;
  clearCart: () => void;
  toast: string | null;
  dismissToast: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);

const STORAGE_KEY = "burkhant-cart";

function cartKey(productId: string, size?: string) {
  return `${productId}::${size ?? "default"}`;
}

function loadCart(): CartItem[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as CartItem[]) : [];
  } catch {
    return [];
  }
}

function saveCart(items: CartItem[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const products = useProductCatalog();
  const [items, setItems] = useState<CartItem[]>([]);
  const [hydrated, setHydrated] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => {
    setItems(loadCart());
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated) saveCart(items);
  }, [items, hydrated]);

  const dismissToast = useCallback(() => setToast(null), []);

  const addItem = useCallback(
    (productId: string, quantity = 1, size?: string) => {
      const product = products.find((p) => p.id === productId);
      if (!product) return;

      setItems((prev) => {
        const key = cartKey(productId, size);
        const existing = prev.find(
          (item) => cartKey(item.productId, item.size) === key,
        );

        if (existing) {
          return prev.map((item) =>
            cartKey(item.productId, item.size) === key
              ? { ...item, quantity: item.quantity + quantity }
              : item,
          );
        }

        return [...prev, { productId, quantity, size }];
      });

      setToast(`${product.name} сагсанд нэмэгдлээ`);
      setTimeout(() => setToast(null), 3000);
    },
    [products],
  );

  const removeItem = useCallback((productId: string, size?: string) => {
    const key = cartKey(productId, size);
    setItems((prev) =>
      prev.filter((item) => cartKey(item.productId, item.size) !== key),
    );
  }, []);

  const updateQuantity = useCallback(
    (productId: string, quantity: number, size?: string) => {
      const key = cartKey(productId, size);
      if (quantity <= 0) {
        removeItem(productId, size);
        return;
      }
      setItems((prev) =>
        prev.map((item) =>
          cartKey(item.productId, item.size) === key
            ? { ...item, quantity }
            : item,
        ),
      );
    },
    [removeItem],
  );

  const clearCart = useCallback(() => setItems([]), []);

  const lineItems = useMemo<CartLineItem[]>(
    () =>
      items
        .map((item) => {
          const product = products.find((p) => p.id === item.productId);
          return product ? { ...item, product } : null;
        })
        .filter((item): item is CartLineItem => item !== null),
    [items, products],
  );

  const itemCount = useMemo(
    () => lineItems.reduce((sum, item) => sum + item.quantity, 0),
    [lineItems],
  );

  const subtotal = useMemo(
    () =>
      lineItems.reduce(
        (sum, item) => sum + item.product.price * item.quantity,
        0,
      ),
    [lineItems],
  );

  const value = useMemo(
    () => ({
      items: lineItems,
      itemCount,
      subtotal,
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
      toast,
      dismissToast,
    }),
    [
      lineItems,
      itemCount,
      subtotal,
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
      toast,
      dismissToast,
    ],
  );

  return (
    <CartContext.Provider value={value}>
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
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within CartProvider");
  }
  return context;
}
