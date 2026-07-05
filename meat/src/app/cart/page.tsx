"use client";

import { HeaderWrapper } from "@/components/layout/HeaderWrapper";
import { Footer } from "@/components/layout/Footer";
import { Container } from "@/components/ui/Container";
import { CartItemsList, OrderSummary } from "@/components/cart/CartComponents";

export default function CartPage() {
  return (
    <>
      <HeaderWrapper />
      <main className="py-10 lg:py-14">
        <Container>
          <div className="grid gap-10 lg:grid-cols-3 lg:gap-12">
            <div className="lg:col-span-2">
              <CartItemsList />
            </div>
            <div>
              <OrderSummary />
            </div>
          </div>
        </Container>
      </main>
      <Footer />
    </>
  );
}
