"use client";

import { createContext, useContext, useEffect, useState } from "react";
import type { Product } from "@/types/product";
import { fetchProductsClient } from "@/lib/api";

const ProductCatalogContext = createContext<Product[]>([]);

export function ProductCatalogProvider({
  products: initialProducts,
  children,
}: {
  products: Product[];
  children: React.ReactNode;
}) {
  const [products, setProducts] = useState(initialProducts);

  useEffect(() => {
    fetchProductsClient()
      .then(setProducts)
      .catch((error) => console.error("Failed to refresh product catalog:", error));
  }, []);

  return (
    <ProductCatalogContext.Provider value={products}>
      {children}
    </ProductCatalogContext.Provider>
  );
}

export function useProductCatalog() {
  return useContext(ProductCatalogContext);
}
