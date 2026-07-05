import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import { CartProvider } from "@/context/CartContext";
import { WishlistProvider } from "@/context/WishlistContext";
import { ProductCatalogProvider } from "@/context/ProductCatalogContext";
import { fetchProducts } from "@/lib/api";
import "./globals.css";

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Бурхант | Төгс хэрчилт, чанарын мах",
  description:
    "Монголын бэлчээр дээр өссөн дээд зэрэглэлийн мах. Бэлчээрээс таны ширээнд.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  let catalog: Awaited<ReturnType<typeof fetchProducts>> = [];
  try {
    catalog = await fetchProducts();
  } catch (error) {
    console.error("Failed to load product catalog:", error);
  }

  return (
    <html lang="mn" className={`${nunito.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col bg-background font-sans text-foreground">
        <ProductCatalogProvider products={catalog}>
          <CartProvider>
            <WishlistProvider>{children}</WishlistProvider>
          </CartProvider>
        </ProductCatalogProvider>
      </body>
    </html>
  );
}
