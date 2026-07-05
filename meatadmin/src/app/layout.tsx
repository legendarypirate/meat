import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin", "cyrillic"],
  variable: "--font-manrope",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Meat Admin | Бурхант",
  description: "Бурхант махны дэлгүүрийн админ самбар",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="mn" className={manrope.variable}>
      <body className="min-h-screen font-sans antialiased">{children}</body>
    </html>
  );
}
