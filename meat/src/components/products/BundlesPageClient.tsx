"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { ProductCard } from "@/components/products/ProductCard";
import type { Product } from "@/types/product";
import { fetchProductsClient } from "@/lib/api";
import { filterProducts, type SortOption } from "@/lib/products";

const ITEMS_PER_PAGE = 6;

export function BundlesPageClient() {
  const searchParams = useSearchParams();
  const queryParam = searchParams.get("q") ?? "";
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [sort, setSort] = useState<SortOption>("featured");
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);

    fetchProductsClient({ category: "bundles", q: queryParam || undefined })
      .then((data) => {
        if (!cancelled) setProducts(data);
      })
      .catch((err) => {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : "Алдаа гарлаа");
          setProducts([]);
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [queryParam]);

  const filtered = useMemo(
    () =>
      filterProducts(products, {
        bundlesOnly: true,
        sort,
        query: queryParam,
      }),
    [products, sort, queryParam],
  );

  const totalPages = Math.max(1, Math.ceil(filtered.length / ITEMS_PER_PAGE));
  const paginated = filtered.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  );

  return (
    <>
      <div className="mb-10">
        <p className="text-xs font-bold uppercase tracking-wider text-primary">
          Багц бүтээгдэхүүн
        </p>
        <h1 className="mt-2 text-4xl font-bold lg:text-5xl">Багцууд</h1>
        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted">
          Каталогийн бүтээгдэхүүнүүдээс бүрдсэн хэмнэлттэй багцууд. Гэр бүл,
          BBQ, өдрийн хоолонд зориулсан бэлэн сонголтууд.
          {queryParam && (
            <span className="ml-1 font-semibold text-foreground">
              Хайлт: &ldquo;{queryParam}&rdquo;
            </span>
          )}
        </p>
      </div>

      <div>
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-muted">
            {loading ? (
              "Ачааллаж байна..."
            ) : (
              <>
                Нийт{" "}
                <span className="font-semibold text-foreground">{filtered.length}</span>{" "}
                багц
              </>
            )}
          </p>
          <select
            value={sort}
            onChange={(e) => {
              setSort(e.target.value as SortOption);
              setCurrentPage(1);
            }}
            className="rounded-lg border border-border bg-white px-4 py-2 text-sm outline-none focus:border-primary"
          >
            <option value="featured">Эрэмбэлэх: Онцлох</option>
            <option value="price-asc">Үнэ: Багаас их рүү</option>
            <option value="price-desc">Үнэ: Ихээс бага руу</option>
          </select>
        </div>

        {error && (
          <div className="mb-6 rounded-xl border border-destructive/30 bg-destructive/10 p-4 text-sm text-destructive">
            API холболт амжилтгүй: {error}
          </div>
        )}

        {loading ? (
          <div className="rounded-xl bg-surface py-16 text-center text-muted">
            Багц ачааллаж байна...
          </div>
        ) : paginated.length === 0 ? (
          <div className="rounded-xl bg-surface py-16 text-center">
            <p className="text-lg font-semibold">Багц олдсонгүй</p>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {paginated.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}

        {!loading && totalPages > 1 && (
          <div className="mt-12 flex items-center justify-center gap-2">
            <button
              type="button"
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-muted transition-colors hover:border-primary hover:text-primary disabled:opacity-40"
              aria-label="Previous page"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                type="button"
                onClick={() => setCurrentPage(page)}
                className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-semibold transition-colors ${
                  page === currentPage
                    ? "bg-primary text-white"
                    : "border border-border text-muted hover:border-primary hover:text-primary"
                }`}
              >
                {page}
              </button>
            ))}
            <button
              type="button"
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-muted transition-colors hover:border-primary hover:text-primary disabled:opacity-40"
              aria-label="Next page"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        )}
      </div>
    </>
  );
}
