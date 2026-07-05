"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { Search, ShoppingCart, User, Heart } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { homeNavLinks, mainNavLinks } from "@/data/navigation";

type HeaderProps = {
  variant?: "home" | "shop";
  showSearch?: boolean;
};

export function Header({ variant = "shop", showSearch = false }: HeaderProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { itemCount } = useCart();
  const { itemCount: wishlistCount } = useWishlist();
  const [mounted, setMounted] = useState(false);
  const navLinks = variant === "home" ? homeNavLinks : mainNavLinks;

  useEffect(() => setMounted(true), []);

  const isLinkActive = (href: string) => {
    const [path, query] = href.split("?");
    if (path.startsWith("#")) return false;
    if (pathname !== path) return false;
    if (!query) {
      if (path === "/products") return !searchParams.get("category");
      return true;
    }
    const params = new URLSearchParams(query);
    const category = params.get("category");
    return category ? searchParams.get("category") === category : true;
  };

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-white/95 backdrop-blur-sm">
      <Container>
        <div className="flex h-16 items-center justify-between gap-4 lg:h-20">
          <Link
            href="/"
            className="text-2xl font-bold text-primary lg:text-3xl"
          >
            Бурхант
          </Link>

          <nav className="hidden items-center gap-6 lg:flex xl:gap-8">
            {navLinks.map((link) => {
              const isActive = isLinkActive(link.href);
              return (
                <Link
                  key={link.label}
                  href={link.href}
                  className={`text-sm font-medium transition-colors hover:text-primary ${
                    isActive
                      ? "border-b-2 border-primary pb-0.5 text-primary"
                      : "text-foreground"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-3 sm:gap-4">
            {showSearch && (
              <form action="/products" className="hidden md:flex">
                <div className="flex items-center gap-2 rounded-full bg-surface px-4 py-2">
                  <Search className="h-4 w-4 text-muted" />
                  <input
                    type="search"
                    name="q"
                    placeholder="Хайх..."
                    className="w-32 bg-transparent text-sm outline-none lg:w-48"
                  />
                </div>
              </form>
            )}

            <Link
              href="/wishlist"
              className="relative rounded-full p-2 transition-colors hover:bg-surface"
              aria-label="Хадгалсан жагсаалт"
            >
              <Heart className="h-5 w-5" />
              {mounted && wishlistCount > 0 && (
                <span className="absolute -right-0.5 -top-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-white">
                  {wishlistCount}
                </span>
              )}
            </Link>

            <Link
              href="/cart"
              className="relative rounded-full p-2 transition-colors hover:bg-surface"
            >
              <ShoppingCart className="h-5 w-5" />
              {mounted && itemCount > 0 && (
                <span className="absolute -right-0.5 -top-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-white">
                  {itemCount}
                </span>
              )}
            </Link>

            <Link
              href="/contact"
              className="rounded-full p-2 transition-colors hover:bg-surface"
              aria-label="Профайл"
            >
              <User className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </Container>
    </header>
  );
}
