"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Pencil, Plus, Trash2 } from "lucide-react";
import { api, type Product } from "@/lib/api";
import { formatPrice } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ProductDrawer } from "@/components/admin/product-drawer";

export default function BundlesPage() {
  const searchParams = useSearchParams();
  const [bundles, setBundles] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);

  async function load() {
    try {
      setBundles(await api.getProducts({ isBundle: true }));
      setError(null);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Алдаа гарлаа");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  useEffect(() => {
    const edit = searchParams.get("edit");
    if (edit) {
      setEditId(Number(edit));
      setDrawerOpen(true);
    }
  }, [searchParams]);

  async function handleDelete(id: number, name: string) {
    if (!confirm(`"${name}" багцыг устгах уу?`)) return;
    try {
      await api.deleteProduct(id);
      setBundles((prev) => prev.filter((p) => p.id !== id));
    } catch (e) {
      alert(e instanceof Error ? e.message : "Устгахад алдаа гарлаа");
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Багц</h1>
          <p className="text-sm text-muted-foreground">
            Бүтээгдэхүүнүүдээс бүрдсэн багцууд
          </p>
        </div>
        <Button
          onClick={() => {
            setEditId(null);
            setDrawerOpen(true);
          }}
        >
          <Plus className="h-4 w-4" />
          Багц нэмэх
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Багц бүтээгдэхүүн ({bundles.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {loading && <p className="text-muted-foreground">Ачааллаж байна...</p>}
          {error && <p className="text-destructive">{error}</p>}
          {!loading && !error && (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Нэр</TableHead>
                  <TableHead>Slug</TableHead>
                  <TableHead>Зүйл</TableHead>
                  <TableHead>Үнэ</TableHead>
                  <TableHead>Хэмнэлт</TableHead>
                  <TableHead className="text-right">Үйлдэл</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {bundles.map((b) => {
                  const itemCount = b.bundleData?.items?.length ?? 0;
                  const regular = b.bundleData?.regularTotalPrice ?? 0;
                  const savings = regular > b.price ? regular - b.price : 0;
                  return (
                    <TableRow key={b.id}>
                      <TableCell className="font-medium">{b.name}</TableCell>
                      <TableCell className="text-muted-foreground">{b.slug}</TableCell>
                      <TableCell>
                        <Badge>{itemCount} бүтээгдэхүүн</Badge>
                      </TableCell>
                      <TableCell>{formatPrice(b.price)}</TableCell>
                      <TableCell className="text-primary">
                        {savings > 0 ? formatPrice(savings) : "—"}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => {
                              setEditId(b.id);
                              setDrawerOpen(true);
                            }}
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="destructive"
                            size="icon"
                            onClick={() => handleDelete(b.id, b.name)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      <ProductDrawer
        open={drawerOpen}
        productId={editId}
        variant="bundle"
        onClose={() => setDrawerOpen(false)}
        onSaved={load}
      />
    </div>
  );
}
