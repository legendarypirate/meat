"use client";

import { HeaderWrapper } from "@/components/layout/HeaderWrapper";
import { Footer } from "@/components/layout/Footer";
import { Container } from "@/components/ui/Container";
import { WishlistItemsList } from "@/components/wishlist/WishlistComponents";

export default function WishlistPage() {
  return (
    <>
      <HeaderWrapper />
      <main className="py-10 lg:py-14">
        <Container>
          <WishlistItemsList />
        </Container>
      </main>
      <Footer />
    </>
  );
}
