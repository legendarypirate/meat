"use client";

import { useState } from "react";
import { FillImage } from "@/components/ui/FillImage";
import Link from "next/link";
import {
  Minus,
  Plus,
  ShoppingBag,
  Clock,
  MapPin,
  Truck,
  UtensilsCrossed,
} from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { useCart } from "@/context/CartContext";
import { WishlistButton } from "@/components/wishlist/WishlistButton";
import { isBundleProduct } from "@/data/bundles";
import { BundleProductDetail } from "@/components/products/BundleProductDetail";
import { formatPrice } from "@/lib/utils";
import type { Product } from "@/types/product";

const iconMap = {
  utensils: UtensilsCrossed,
  clock: Clock,
  "map-pin": MapPin,
  truck: Truck,
};

type ProductDetailProps = {
  product: Product;
};

export function ProductDetail({ product }: ProductDetailProps) {
  if (isBundleProduct(product) && product.bundle) {
    return <BundleProductDetail product={{ ...product, bundle: product.bundle }} />;
  }

  return <RegularProductDetail product={product} />;
}

function RegularProductDetail({ product }: ProductDetailProps) {
  const { addItem } = useCart();
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  const selectedSizeLabel =
    product.sizes?.[selectedSize]?.label ?? product.weight;

  const handleAddToCart = () => {
    addItem(product.id, quantity, selectedSizeLabel);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <>
      <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
        <div>
          <div className="relative aspect-square overflow-hidden rounded-2xl bg-surface">
            <FillImage
              src={product.images[selectedImage]}
              alt={product.name}
              size="productMain"
              className="object-cover"
              priority
            />
          </div>
          <div className="mt-4 grid grid-cols-3 gap-3">
            {product.images.map((img, i) => (
              <button
                key={`${i}-${img}`}
                type="button"
                onClick={() => setSelectedImage(i)}
                className={`relative aspect-square overflow-hidden rounded-lg ${
                  selectedImage === i ? "ring-2 ring-primary" : ""
                }`}
              >
                <FillImage src={img} alt="" size="thumbnail" className="object-cover" />
              </button>
            ))}
          </div>
        </div>

        <div>
          <div className="flex flex-wrap gap-2">
            {product.badge && (
              <Badge variant={product.badgeVariant ?? "dark"}>
                {product.badge}
              </Badge>
            )}
            {product.grade && <Badge variant="outline">{product.grade}</Badge>}
            <Badge variant="outline">Энгийн захиалга</Badge>
          </div>

          <h1 className="mt-4 text-3xl font-bold lg:text-4xl">
            {product.name}
          </h1>
          <p className="mt-2 text-lg text-muted">
            {formatPrice(product.price)} / {product.priceUnit}
          </p>

          {product.sizes && (
            <div className="mt-8">
              <h3 className="text-xs font-bold uppercase tracking-wider text-muted">
                Хэмжээ сонгох (зузаан)
              </h3>
              <div className="mt-3 flex flex-wrap gap-3">
                {product.sizes.map((size, i) => (
                  <button
                    key={size.label}
                    type="button"
                    onClick={() => setSelectedSize(i)}
                    className={`rounded-lg border px-5 py-3 text-sm font-medium transition-colors ${
                      selectedSize === i
                        ? "border-primary bg-primary-light text-primary"
                        : "border-border hover:border-primary"
                    }`}
                  >
                    {size.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="mt-8">
            <h3 className="text-xs font-bold uppercase tracking-wider text-muted">
              Тоо хэмжээ
            </h3>
            <div className="mt-3 inline-flex items-center rounded-lg border border-border">
              <button
                type="button"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="px-4 py-2 text-muted hover:text-foreground"
                aria-label="Багасгах"
              >
                <Minus className="h-4 w-4" />
              </button>
              <span className="min-w-[3rem] text-center font-semibold">
                {quantity}
              </span>
              <button
                type="button"
                onClick={() => setQuantity(quantity + 1)}
                className="px-4 py-2 text-muted hover:text-foreground"
                aria-label="Нэмэх"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
          </div>

          <button
            type="button"
            onClick={handleAddToCart}
            className={`mt-8 flex w-full items-center justify-center gap-2 rounded-lg py-4 text-sm font-bold uppercase tracking-wider text-white transition-colors ${
              added
                ? "bg-primary-dark"
                : "bg-primary hover:bg-primary-dark"
            }`}
          >
            <ShoppingBag className="h-5 w-5" />
            {added ? "Сагсанд нэмэгдлээ!" : "Сагсанд хийх"}
          </button>

          <div className="mt-3">
            <WishlistButton productId={product.id} variant="detail" />
          </div>

          <Link
            href="/cart"
            className="mt-3 block text-center text-sm font-medium text-primary hover:underline"
          >
            Сагс руу очих →
          </Link>

          <Link
            href="/bundles"
            className="mt-4 block rounded-lg border border-primary/30 bg-primary-light/30 px-4 py-3 text-center text-sm text-primary hover:bg-primary-light/50"
          >
            Олон төрлийг нэг дор авах уу? → Багцууд үзэх
          </Link>

          {product.highlights && (
            <div className="mt-8 grid grid-cols-2 gap-3">
              {product.highlights.map((item) => {
                const Icon = iconMap[item.icon as keyof typeof iconMap] ?? Clock;
                return (
                  <div key={item.title} className="rounded-lg bg-surface p-4">
                    <Icon className="h-5 w-5 text-primary" />
                    <p className="mt-2 text-xs font-bold uppercase tracking-wider">
                      {item.title}
                    </p>
                    <p className="mt-1 text-xs text-muted">{item.description}</p>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      <div className="mt-16 lg:mt-24">
        <h2 className="text-2xl font-bold lg:text-3xl">Мах бэлтгэгчийн сонголт</h2>
        <p className="mt-4 max-w-3xl text-sm leading-relaxed text-muted">
          {product.longDescription}
        </p>

        {product.cookingTips && (
          <div className="mt-10 rounded-xl border-l-4 border-primary bg-primary-light/30 p-6 lg:p-8">
            <h3 className="text-xl font-bold">Мах бэлтгэх зөвлөмж</h3>
            <ol className="mt-6 space-y-4">
              {product.cookingTips.map((tip, i) => (
                <li key={tip} className="flex gap-4">
                  <span className="text-2xl font-bold text-primary/40">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="text-sm leading-relaxed text-muted">{tip}</p>
                </li>
              ))}
            </ol>
          </div>
        )}
      </div>
    </>
  );
}
