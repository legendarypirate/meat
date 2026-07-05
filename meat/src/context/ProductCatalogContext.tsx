"use client";

import { createContext, useContext } from "react";
import type { Product } from "@/types/product";

const ProductCatalogContext = createContext<Product[]>([]);

export function ProductCatalogProvider({
  products,
  children,
}: {
  products: Product[];
  children: React.ReactNode;
}) {
  return (
    <ProductCatalogContext.Provider value={products}>
      {children}
    </ProductCatalogContext.Provider>
  );
}

export function useProductCatalog() {
  return useContext(ProductCatalogContext);
}
