"use client";

import { Plus, Trash2 } from "lucide-react";
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
import { formatPrice } from "@/lib/utils";
import type { BundleData, BundleItem, Product } from "@/lib/api";
import { WeightInput } from "@/components/admin/weight-input";
import { sumBundleItemWeights } from "@/lib/weight";

type Props = {
  value: BundleData;
  onChange: (value: BundleData) => void;
  catalogProducts: Product[];
};

const emptyItem = (): BundleItem => ({
  name: "",
  quantity: "",
  individualPrice: 0,
  image: "",
});

function sumItems(items: BundleItem[]) {
  return items.reduce((sum, i) => sum + (Number(i.individualPrice) || 0), 0);
}

function sumItemWeights(items: BundleItem[]) {
  return sumBundleItemWeights(items);
}

function withItemsUpdate(value: BundleData, items: BundleItem[]) {
  return {
    ...value,
    items,
    regularTotalPrice: sumItems(items),
    totalWeight: sumItemWeights(items),
  };
}

export function BundleEditor({ value, onChange, catalogProducts }: Props) {
  function update(field: keyof BundleData, val: unknown) {
    onChange({ ...value, [field]: val });
  }

  function updateItem(index: number, patch: Partial<BundleItem>) {
    const items = [...(value.items || [])];
    items[index] = { ...items[index], ...patch };
    onChange(withItemsUpdate(value, items));
  }

  function selectProduct(index: number, productId: string) {
    const product = catalogProducts.find((p) => p.id === Number(productId));
    if (!product) return;
    updateItem(index, {
      productId: product.id,
      name: product.name,
      individualPrice: product.price,
      image: product.image ?? product.images?.[0]?.url ?? "",
    });
  }

  function addItem() {
    const items = [...(value.items || []), emptyItem()];
    onChange(withItemsUpdate(value, items));
  }

  function removeItem(index: number) {
    const items = value.items.filter((_, i) => i !== index);
    onChange(withItemsUpdate(value, items));
  }

  return (
    <div className="space-y-4 rounded-lg border bg-muted/20 p-4">
      <h3 className="font-semibold">Багцын агуулга (бүтээгдэхүүнээс)</h3>

      <div className="grid grid-cols-2 gap-4">
        <div className="grid gap-2">
          <Label>Нийт жин</Label>
          <WeightInput
            value={value.totalWeight ?? ""}
            onChange={(v) => update("totalWeight", v)}
            placeholder="1400"
          />
          <p className="text-xs text-muted-foreground">
            Бүтээгдэхүүний хэмжээ өөрчлөгдөхөд автоматаар тооцогдоно
          </p>
        </div>
        <div className="grid gap-2">
          <Label>Хэдэн хүн</Label>
          <Input
            value={value.serves ?? ""}
            onChange={(e) => update("serves", e.target.value)}
            placeholder="3–4 хүн"
          />
        </div>
      </div>

      <div className="grid gap-2">
        <Label>Энгийн захиалгын нийт үнэ (₮)</Label>
        <Input
          type="number"
          value={value.regularTotalPrice ?? ""}
          onChange={(e) => update("regularTotalPrice", Number(e.target.value))}
        />
        <p className="text-xs text-muted-foreground">
          Бүтээгдэхүүн сонгоход автоматаар тооцогдоно
        </p>
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <Label>Багцад багтах бүтээгдэхүүн</Label>
          <Button type="button" variant="outline" size="sm" onClick={addItem}>
            <Plus className="h-4 w-4" />
            Зүйл нэмэх
          </Button>
        </div>

        {(value.items || []).map((item, index) => (
          <div key={index} className="grid gap-2 rounded-md border bg-background p-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">#{index + 1}</span>
              <Button type="button" variant="ghost" size="icon" onClick={() => removeItem(index)}>
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
            <Select
              value={item.productId ? String(item.productId) : ""}
              onValueChange={(v) => selectProduct(index, v)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Бүтээгдэхүүн сонгох" />
              </SelectTrigger>
              <SelectContent>
                {catalogProducts.map((p) => (
                  <SelectItem key={p.id} value={String(p.id)}>
                    {p.name} — {formatPrice(p.price)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <div className="grid grid-cols-2 gap-2">
              <div className="grid gap-1">
                <Label className="text-xs text-muted-foreground">Хэмжээ</Label>
                <WeightInput
                  value={item.quantity}
                  onChange={(v) => updateItem(index, { quantity: v })}
                  placeholder="500"
                />
              </div>
              <Input
                type="number"
                placeholder="Үнэ"
                value={item.individualPrice || ""}
                onChange={(e) =>
                  updateItem(index, { individualPrice: Number(e.target.value) })
                }
              />
            </div>
          </div>
        ))}
      </div>

      <div className="grid gap-2">
        <Label>Нэмэлт (мөр бүрт нэг)</Label>
        <Textarea
          rows={2}
          value={(value.extras ?? []).join("\n")}
          onChange={(e) => update("extras", e.target.value.split("\n").filter(Boolean))}
        />
      </div>

      <div className="grid gap-2">
        <Label>Багцын давуу тал</Label>
        <Textarea
          rows={2}
          value={(value.bundleBenefits ?? []).join("\n")}
          onChange={(e) =>
            update("bundleBenefits", e.target.value.split("\n").filter(Boolean))
          }
        />
      </div>
    </div>
  );
}
