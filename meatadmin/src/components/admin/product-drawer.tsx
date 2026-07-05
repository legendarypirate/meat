"use client";

import { useEffect, useState } from "react";
import {
  api,
  type BundleData,
  type Category,
  type Product,
  type ProductImageInput,
} from "@/lib/api";
import { formatPrice } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetBody,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { ImageUploader } from "@/components/admin/image-uploader";
import { BundleEditor } from "@/components/admin/bundle-editor";
import { WeightInput } from "@/components/admin/weight-input";
import { sumBundleItemWeights } from "@/lib/weight";

type Props = {
  open: boolean;
  productId?: number | null;
  variant: "product" | "bundle";
  onClose: () => void;
  onSaved: () => void;
};

const defaultBundle: BundleData = {
  totalWeight: "",
  serves: "",
  regularTotalPrice: 0,
  items: [],
  extras: [],
  bundleBenefits: [],
  regularOrderDrawbacks: [],
};

const productCategories = ["beef", "dry-aged"];

export function ProductDrawer({ open, productId, variant, onClose, onSaved }: Props) {
  const isBundle = variant === "bundle";
  const [categories, setCategories] = useState<Category[]>([]);
  const [catalogProducts, setCatalogProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [images, setImages] = useState<ProductImageInput[]>([]);
  const [bundleData, setBundleData] = useState<BundleData>(defaultBundle);

  const [form, setForm] = useState({
    slug: "",
    name: "",
    description: "",
    longDescription: "",
    price: "",
    priceUnit: isBundle ? "багц" : "кг",
    categorySlug: isBundle ? "bundles" : "beef",
    weight: "",
    badge: "",
  });

  useEffect(() => {
    if (!open) return;
    api.getCategories().then(setCategories).catch(console.error);
    if (isBundle) {
      api.getProducts({ isBundle: false }).then(setCatalogProducts).catch(console.error);
    }
  }, [open, isBundle]);

  useEffect(() => {
    if (!open) return;

    if (!productId) {
      setForm({
        slug: "",
        name: "",
        description: "",
        longDescription: "",
        price: "",
        priceUnit: isBundle ? "багц" : "кг",
        categorySlug: isBundle ? "bundles" : "beef",
        weight: "",
        badge: "",
      });
      setImages([]);
      setBundleData(defaultBundle);
      setError(null);
      return;
    }

    setLoading(true);
    api
      .getProduct(productId)
      .then((p) => {
        setBundleData((() => {
          const loaded = (p.bundleData as BundleData) ?? defaultBundle;
          const totalWeight =
            sumBundleItemWeights(loaded.items ?? []) || loaded.totalWeight || "";
          return { ...loaded, totalWeight };
        })());
        setForm({
          slug: p.slug,
          name: p.name,
          description: p.description ?? "",
          longDescription: p.longDescription ?? "",
          price: String(p.price),
          priceUnit: p.priceUnit,
          categorySlug: p.category?.slug ?? (isBundle ? "bundles" : "beef"),
          weight:
            sumBundleItemWeights((p.bundleData as BundleData)?.items ?? []) ||
            (p.weight ?? ""),
          badge: p.badge ?? "",
        });
        setImages(
          (p.images ?? []).map((img) => ({
            url: img.url,
            publicId: img.cloudinaryPublicId ?? undefined,
          })),
        );
      })
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, [open, productId, isBundle]);

  function update(field: string, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError(null);

    const payload = {
      slug: form.slug,
      name: form.name,
      description: form.description,
      longDescription: form.longDescription,
      price: Number(form.price),
      priceUnit: form.priceUnit,
      image: images[0]?.url ?? "",
      categorySlug: isBundle ? "bundles" : form.categorySlug,
      weight: form.weight,
      badge: form.badge || undefined,
      isBundle,
      bundleData: isBundle ? bundleData : undefined,
      images,
    };

    try {
      if (productId) {
        await api.updateProduct(productId, payload);
      } else {
        await api.createProduct(payload);
      }
      onSaved();
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Хадгалахад алдаа гарлаа");
    } finally {
      setSaving(false);
    }
  }

  const visibleCategories = categories.filter((c) =>
    isBundle ? c.slug === "bundles" : productCategories.includes(c.slug),
  );

  return (
    <Sheet open={open} onOpenChange={(v) => !v && onClose()}>
      <SheetContent>
        <form onSubmit={handleSubmit} className="flex h-full flex-col">
          <SheetHeader>
            <SheetTitle>
              {productId
                ? isBundle
                  ? "Багц засах"
                  : "Бүтээгдэхүүн засах"
                : isBundle
                  ? "Шинэ багц"
                  : "Шинэ бүтээгдэхүүн"}
            </SheetTitle>
            <SheetDescription>
              {isBundle
                ? "Багцыг каталогийн бүтээгдэхүүнүүдээс бүрдүүлнэ."
                : "Энгийн бүтээгдэхүүн — олон зураг Cloudinary-д хадгалагдана."}
            </SheetDescription>
          </SheetHeader>

          <SheetBody>
            {loading ? (
              <p className="text-muted-foreground">Ачааллаж байна...</p>
            ) : (
              <div className="space-y-6">
                {error && (
                  <p className="rounded-md border border-destructive bg-destructive/10 p-3 text-sm text-destructive">
                    {error}
                  </p>
                )}

                <ImageUploader images={images} onChange={setImages} />

                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="name">Нэр</Label>
                    <Input
                      id="name"
                      value={form.name}
                      onChange={(e) => update("name", e.target.value)}
                      required
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="slug">Slug</Label>
                    <Input
                      id="slug"
                      value={form.slug}
                      onChange={(e) => update("slug", e.target.value)}
                      required
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="price">Үнэ (₮)</Label>
                      <Input
                        id="price"
                        type="number"
                        value={form.price}
                        onChange={(e) => update("price", e.target.value)}
                        required
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="priceUnit">Нэгж</Label>
                      <Input
                        id="priceUnit"
                        value={form.priceUnit}
                        onChange={(e) => update("priceUnit", e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  {!isBundle && (
                    <div className="grid grid-cols-2 gap-4">
                      <div className="grid gap-2">
                        <Label>Ангилал</Label>
                        <Select
                          value={form.categorySlug}
                          onValueChange={(v) => update("categorySlug", v)}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {visibleCategories.map((c) => (
                              <SelectItem key={c.slug} value={c.slug}>
                                {c.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="weight">Жин</Label>
                        <WeightInput
                          id="weight"
                          value={form.weight}
                          onChange={(v) => update("weight", v)}
                          placeholder="500"
                        />
                      </div>
                    </div>
                  )}
                  {isBundle && (
                    <div className="grid gap-2">
                      <Label htmlFor="weight">Нийт жин (шошго)</Label>
                      <WeightInput
                        id="weight"
                        value={form.weight}
                        onChange={(v) => update("weight", v)}
                        placeholder="1400"
                      />
                    </div>
                  )}
                  <div className="grid gap-2">
                    <Label htmlFor="description">Тайлбар</Label>
                    <Textarea
                      id="description"
                      value={form.description}
                      onChange={(e) => update("description", e.target.value)}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="longDescription">Дэлгэрэнгүй</Label>
                    <Textarea
                      id="longDescription"
                      value={form.longDescription}
                      onChange={(e) => update("longDescription", e.target.value)}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="badge">Badge</Label>
                    <Input
                      id="badge"
                      value={form.badge}
                      onChange={(e) => update("badge", e.target.value)}
                    />
                  </div>
                </div>

                {isBundle && (
                  <BundleEditor
                    value={bundleData}
                    onChange={(data) => {
                      setBundleData(data);
                      if (data.totalWeight) {
                        setForm((prev) => ({ ...prev, weight: data.totalWeight ?? prev.weight }));
                      }
                    }}
                    catalogProducts={catalogProducts}
                  />
                )}
              </div>
            )}
          </SheetBody>

          <SheetFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Болих
            </Button>
            <Button type="submit" disabled={saving || loading}>
              {saving ? "Хадгалж байна..." : "Хадгалах"}
            </Button>
          </SheetFooter>
        </form>
      </SheetContent>
    </Sheet>
  );
}
