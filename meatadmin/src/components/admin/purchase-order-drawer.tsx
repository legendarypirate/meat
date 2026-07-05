"use client";

import { useEffect, useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import {
  api,
  type Product,
  type PurchaseOrderInput,
  type PurchaseOrderItemInput,
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
import { Badge } from "@/components/ui/badge";

const STATUSES = [
  { value: "pending", label: "Хүлээгдэж буй" },
  { value: "confirmed", label: "Баталгаажсан" },
  { value: "shipped", label: "Илгээсэн" },
  { value: "delivered", label: "Хүргэгдсэн" },
  { value: "cancelled", label: "Цуцлагдсан" },
];

type Props = {
  open: boolean;
  orderId?: number | null;
  onClose: () => void;
  onSaved: () => void;
};

const emptyItem = (): PurchaseOrderItemInput => ({
  productId: null,
  productName: "",
  quantity: 1,
  unitPrice: 0,
  isBundle: false,
});

export function PurchaseOrderDrawer({ open, orderId, onClose, onSaved }: Props) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [form, setForm] = useState({
    customerName: "",
    customerPhone: "",
    customerEmail: "",
    deliveryAddress: "",
    notes: "",
    status: "pending",
  });
  const [items, setItems] = useState<PurchaseOrderItemInput[]>([emptyItem()]);

  useEffect(() => {
    if (open) api.getProducts().then(setProducts).catch(console.error);
  }, [open]);

  useEffect(() => {
    if (!open) return;

    if (!orderId) {
      setForm({
        customerName: "",
        customerPhone: "",
        customerEmail: "",
        deliveryAddress: "",
        notes: "",
        status: "pending",
      });
      setItems([emptyItem()]);
      setError(null);
      return;
    }

    setLoading(true);
    api
      .getPurchaseOrder(orderId)
      .then((o) => {
        setForm({
          customerName: o.customerName,
          customerPhone: o.customerPhone ?? "",
          customerEmail: o.customerEmail ?? "",
          deliveryAddress: o.deliveryAddress ?? "",
          notes: o.notes ?? "",
          status: o.status,
        });
        setItems(
          o.items.map((i) => ({
            productId: i.productId,
            productName: i.productName,
            quantity: i.quantity,
            unitPrice: i.unitPrice,
            isBundle: i.isBundle,
          })),
        );
      })
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, [open, orderId]);

  function updateItem(index: number, patch: Partial<PurchaseOrderItemInput>) {
    setItems((prev) => {
      const next = [...prev];
      next[index] = { ...next[index], ...patch };
      return next;
    });
  }

  function selectProduct(index: number, productId: string) {
    const product = products.find((p) => p.id === Number(productId));
    if (!product) return;
    updateItem(index, {
      productId: product.id,
      productName: product.name,
      unitPrice: product.price,
      isBundle: Boolean(product.isBundle),
    });
  }

  const total = items.reduce(
    (sum, i) => sum + (Number(i.quantity) || 0) * (Number(i.unitPrice) || 0),
    0,
  );

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError(null);

    const payload: PurchaseOrderInput = {
      ...form,
      items: items.filter((i) => i.productName || i.productId),
    };

    try {
      if (orderId) {
        await api.updatePurchaseOrder(orderId, payload);
      } else {
        await api.createPurchaseOrder(payload);
      }
      onSaved();
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Хадгалахад алдаа гарлаа");
    } finally {
      setSaving(false);
    }
  }

  return (
    <Sheet open={open} onOpenChange={(v) => !v && onClose()}>
      <SheetContent>
        <form onSubmit={handleSubmit} className="flex h-full flex-col">
          <SheetHeader>
            <SheetTitle>
              {orderId ? "Захиалга засах" : "Шинэ захиалга"}
            </SheetTitle>
            <SheetDescription>
              Худалдан авалтын захиалга үүсгэх, багц болон энгийн бүтээгдэхүүн сонгох
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

                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <Label>Худалдан авагчийн нэр</Label>
                    <Input
                      value={form.customerName}
                      onChange={(e) =>
                        setForm((f) => ({ ...f, customerName: e.target.value }))
                      }
                      required
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label>Утас</Label>
                      <Input
                        value={form.customerPhone}
                        onChange={(e) =>
                          setForm((f) => ({ ...f, customerPhone: e.target.value }))
                        }
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label>Имэйл</Label>
                      <Input
                        type="email"
                        value={form.customerEmail}
                        onChange={(e) =>
                          setForm((f) => ({ ...f, customerEmail: e.target.value }))
                        }
                      />
                    </div>
                  </div>
                  <div className="grid gap-2">
                    <Label>Хүргэлтийн хаяг</Label>
                    <Textarea
                      value={form.deliveryAddress}
                      onChange={(e) =>
                        setForm((f) => ({ ...f, deliveryAddress: e.target.value }))
                      }
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label>Төлөв</Label>
                    <Select
                      value={form.status}
                      onValueChange={(v) => setForm((f) => ({ ...f, status: v }))}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {STATUSES.map((s) => (
                          <SelectItem key={s.value} value={s.value}>
                            {s.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label>Тэмдэглэл</Label>
                    <Textarea
                      value={form.notes}
                      onChange={(e) => setForm((f) => ({ ...f, notes: e.target.value }))}
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label>Бүтээгдэхүүн</Label>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => setItems((prev) => [...prev, emptyItem()])}
                    >
                      <Plus className="h-4 w-4" />
                      Нэмэх
                    </Button>
                  </div>

                  {items.map((item, index) => (
                    <div key={index} className="space-y-2 rounded-lg border p-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">#{index + 1}</span>
                        {items.length > 1 && (
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            onClick={() =>
                              setItems((prev) => prev.filter((_, i) => i !== index))
                            }
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                      <Select
                        value={item.productId ? String(item.productId) : ""}
                        onValueChange={(v) => selectProduct(index, v)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Бүтээгдэхүүн сонгох" />
                        </SelectTrigger>
                        <SelectContent>
                          {products.map((p) => (
                            <SelectItem key={p.id} value={String(p.id)}>
                              {p.name}
                              {p.isBundle ? " (Багц)" : ""} — {formatPrice(p.price)}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <div className="grid grid-cols-2 gap-2">
                        <Input
                          type="number"
                          min={1}
                          placeholder="Тоо"
                          value={item.quantity}
                          onChange={(e) =>
                            updateItem(index, { quantity: Number(e.target.value) })
                          }
                        />
                        <Input
                          type="number"
                          placeholder="Үнэ"
                          value={item.unitPrice || ""}
                          onChange={(e) =>
                            updateItem(index, { unitPrice: Number(e.target.value) })
                          }
                        />
                      </div>
                      {item.isBundle && <Badge variant="secondary">Багц</Badge>}
                    </div>
                  ))}

                  <div className="text-right text-lg font-bold">
                    Нийт: {formatPrice(total)}
                  </div>
                </div>
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
