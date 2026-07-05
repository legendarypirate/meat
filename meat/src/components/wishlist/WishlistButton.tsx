"use client";

import { Heart } from "lucide-react";
import { useWishlist } from "@/context/WishlistContext";

type WishlistButtonProps = {
  productId: string;
  variant?: "icon" | "detail";
  className?: string;
};

export function WishlistButton({
  productId,
  variant = "icon",
  className = "",
}: WishlistButtonProps) {
  const { isInWishlist, toggleItem } = useWishlist();
  const active = isInWishlist(productId);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleItem(productId);
  };

  if (variant === "detail") {
    return (
      <button
        type="button"
        onClick={handleClick}
        className={`flex w-full items-center justify-center gap-2 rounded-lg border py-4 text-sm font-bold uppercase tracking-wider transition-colors ${
          active
            ? "border-primary bg-primary-light text-primary"
            : "border-border text-foreground hover:border-primary hover:text-primary"
        } ${className}`}
        aria-label={active ? "Хадгалснаас хасах" : "Хадгалах"}
      >
        <Heart className={`h-5 w-5 ${active ? "fill-primary" : ""}`} />
        {active ? "Хадгалсан" : "Хадгалах"}
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      className={`rounded-full bg-white/90 p-2 shadow-sm transition-colors hover:bg-white ${className}`}
      aria-label={active ? "Хадгалснаас хасах" : "Хадгалах"}
    >
      <Heart
        className={`h-4 w-4 transition-colors ${
          active ? "fill-red-500 text-red-500" : "text-foreground/70"
        }`}
      />
    </button>
  );
}
