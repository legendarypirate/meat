"use client";

import { FillImage } from "@/components/ui/FillImage";
import Link from "next/link";
import { Package, ShoppingCart } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { useCart } from "@/context/CartContext";
import { WishlistButton } from "@/components/wishlist/WishlistButton";
import { getBundleSavings, isBundleProduct } from "@/data/bundles";
import { formatPrice } from "@/lib/utils";
import type { Product } from "@/types/product";

type ProductCardProps = {
  product: Product;
  variant?: "home" | "shop";
};

export function ProductCard({ product, variant = "shop" }: ProductCardProps) {
  const { addItem } = useCart();
  const isBundle = isBundleProduct(product);
  const savings =
    isBundle && product.bundle
      ? getBundleSavings(product.bundle, product.price)
      : null;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (isBundle && product.bundle) {
      addItem(product.id, 1, `${product.bundle.items.length} зүйл`);
    } else {
      const defaultSize = product.sizes?.[0]?.label ?? product.weight;
      addItem(product.id, 1, defaultSize);
    }
  };

  const cardContent = (
    <>
      <Link
        href={`/products/${product.slug}`}
        className={`relative block overflow-hidden ${
          variant === "home" ? "aspect-[4/3]" : "aspect-square"
        }`}
      >
        <FillImage
          src={product.image}
          alt={product.name}
          size="card"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute left-3 top-3 flex flex-col gap-1.5">
          {isBundle && <Badge variant="green">БАГЦ</Badge>}
          {product.badge && !isBundle && (
            <Badge variant={product.badgeVariant ?? "green"}>{product.badge}</Badge>
          )}
          {product.badge && isBundle && (
            <Badge variant={product.badgeVariant ?? "dark"}>{product.badge}</Badge>
          )}
          {savings && savings.savingsPercent > 0 && (
            <Badge variant="dark">-{savings.savingsPercent}%</Badge>
          )}
        </div>
        <div className="absolute right-3 top-3">
          <WishlistButton productId={product.id} />
        </div>
      </Link>
      <div className={variant === "home" ? "p-5" : "p-4"}>
        <Link href={`/products/${product.slug}`}>
          <h3 className={variant === "home" ? "text-lg font-bold" : "font-semibold"}>
            {product.name}
          </h3>
        </Link>
        {isBundle && product.bundle && (
          <p className="mt-1 flex items-center gap-1 text-xs text-muted">
            <Package className="h-3.5 w-3.5" />
            {product.bundle.items.length} зүйл · {product.bundle.serves}
          </p>
        )}
        <p
          className={`font-semibold text-primary ${
            variant === "home" ? "mt-1 text-lg" : "mt-3 text-sm"
          }`}
        >
          {formatPrice(product.price)}
          {!isBundle && ` / ${product.priceUnit}`}
          {isBundle && " / багц"}
        </p>
        {savings && (
          <p className="mt-0.5 text-xs text-muted line-through">
            {formatPrice(product.bundle!.regularTotalPrice)}
          </p>
        )}
        <p
          className={`line-clamp-2 text-muted ${
            variant === "home"
              ? "mt-2 text-sm leading-relaxed"
              : "mt-1 text-sm"
          }`}
        >
          {product.description}
        </p>
        {isBundle ? (
          <div className="mt-3 flex gap-2">
            <Link
              href={`/products/${product.slug}`}
              className="flex-1 rounded-lg border border-primary py-2.5 text-center text-xs font-bold uppercase tracking-wider text-primary transition-colors hover:bg-primary-light"
            >
              Дэлгэрэнгүй
            </Link>
            <button
              type="button"
              onClick={handleAddToCart}
              className="flex-1 rounded-lg bg-primary py-2.5 text-xs font-bold uppercase tracking-wider text-white transition-colors hover:bg-primary-dark"
            >
              Багц авах
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={handleAddToCart}
            className={`w-full rounded-lg bg-primary text-xs font-bold uppercase tracking-wider text-white transition-colors hover:bg-primary-dark ${
              variant === "home"
                ? "mt-4 flex items-center justify-center gap-2 py-3"
                : "mt-3 py-2.5"
            }`}
          >
            {variant === "home" && <ShoppingCart className="h-4 w-4" />}
            Сагсанд нэмэх
          </button>
        )}
      </div>
    </>
  );

  return (
    <div
      className={`group overflow-hidden bg-white shadow-sm transition-shadow hover:shadow-md ${
        variant === "home" ? "rounded-2xl" : "rounded-xl"
      } ${isBundle ? "ring-1 ring-primary/20" : ""}`}
    >
      {cardContent}
    </div>
  );
}

export function FeaturedProducts({ products }: { products: Product[] }) {
  const regular = products.filter((p) => p.category !== "bundles" && !p.bundle);
  return (
    <section className="py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 max-w-2xl">
          <h2 className="text-3xl font-bold lg:text-4xl">
            Мах бэлтгэгчийн сонголт
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-muted">
            Манай мах бэлтгэгчид өдөр бүр шинээр сонгосон, хамгийн
            чанартай бүтээгдэхүүнүүдийг танилцуулж байна.
          </p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {regular.slice(0, 3).map((product) => (
            <ProductCard key={product.id} product={product} variant="home" />
          ))}
        </div>
      </div>
    </section>
  );
}

export function FeaturedBundles({ products }: { products: Product[] }) {
  const bundles = products.filter((p) => p.category === "bundles" || p.bundle);
  if (bundles.length === 0) return null;

  return (
    <section className="bg-surface py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-wider text-primary">
              Багц
            </p>
            <h2 className="mt-2 text-3xl font-bold lg:text-4xl">
              Хэмнэлттэй багцууд
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              Каталогийн бүтээгдэхүүнүүдээс бүрдсэн бэлэн багцууд.
            </p>
          </div>
          <a
            href="/bundles"
            className="text-sm font-semibold text-primary hover:underline"
          >
            Бүх багц →
          </a>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {bundles.slice(0, 3).map((product) => (
            <ProductCard key={product.id} product={product} variant="home" />
          ))}
        </div>
      </div>
    </section>
  );
}
