"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Pencil, Plus, Trash2 } from "lucide-react";
import { api, type Product } from "@/lib/api";
import { formatPrice } from "@/lib/utils";
import { Button } from "@/components/ui/button";
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

export default function ProductsPage() {
  return (
    <Suspense fallback={<p className="text-muted-foreground">Ачааллаж байна...</p>}>
      <ProductsPageContent />
    </Suspense>
  );
}

function ProductsPageContent() {
  const searchParams = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);

  async function load() {
    try {
      setProducts(await api.getProducts({ isBundle: false }));
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
    if (!confirm(`"${name}" бүтээгдэхүүнийг устгах уу?`)) return;
    try {
      await api.deleteProduct(id);
      setProducts((prev) => prev.filter((p) => p.id !== id));
    } catch (e) {
      alert(e instanceof Error ? e.message : "Устгахад алдаа гарлаа");
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Бүтээгдэхүүн</h1>
          <p className="text-sm text-muted-foreground">Энгийн махны бүтээгдэхүүн</p>
        </div>
        <Button
          onClick={() => {
            setEditId(null);
            setDrawerOpen(true);
          }}
        >
          <Plus className="h-4 w-4" />
          Нэмэх
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Кatalog ({products.length})</CardTitle>
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
                  <TableHead>Ангилал</TableHead>
                  <TableHead>Зураг</TableHead>
                  <TableHead>Үнэ</TableHead>
                  <TableHead className="text-right">Үйлдэл</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {products.map((p) => (
                  <TableRow key={p.id}>
                    <TableCell className="font-medium">{p.name}</TableCell>
                    <TableCell className="text-muted-foreground">{p.slug}</TableCell>
                    <TableCell>{p.category?.name ?? "—"}</TableCell>
                    <TableCell>{p.images?.length ?? 0}</TableCell>
                    <TableCell>{formatPrice(p.price)}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => {
                            setEditId(p.id);
                            setDrawerOpen(true);
                          }}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="destructive"
                          size="icon"
                          onClick={() => handleDelete(p.id, p.name)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      <ProductDrawer
        open={drawerOpen}
        productId={editId}
        variant="product"
        onClose={() => setDrawerOpen(false)}
        onSaved={load}
      />
    </div>
  );
}
