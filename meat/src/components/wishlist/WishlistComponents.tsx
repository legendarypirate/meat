"use client";

import { FillImage } from "@/components/ui/FillImage";
import Link from "next/link";
import { Heart, ShoppingCart, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { isBundleProduct } from "@/data/bundles";
import { formatPrice } from "@/lib/utils";
import type { Product } from "@/data/products";

export function WishlistItemsList() {
  const { items, removeItem, clearWishlist } = useWishlist();

  if (items.length === 0) {
    return (
      <div className="py-12 text-center">
        <Heart className="mx-auto h-16 w-16 text-muted/40" />
        <h1 className="mt-6 text-3xl font-bold lg:text-4xl">
          Хадгалсан жагсаалт хоосон байна
        </h1>
        <p className="mt-2 text-muted">
          Таалагдсан бүтээгдэхүүнээ хадгалж, дараа нь эндээс хараарай.
        </p>
        <Button href="/products" className="mt-8" size="lg">
          Дэлгүүр рүү очих
        </Button>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-3xl font-bold lg:text-4xl">Хадгалсан жагсаалт</h1>
      <p className="mt-2 text-muted">
        {items.length} бүтээгдэхүүн хадгалсан байна.
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {items.map((product) => (
          <WishlistRow key={product.id} product={product} onRemove={removeItem} />
        ))}
      </div>

      <button
        type="button"
        onClick={clearWishlist}
        className="mt-8 text-sm font-semibold text-muted hover:text-red-600"
      >
        Жагсаалтыг хоослох
      </button>
    </div>
  );
}

function WishlistRow({
  product,
  onRemove,
}: {
  product: Product;
  onRemove: (productId: string) => void;
}) {
  const { addItem } = useCart();
  const isBundle = isBundleProduct(product);

  const handleAddToCart = () => {
    if (isBundle && product.bundle) {
      addItem(product.id, 1, `${product.bundle.items.length} зүйл`);
    } else {
      const defaultSize = product.sizes?.[0]?.label ?? product.weight;
      addItem(product.id, 1, defaultSize);
    }
  };

  return (
    <div className="flex gap-4 rounded-xl border border-border bg-white p-4 shadow-sm">
      <Link
        href={`/products/${product.slug}`}
        className="relative h-24 w-24 shrink-0 overflow-hidden rounded-lg"
      >
        <FillImage
          src={product.image}
          alt={product.name}
          size="cart"
          className="object-cover"
        />
        {isBundle && (
          <span className="absolute bottom-0 left-0 right-0 bg-primary py-0.5 text-center text-[9px] font-bold text-white">
            БАГЦ
          </span>
        )}
      </Link>

      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex flex-wrap items-start gap-2">
          <Link
            href={`/products/${product.slug}`}
            className="font-semibold hover:text-primary"
          >
            {product.name}
          </Link>
          {isBundle && <Badge variant="green">Багц</Badge>}
        </div>
        <p className="mt-1 text-sm font-semibold text-primary">
          {formatPrice(product.price)}
          {!isBundle && ` / ${product.priceUnit}`}
          {isBundle && " / багц"}
        </p>
        <p className="mt-1 line-clamp-2 text-xs text-muted">{product.description}</p>

        <div className="mt-auto flex flex-wrap gap-2 pt-3">
          <button
            type="button"
            onClick={handleAddToCart}
            className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-3 py-2 text-xs font-bold uppercase tracking-wider text-white hover:bg-primary-dark"
          >
            <ShoppingCart className="h-3.5 w-3.5" />
            Сагсанд нэмэх
          </button>
          <button
            type="button"
            onClick={() => onRemove(product.id)}
            className="inline-flex items-center gap-1.5 rounded-lg border border-border px-3 py-2 text-xs font-semibold text-muted hover:border-red-200 hover:text-red-600"
          >
            <Trash2 className="h-3.5 w-3.5" />
            Хасах
          </button>
        </div>
      </div>
    </div>
  );
}
