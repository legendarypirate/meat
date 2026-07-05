"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LayoutDashboard, Package, Tags, ShoppingCart, Gift, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const links = [
  { href: "/", label: "Хяналтын самбар", icon: LayoutDashboard },
  { href: "/products", label: "Бүтээгдэхүүн", icon: Package },
  { href: "/bundles", label: "Багц", icon: Gift },
  { href: "/categories", label: "Ангилал", icon: Tags },
  { href: "/purchase-orders", label: "Захиалга", icon: ShoppingCart },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/login");
    router.refresh();
  }

  return (
    <aside className="flex w-64 shrink-0 flex-col border-r bg-card">
      <div className="border-b px-6 py-5">
        <p className="text-xs font-semibold uppercase tracking-wider text-primary">
          Бурхант
        </p>
        <h1 className="text-lg font-bold">Meat Admin</h1>
      </div>
      <nav className="flex flex-1 flex-col gap-1 p-4">
        {links.map(({ href, label, icon: Icon }) => {
          const active =
            href === "/" ? pathname === "/" : pathname.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                active
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
              )}
            >
              <Icon className="h-4 w-4" />
              {label}
            </Link>
          );
        })}
      </nav>
      <div className="border-t p-4 space-y-3">
        <Button
          variant="outline"
          className="w-full justify-start gap-3"
          onClick={handleLogout}
        >
          <LogOut className="h-4 w-4" />
          Гарах
        </Button>
        <p className="text-xs text-muted-foreground">API: localhost:3001</p>
      </div>
    </aside>
  );
}
