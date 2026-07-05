"use client";

import { useEffect, useState } from "react";
import { Pencil, Plus, Trash2 } from "lucide-react";
import { api, type Category } from "@/lib/api";
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
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const [editCat, setEditCat] = useState<Category | null>(null);
  const [slug, setSlug] = useState("");
  const [name, setName] = useState("");
  const [saving, setSaving] = useState(false);

  async function load() {
    try {
      setCategories(await api.getCategories());
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

  function openCreate() {
    setEditCat(null);
    setSlug("");
    setName("");
    setOpen(true);
  }

  function openEdit(cat: Category) {
    setEditCat(cat);
    setSlug(cat.slug);
    setName(cat.name);
    setOpen(true);
  }

  async function handleSave() {
    setSaving(true);
    try {
      if (editCat) {
        await api.updateCategory(editCat.id, { slug, name });
      } else {
        await api.createCategory({ slug, name });
      }
      setOpen(false);
      await load();
    } catch (e) {
      alert(e instanceof Error ? e.message : "Хадгалахад алдаа гарлаа");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(cat: Category) {
    if (!confirm(`"${cat.name}" ангиллыг устгах уу?`)) return;
    try {
      await api.deleteCategory(cat.id);
      setCategories((prev) => prev.filter((c) => c.id !== cat.id));
    } catch (e) {
      alert(e instanceof Error ? e.message : "Устгахад алдаа гарлаа");
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Ангилал</h1>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button onClick={openCreate}>
              <Plus className="h-4 w-4" />
              Нэмэх
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editCat ? "Ангилал засах" : "Шинэ ангилал"}</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="cat-slug">Slug</Label>
                <Input id="cat-slug" value={slug} onChange={(e) => setSlug(e.target.value)} />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="cat-name">Нэр</Label>
                <Input id="cat-name" value={name} onChange={(e) => setName(e.target.value)} />
              </div>
            </div>
            <DialogFooter>
              <Button onClick={handleSave} disabled={saving || !slug || !name}>
                {saving ? "Хадгалж байна..." : "Хадгалах"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Бүх ангилал ({categories.length})</CardTitle>
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
                  <TableHead>Бүтээгдэхүүн</TableHead>
                  <TableHead className="text-right">Үйлдэл</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {categories.map((c) => (
                  <TableRow key={c.id}>
                    <TableCell className="font-medium">{c.name}</TableCell>
                    <TableCell className="text-muted-foreground">{c.slug}</TableCell>
                    <TableCell>{c.productCount ?? 0}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="outline" size="icon" onClick={() => openEdit(c)}>
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button variant="destructive" size="icon" onClick={() => handleDelete(c)}>
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
    </div>
  );
}
