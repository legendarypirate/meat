"use client";

import { useEffect, useState } from "react";
import { Pencil, Plus, Trash2 } from "lucide-react";
import { api, type PurchaseOrder } from "@/lib/api";
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
import { PurchaseOrderDrawer } from "@/components/admin/purchase-order-drawer";

const STATUS_LABELS: Record<string, string> = {
  pending: "Хүлээгдэж буй",
  confirmed: "Баталгаажсан",
  shipped: "Илгээсэн",
  delivered: "Хүргэгдсэн",
  cancelled: "Цуцлагдсан",
};

export default function PurchaseOrdersPage() {
  const [orders, setOrders] = useState<PurchaseOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);

  async function load() {
    try {
      setOrders(await api.getPurchaseOrders());
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

  async function handleDelete(id: number, orderNumber: string) {
    if (!confirm(`"${orderNumber}" захиалгыг устгах уу?`)) return;
    try {
      await api.deletePurchaseOrder(id);
      setOrders((prev) => prev.filter((o) => o.id !== id));
    } catch (e) {
      alert(e instanceof Error ? e.message : "Устгахад алдаа гарлаа");
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Захиалга</h1>
        <Button
          onClick={() => {
            setEditId(null);
            setDrawerOpen(true);
          }}
        >
          <Plus className="h-4 w-4" />
          Шинэ захиалга
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Худалдан авалтын захиалга ({orders.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {loading && <p className="text-muted-foreground">Ачааллаж байна...</p>}
          {error && <p className="text-destructive">{error}</p>}
          {!loading && !error && (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Дугаар</TableHead>
                  <TableHead>Худалдан авагч</TableHead>
                  <TableHead>Бүтээгдэхүүн</TableHead>
                  <TableHead>Төлөв</TableHead>
                  <TableHead>Нийт</TableHead>
                  <TableHead className="text-right">Үйлдэл</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {orders.map((o) => (
                  <TableRow key={o.id}>
                    <TableCell className="font-mono text-sm">{o.orderNumber}</TableCell>
                    <TableCell>
                      <div>{o.customerName}</div>
                      {o.customerPhone && (
                        <div className="text-xs text-muted-foreground">{o.customerPhone}</div>
                      )}
                    </TableCell>
                    <TableCell>{o.items?.length ?? 0} зүйл</TableCell>
                    <TableCell>
                      <Badge variant="secondary">
                        {STATUS_LABELS[o.status] ?? o.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{formatPrice(o.totalAmount)}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => {
                            setEditId(o.id);
                            setDrawerOpen(true);
                          }}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="destructive"
                          size="icon"
                          onClick={() => handleDelete(o.id, o.orderNumber)}
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

      <PurchaseOrderDrawer
        open={drawerOpen}
        orderId={editId}
        onClose={() => setDrawerOpen(false)}
        onSaved={load}
      />
    </div>
  );
}
