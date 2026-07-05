import Link from "next/link";
import { Package, Tags, ShoppingBag, Pencil } from "lucide-react";
import { api } from "@/lib/api";
import { formatPrice } from "@/lib/utils";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  let stats;
  let health;
  let error: string | null = null;

  try {
    [stats, health] = await Promise.all([api.getStats(), api.health()]);
  } catch (e) {
    error = e instanceof Error ? e.message : "API холболт амжилтгүй";
  }

  if (error) {
    return (
      <div className="space-y-4">
        <h1 className="text-3xl font-bold">Хяналтын самбар</h1>
        <Card className="border-destructive">
          <CardHeader>
            <CardTitle className="text-destructive">API холбогдож чадсангүй</CardTitle>
            <CardDescription>
              Серверийг port 3001 дээр асаана уу: <code>cd server && npm run dev</code>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">{error}</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const cards = [
    { title: "Бүтээгдэхүүн", value: stats!.productCount, icon: Package, href: "/products" },
    { title: "Багц", value: stats!.bundleCount, icon: ShoppingBag, href: "/bundles" },
    { title: "Ангилал", value: stats!.categoryCount, icon: Tags, href: "/categories" },
  ];

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Хяналтын самбар</h1>
          <div className="text-muted-foreground">
            PostgreSQL: <Badge variant="secondary">{health!.database}</Badge>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" asChild>
            <Link href="/products">+ Бүтээгдэхүүн</Link>
          </Button>
          <Button asChild>
            <Link href="/bundles">+ Багц</Link>
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {cards.map(({ title, value, icon: Icon, href }) => (
          <Link key={title} href={href}>
            <Card className="transition-shadow hover:shadow-md">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">{title}</CardTitle>
              <Icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{value}</div>
            </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Сүүлд шинэчлэгдсэн</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Нэр</TableHead>
                <TableHead>Ангилал</TableHead>
                <TableHead>Үнэ</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {stats!.recentProducts.map((p) => (
                <TableRow key={p.id}>
                  <TableCell className="font-medium">{p.name}</TableCell>
                  <TableCell>{p.category?.name ?? "—"}</TableCell>
                  <TableCell>{formatPrice(p.price)}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="outline" size="icon" asChild>
                      <Link
                        href={
                          p.isBundle
                            ? `/bundles?edit=${p.id}`
                            : `/products?edit=${p.id}`
                        }
                        aria-label="Засах"
                      >
                        <Pencil className="h-4 w-4" />
                      </Link>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
