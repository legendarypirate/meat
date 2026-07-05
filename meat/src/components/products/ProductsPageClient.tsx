"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { ProductCard } from "@/components/products/ProductCard";
import { products } from "@/data/products";
import type { MeatType } from "@/data/meatCategories";
import { meatCategories } from "@/data/meatCategories";
import {
  filterProducts,
  type CutTypeFilter,
  type GradeFilter,
  type ProductCategory,
  type SortOption,
} from "@/lib/products";

const cutTypes: { label: string; value: CutTypeFilter }[] = [
  { label: "Ribeye", value: "ribeye" },
  { label: "New York Strip", value: "strip" },
  { label: "Filet Mignon", value: "filet" },
  { label: "T-Bone", value: "tbone" },
];

const grades: GradeFilter[] = ["ПРЕМИУМ", "ХАТААСАН", "СОНГОДОГ"];

const ITEMS_PER_PAGE = 6;

const categoryTitles: Record<Exclude<ProductCategory, "bundles">, string> = {
  beef: "Дээд зэрэглэлийн үхрийн мах",
  "dry-aged": "Удаан хатаасан мах",
};

const meatTypeTitles: Record<MeatType, string> = {
  steak: "Стейк",
  tsul: "Цул мах",
  yastai: "Ястай мах",
};

export function ProductsPageClient() {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get("category") as ProductCategory | null;
  const typeParam = searchParams.get("type") as MeatType | null;
  const queryParam = searchParams.get("q") ?? "";

  const [selectedCut, setSelectedCut] = useState<CutTypeFilter>("all");
  const [selectedGrades, setSelectedGrades] = useState<GradeFilter[]>([]);
  const [sort, setSort] = useState<SortOption>("featured");
  const [currentPage, setCurrentPage] = useState(1);

  const filtered = useMemo(
    () =>
      filterProducts(products, {
        category: categoryParam,
        meatType: typeParam,
        cut: selectedCut,
        grades: selectedGrades,
        sort,
        query: queryParam,
        excludeBundles: true,
      }),
    [categoryParam, typeParam, selectedCut, selectedGrades, sort, queryParam],
  );

  const totalPages = Math.max(1, Math.ceil(filtered.length / ITEMS_PER_PAGE));
  const paginated = filtered.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  );

  const toggleGrade = (grade: GradeFilter) => {
    setSelectedGrades((prev) =>
      prev.includes(grade) ? prev.filter((g) => g !== grade) : [...prev, grade],
    );
    setCurrentPage(1);
  };

  const clearFilters = () => {
    setSelectedCut("all");
    setSelectedGrades([]);
    setSort("featured");
    setCurrentPage(1);
  };

  const pageTitle = typeParam
    ? meatTypeTitles[typeParam]
    : categoryParam && categoryParam !== "bundles"
      ? categoryTitles[categoryParam as Exclude<ProductCategory, "bundles">]
      : "Дээд зэрэглэлийн үхрийн мах";

  const activeCategoryLabel = typeParam
    ? meatCategories.find((c) => c.slug === typeParam)?.name
    : categoryParam
      ? categoryTitles[categoryParam]
      : null;

  return (
    <>
      <div className="mb-10">
        <p className="text-xs font-bold uppercase tracking-wider text-primary">
          Шинээр бэлтгэсэн сонголт
        </p>
        <h1 className="mt-2 text-4xl font-bold lg:text-5xl">{pageTitle}</h1>
        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted">
          Монголын бэлчээр дээр чөлөөтэй өссөн, уламжлалт аргаар бэлтгэгдсэн
          дээд зэрэглэлийн үхрийн махны сонголт.
          {queryParam && (
            <span className="ml-1 font-semibold text-foreground">
              Хайлт: &ldquo;{queryParam}&rdquo;
            </span>
          )}
          {activeCategoryLabel && !queryParam && (
            <span className="ml-1 font-semibold text-primary">
              — {activeCategoryLabel}
            </span>
          )}
        </p>
      </div>

      <div className="flex flex-col gap-10 lg:flex-row">
        <aside className="w-full shrink-0 lg:w-64">
          <h3 className="text-lg font-bold">Шүүлтүүр</h3>

          <div className="mt-6">
            <h4 className="text-xs font-bold uppercase tracking-wider text-muted">
              Зүсэгийн төрөл
            </h4>
            <ul className="mt-3 space-y-2">
              <li>
                <label className="flex cursor-pointer items-center gap-3 text-sm">
                  <input
                    type="radio"
                    name="cutType"
                    checked={selectedCut === "all"}
                    onChange={() => {
                      setSelectedCut("all");
                      setCurrentPage(1);
                    }}
                    className="h-4 w-4 accent-primary"
                  />
                  Бүгд
                </label>
              </li>
              {cutTypes.map((cut) => (
                <li key={cut.value}>
                  <label className="flex cursor-pointer items-center gap-3 text-sm">
                    <input
                      type="radio"
                      name="cutType"
                      checked={selectedCut === cut.value}
                      onChange={() => {
                        setSelectedCut(cut.value);
                        setCurrentPage(1);
                      }}
                      className="h-4 w-4 accent-primary"
                    />
                    {cut.label}
                  </label>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-8">
            <h4 className="text-xs font-bold uppercase tracking-wider text-muted">
              Зэрэглэл
            </h4>
            <div className="mt-3 flex flex-wrap gap-2">
              {grades.map((grade) => (
                <button
                  key={grade}
                  type="button"
                  onClick={() => toggleGrade(grade)}
                  className={`rounded-full px-4 py-1.5 text-xs font-semibold transition-colors ${
                    selectedGrades.includes(grade)
                      ? "bg-primary text-white"
                      : "border border-border text-muted hover:border-primary"
                  }`}
                >
                  {grade}
                </button>
              ))}
            </div>
          </div>

          <button
            type="button"
            onClick={clearFilters}
            className="mt-8 w-full rounded-lg bg-foreground py-3 text-xs font-bold uppercase tracking-wider text-white transition-colors hover:bg-foreground/90"
          >
            Шүүлтүүрийг арилгах
          </button>
        </aside>

        <div className="flex-1">
          <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-muted">
              Нийт{" "}
              <span className="font-semibold text-foreground">
                {filtered.length}
              </span>{" "}
              төрлийн мах харагдаж байна
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

          {paginated.length === 0 ? (
            <div className="rounded-xl bg-surface py-16 text-center">
              <p className="text-lg font-semibold">Бүтээгдэхүүн олдсонгүй</p>
              <p className="mt-2 text-sm text-muted">
                Шүүлтүүрээ өөрчилж дахин оролдоно уу.
              </p>
              <button
                type="button"
                onClick={clearFilters}
                className="mt-4 text-sm font-semibold text-primary hover:underline"
              >
                Шүүлтүүрийг арилгах
              </button>
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {paginated.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}

          {totalPages > 1 && (
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
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (page) => (
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
                ),
              )}
              <button
                type="button"
                onClick={() =>
                  setCurrentPage((p) => Math.min(totalPages, p + 1))
                }
                disabled={currentPage === totalPages}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-muted transition-colors hover:border-primary hover:text-primary disabled:opacity-40"
                aria-label="Next page"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
