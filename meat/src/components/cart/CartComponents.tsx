"use client";

import { useState } from "react";
import { FillImage } from "@/components/ui/FillImage";
import Link from "next/link";
import {
  Minus,
  Plus,
  ShieldCheck,
  ShoppingBag,
  Snowflake,
  Trash2,
  Package,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { useCart } from "@/context/CartContext";
import type { CartLineItem } from "@/context/CartContext";
import { isBundleProduct } from "@/data/bundles";
import { calculateOrderTotal } from "@/lib/products";
import { formatPrice } from "@/lib/utils";

export function CartItemsList() {
  const { items, updateQuantity, removeItem } = useCart();

  if (items.length === 0) {
    return (
      <div className="py-12 text-center">
        <ShoppingBag className="mx-auto h-16 w-16 text-muted/40" />
        <h1 className="mt-6 text-3xl font-bold lg:text-4xl">
          Таны сагс хоосон байна
        </h1>
        <p className="mt-2 text-muted">
          Дээд зэрэглэлийн махны сонголтоос сонгон нэмнэ үү.
        </p>
        <Button href="/products" className="mt-8" size="lg">
          Дэлгүүр рүү очих
        </Button>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-3xl font-bold lg:text-4xl">
        Таны худалдан авалтын сагс
      </h1>
      <p className="mt-2 text-muted">
        Сонгосон бүтээгдэхүүнээ хянана уу.
      </p>

      <div className="mt-8 hidden grid-cols-[2fr_1fr_1fr_1fr] gap-4 border-b border-border pb-3 text-xs font-semibold uppercase tracking-wider text-muted md:grid">
        <span>Бүтээгдэхүүний мэдээлэл</span>
        <span className="text-center">Тоо хэмжээ</span>
        <span className="text-center">Нэгж үнэ</span>
        <span className="text-right">Нийт</span>
      </div>

      <div className="mt-4 divide-y divide-border">
        {items.map((item) => (
          <CartRow
            key={`${item.productId}-${item.size ?? "default"}`}
            item={item}
            updateQuantity={updateQuantity}
            removeItem={removeItem}
          />
        ))}
      </div>

      <div className="mt-8 flex gap-4 rounded-xl border-l-4 border-primary bg-primary-light/40 p-5">
        <Snowflake className="h-6 w-6 shrink-0 text-primary" />
        <div>
          <h3 className="font-semibold text-primary-dark">
            Хүйтэн гинжийн хүргэлтийн баталгаа
          </h3>
          <p className="mt-1 text-sm leading-relaxed text-muted">
            Бид тусгай дулаалгатай савлагаа болон хөлдөөх хүчил ашиглан махыг
            хүйтэн байдалд хадгалж хүргэдэг. Хүргэлтийн үед бүтээгдэхүүний
            чанар бүрэн хадгалагдана.
          </p>
        </div>
      </div>
    </div>
  );
}

export function OrderSummary() {
  const { subtotal, items, clearCart } = useCart();
  const { packaging, delivery, tax, total } = calculateOrderTotal(subtotal);
  const bundleCount = items.filter((i) => isBundleProduct(i.product)).length;
  const regularCount = items.length - bundleCount;

  if (items.length === 0) return null;

  return (
    <div className="sticky top-24 rounded-2xl bg-surface p-6 lg:p-8">
      <h2 className="text-xl font-bold">Захиалгын хураангуй</h2>

      {(bundleCount > 0 || regularCount > 0) && (
        <div className="mt-4 flex flex-wrap gap-2 text-xs">
          {bundleCount > 0 && (
            <span className="rounded-full bg-primary-light px-3 py-1 font-semibold text-primary">
              {bundleCount} багц
            </span>
          )}
          {regularCount > 0 && (
            <span className="rounded-full bg-white px-3 py-1 font-semibold text-muted">
              {regularCount} энгийн
            </span>
          )}
        </div>
      )}

      <dl className="mt-6 space-y-3 text-sm">
        <div className="flex justify-between">
          <dt className="text-muted">Дэд дүн</dt>
          <dd className="font-medium">{formatPrice(subtotal)}</dd>
        </div>
        <div className="flex justify-between">
          <dt className="text-muted">Дулаалгатай савлагаа</dt>
          <dd className="font-medium">{formatPrice(packaging)}</dd>
        </div>
        <div className="flex justify-between">
          <dt className="text-muted">Шуурхай хүргэлт (Хөргүүртэй)</dt>
          <dd className="font-medium">{formatPrice(delivery)}</dd>
        </div>
        <div className="flex justify-between">
          <dt className="text-muted">Тооцоолсон татвар</dt>
          <dd className="font-medium">{formatPrice(tax)}</dd>
        </div>
      </dl>

      <div className="mt-6 flex justify-between border-t border-border pt-4">
        <span className="font-bold">Нийт төлбөр</span>
        <span className="text-2xl font-bold text-primary">
          {formatPrice(total)}
        </span>
      </div>

      <div className="mt-6 space-y-3">
        <Button fullWidth size="lg">
          Төлбөр төлөх рүү шилжих
        </Button>
        <Button href="/products" variant="outline" fullWidth size="lg">
          Дэлгүүр рүү буцах
        </Button>
        <button
          type="button"
          onClick={clearCart}
          className="w-full py-2 text-xs font-semibold text-muted hover:text-red-600"
        >
          Сагсыг хоослох
        </button>
      </div>

      <div className="mt-6 flex items-center justify-center gap-2 text-xs font-semibold text-primary">
        <ShieldCheck className="h-4 w-4" />
        Аюулгүй төлбөр тооцоо
      </div>

      <div className="mt-4 flex justify-center gap-2">
        {["VISA", "MC", "AMEX", "PAYPAL"].map((card) => (
          <span
            key={card}
            className="rounded bg-white px-2 py-1 text-[10px] font-bold text-muted"
          >
            {card}
          </span>
        ))}
      </div>
    </div>
  );
}

function CartRow({
  item,
  updateQuantity,
  removeItem,
}: {
  item: CartLineItem;
  updateQuantity: (id: string, qty: number, size?: string) => void;
  removeItem: (id: string, size?: string) => void;
}) {
  const [expanded, setExpanded] = useState(false);
  const isBundle = isBundleProduct(item.product);
  const unitPrice = item.product.price;
  const total = unitPrice * item.quantity;

  return (
    <div
      className={`grid gap-4 py-6 md:grid-cols-[2fr_1fr_1fr_1fr] md:items-start ${
        isBundle ? "-mx-4 rounded-xl bg-primary-light/20 px-4 md:mx-0 md:px-4" : ""
      }`}
    >
      <div className="flex gap-4">
        <Link
          href={`/products/${item.product.slug}`}
          className="relative h-20 w-20 shrink-0 overflow-hidden rounded-lg"
        >
          <FillImage
            src={item.product.image}
            alt={item.product.name}
            size="cart"
            className="object-cover"
          />
          {isBundle && (
            <span className="absolute bottom-0 left-0 right-0 bg-primary py-0.5 text-center text-[9px] font-bold text-white">
              БАГЦ
            </span>
          )}
        </Link>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <Link
              href={`/products/${item.product.slug}`}
              className="font-semibold hover:text-primary"
            >
              {item.product.name}
            </Link>
            {isBundle ? (
              <Badge variant="green">Багц</Badge>
            ) : (
              item.product.grade && (
                <Badge variant="outline">{item.product.grade}</Badge>
              )
            )}
          </div>
          <p className="mt-1 text-sm text-muted">
            {isBundle
              ? `${item.product.bundle?.items.length} зүйл · ${item.product.bundle?.totalWeight}`
              : (item.size ?? item.product.weight)}
          </p>

          {isBundle && item.product.bundle && (
            <div className="mt-2">
              <button
                type="button"
                onClick={() => setExpanded(!expanded)}
                className="flex items-center gap-1 text-xs font-semibold text-primary hover:underline"
              >
                <Package className="h-3.5 w-3.5" />
                Багцын агуулга
                {expanded ? (
                  <ChevronUp className="h-3.5 w-3.5" />
                ) : (
                  <ChevronDown className="h-3.5 w-3.5" />
                )}
              </button>
              {expanded && (
                <ul className="mt-2 space-y-1 rounded-lg bg-white/80 p-3 text-xs text-muted">
                  {item.product.bundle.items.map((bi) => (
                    <li key={bi.name} className="flex justify-between gap-2">
                      <span>
                        {bi.name} · {bi.quantity}
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}

          <button
            type="button"
            onClick={() => removeItem(item.productId, item.size)}
            className="mt-2 flex items-center gap-1 text-xs text-muted hover:text-red-600"
          >
            <Trash2 className="h-3 w-3" />
            Устгах
          </button>
        </div>
      </div>

      <div className="flex items-center justify-center md:pt-2">
        <div className="inline-flex items-center rounded-lg border border-border bg-white">
          <button
            type="button"
            onClick={() =>
              updateQuantity(item.productId, item.quantity - 1, item.size)
            }
            className="px-3 py-2 text-muted hover:text-foreground"
            aria-label="Багасгах"
          >
            <Minus className="h-4 w-4" />
          </button>
          <span className="min-w-[2rem] text-center font-semibold">
            {item.quantity}
          </span>
          <button
            type="button"
            onClick={() =>
              updateQuantity(item.productId, item.quantity + 1, item.size)
            }
            className="px-3 py-2 text-muted hover:text-foreground"
            aria-label="Нэмэх"
          >
            <Plus className="h-4 w-4" />
          </button>
        </div>
      </div>

      <p className="text-center font-medium md:pt-2 md:text-base">
        {formatPrice(unitPrice)}
        {isBundle && (
          <span className="block text-[10px] font-normal text-muted">/ багц</span>
        )}
      </p>

      <p className="text-right text-lg font-bold text-primary md:pt-2">
        {formatPrice(total)}
      </p>
    </div>
  );
}
