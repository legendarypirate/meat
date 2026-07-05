"use client";

import { useState } from "react";
import { FillImage } from "@/components/ui/FillImage";
import Link from "next/link";
import {
  Minus,
  Plus,
  ShoppingBag,
  Package,
  Users,
  Scale,
  Check,
  X,
  Gift,
  Clock,
  MapPin,
  Truck,
  UtensilsCrossed,
} from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { useCart } from "@/context/CartContext";
import { WishlistButton } from "@/components/wishlist/WishlistButton";
import { getBundleSavings } from "@/data/bundles";
import { formatPrice } from "@/lib/utils";
import type { Product } from "@/data/products";

const iconMap = {
  utensils: UtensilsCrossed,
  clock: Clock,
  "map-pin": MapPin,
  truck: Truck,
};

type BundleProductDetailProps = {
  product: Product & { bundle: NonNullable<Product["bundle"]> };
};

export function BundleProductDetail({ product }: BundleProductDetailProps) {
  const { addItem } = useCart();
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  const { bundle } = product;
  const { savingsAmount, savingsPercent } = getBundleSavings(bundle, product.price);

  const handleAddToCart = () => {
    addItem(product.id, quantity, `${bundle.items.length} зүйл`);
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
            <div className="absolute left-4 top-4 flex flex-col gap-2">
              <Badge variant="green">БАГЦ</Badge>
              {savingsPercent > 0 && (
                <Badge variant="dark">{savingsPercent}% хэмнэлт</Badge>
              )}
            </div>
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
              <Badge variant={product.badgeVariant ?? "green"}>
                {product.badge}
              </Badge>
            )}
            {product.grade && <Badge variant="outline">{product.grade}</Badge>}
          </div>

          <h1 className="mt-4 text-3xl font-bold lg:text-4xl">{product.name}</h1>
          <p className="mt-2 text-sm leading-relaxed text-muted">
            {product.description}
          </p>

          <div className="mt-6 rounded-xl bg-primary-light/50 p-5">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-muted">
                  Багцын үнэ
                </p>
                <p className="mt-1 text-3xl font-bold text-primary">
                  {formatPrice(product.price)}
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm text-muted line-through">
                  Тусад авах: {formatPrice(bundle.regularTotalPrice)}
                </p>
                <p className="text-sm font-semibold text-primary">
                  Хэмнэлт: {formatPrice(savingsAmount)}
                </p>
              </div>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-3 gap-3">
            <div className="rounded-lg bg-surface p-3 text-center">
              <Package className="mx-auto h-5 w-5 text-primary" />
              <p className="mt-1 text-xs font-bold">{bundle.items.length} зүйл</p>
              <p className="text-[10px] text-muted">багтсан</p>
            </div>
            <div className="rounded-lg bg-surface p-3 text-center">
              <Scale className="mx-auto h-5 w-5 text-primary" />
              <p className="mt-1 text-xs font-bold">{bundle.totalWeight}</p>
              <p className="text-[10px] text-muted">нийт жин</p>
            </div>
            <div className="rounded-lg bg-surface p-3 text-center">
              <Users className="mx-auto h-5 w-5 text-primary" />
              <p className="mt-1 text-xs font-bold">{bundle.serves}</p>
              <p className="text-[10px] text-muted">хүнд</p>
            </div>
          </div>

          <div className="mt-8">
            <h3 className="text-xs font-bold uppercase tracking-wider text-muted">
              Тоо хэмжээ (багц)
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
            className={`mt-6 flex w-full items-center justify-center gap-2 rounded-lg py-4 text-sm font-bold uppercase tracking-wider text-white transition-colors ${
              added ? "bg-primary-dark" : "bg-primary hover:bg-primary-dark"
            }`}
          >
            <ShoppingBag className="h-5 w-5" />
            {added ? "Багц сагсанд нэмэгдлээ!" : "Багц захиалах"}
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

          <p className="mt-4 text-xs text-muted">
            * Багцыг тусад нь задалж, дангаар нь захиалах боломжгүй. Бүх
            зүйлс нэг багцаар ирнэ.
          </p>
        </div>
      </div>

      {/* Bundle contents */}
      <section className="mt-16 lg:mt-24">
        <h2 className="text-2xl font-bold lg:text-3xl">Багцын агуулга</h2>
        <p className="mt-2 text-sm text-muted">
          Энэ багцад дараах {bundle.items.length} зүйл багтсан байна.
        </p>

        <div className="mt-8 space-y-4">
          {bundle.items.map((item, index) => (
            <div
              key={item.name}
              className="flex gap-4 rounded-xl border border-border bg-white p-4 sm:items-center"
            >
              <span className="hidden h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-white sm:flex">
                {index + 1}
              </span>
              <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-lg">
                <FillImage
                  src={item.image}
                  alt={item.name}
                  size="bundleItem"
                  className="object-cover"
                />
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="font-semibold">{item.name}</h3>
                <p className="text-sm font-medium text-primary">{item.quantity}</p>
                {item.description && (
                  <p className="mt-0.5 text-sm text-muted">{item.description}</p>
                )}
              </div>
              <div className="shrink-0 text-right">
                <p className="text-xs text-muted">Тусад авах</p>
                <p className="font-semibold">{formatPrice(item.individualPrice)}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 flex items-center justify-between rounded-xl bg-surface px-5 py-4">
          <span className="font-semibold">Тусад авах нийт үнэ</span>
          <span className="text-lg font-bold line-through text-muted">
            {formatPrice(bundle.regularTotalPrice)}
          </span>
        </div>
      </section>

      {/* Extras included */}
      {bundle.extras.length > 0 && (
        <section className="mt-12">
          <h3 className="flex items-center gap-2 text-lg font-bold">
            <Gift className="h-5 w-5 text-primary" />
            Нэмэлтээр багтсан
          </h3>
          <ul className="mt-4 grid gap-2 sm:grid-cols-2">
            {bundle.extras.map((extra) => (
              <li
                key={extra}
                className="flex items-center gap-2 rounded-lg bg-primary-light/30 px-4 py-3 text-sm"
              >
                <Check className="h-4 w-4 shrink-0 text-primary" />
                {extra}
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Bundle vs Regular comparison */}
      <section className="mt-16">
        <h2 className="text-2xl font-bold lg:text-3xl">
          Багц vs Энгийн захиалга
        </h2>
        <p className="mt-2 max-w-2xl text-sm text-muted">
          Яагаад багц авах вэ? Энгийн захиалгаас ялгаатай давуу талууд.
        </p>

        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          <div className="rounded-2xl border-2 border-primary bg-primary-light/20 p-6 lg:p-8">
            <div className="flex items-center gap-2">
              <Package className="h-6 w-6 text-primary" />
              <h3 className="text-xl font-bold text-primary">Багц захиалга</h3>
              <Badge variant="green" className="ml-auto">
                Санал болгох
              </Badge>
            </div>
            <ul className="mt-6 space-y-3">
              {bundle.bundleBenefits.map((benefit) => (
                <li key={benefit} className="flex gap-3 text-sm">
                  <Check className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                  {benefit}
                </li>
              ))}
              <li className="flex gap-3 text-sm font-semibold text-primary">
                <Check className="mt-0.5 h-5 w-5 shrink-0" />
                Үнэ: {formatPrice(product.price)} ({savingsPercent}% хямд)
              </li>
            </ul>
          </div>

          <div className="rounded-2xl border border-border bg-surface p-6 lg:p-8">
            <div className="flex items-center gap-2">
              <ShoppingBag className="h-6 w-6 text-muted" />
              <h3 className="text-xl font-bold">Энгийн захиалга</h3>
            </div>
            <ul className="mt-6 space-y-3">
              {bundle.regularOrderDrawbacks.map((drawback) => (
                <li key={drawback} className="flex gap-3 text-sm text-muted">
                  <X className="mt-0.5 h-5 w-5 shrink-0 text-red-400" />
                  {drawback}
                </li>
              ))}
              <li className="flex gap-3 text-sm font-semibold text-muted">
                <X className="mt-0.5 h-5 w-5 shrink-0 text-red-400" />
                Үнэ: {formatPrice(bundle.regularTotalPrice)} (илүү өндөр)
              </li>
            </ul>
            <Link
              href="/products"
              className="mt-6 inline-block text-sm font-medium text-primary hover:underline"
            >
              Энгийн бүтээгдэхүүн үзэх →
            </Link>
          </div>
        </div>

        <div className="mt-8 overflow-hidden rounded-xl border border-border">
          <table className="w-full text-sm">
            <thead className="bg-surface">
              <tr>
                <th className="px-4 py-3 text-left font-semibold">Шалгуур</th>
                <th className="px-4 py-3 text-left font-semibold text-primary">
                  Багц
                </th>
                <th className="px-4 py-3 text-left font-semibold text-muted">
                  Энгийн
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              <ComparisonRow
                label="Үнэ"
                bundle={`${formatPrice(product.price)} (${savingsPercent}% хэмнэлт)`}
                regular={formatPrice(bundle.regularTotalPrice)}
                bundleBetter
              />
              <ComparisonRow
                label="Сонголт"
                bundle="Бэлэн багц, нэг дарж захиална"
                regular="Төрөл бүрээс тусад сонгоно"
                bundleBetter
              />
              <ComparisonRow
                label="Жин, хэмжээ"
                bundle="Тохирсон, тооцоолсон"
                regular="Өөрөө тооцох шаардлагатай"
                bundleBetter
              />
              <ComparisonRow
                label="Хүргэлт"
                bundle="1 удаа, нэг хайрцаг"
                regular="Олон бүтээгдэхүүн, олон удаа"
                bundleBetter
              />
              <ComparisonRow
                label="Нэмэлт"
                bundle={bundle.extras.join(", ")}
                regular="Тусад авах эсвэл байхгүй"
                bundleBetter
              />
            </tbody>
          </table>
        </div>
      </section>

      {/* Description & tips */}
      <div className="mt-16 lg:mt-24">
        <h2 className="text-2xl font-bold lg:text-3xl">Багцын тухай</h2>
        <p className="mt-4 max-w-3xl text-sm leading-relaxed text-muted">
          {product.longDescription}
        </p>

        {product.highlights && (
          <div className="mt-8 grid grid-cols-2 gap-3 lg:grid-cols-4">
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

        {product.cookingTips && (
          <div className="mt-10 rounded-xl border-l-4 border-primary bg-primary-light/30 p-6 lg:p-8">
            <h3 className="text-xl font-bold">Бэлтгэх зөвлөмж</h3>
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

function ComparisonRow({
  label,
  bundle,
  regular,
  bundleBetter,
}: {
  label: string;
  bundle: string;
  regular: string;
  bundleBetter?: boolean;
}) {
  return (
    <tr>
      <td className="px-4 py-3 font-medium">{label}</td>
      <td
        className={`px-4 py-3 ${bundleBetter ? "font-medium text-primary" : ""}`}
      >
        {bundle}
      </td>
      <td className="px-4 py-3 text-muted">{regular}</td>
    </tr>
  );
}
