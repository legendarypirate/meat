import { Suspense } from "react";
import { HeaderWrapper } from "@/components/layout/HeaderWrapper";
import { Footer } from "@/components/layout/Footer";
import { Newsletter } from "@/components/layout/Newsletter";
import { Container } from "@/components/ui/Container";
import { BundlesPageClient } from "@/components/products/BundlesPageClient";
import { fetchProducts } from "@/lib/api";

export default async function BundlesPage() {
  const products = await fetchProducts().catch(() => []);

  return (
    <>
      <HeaderWrapper />
      <main className="py-10 lg:py-14">
        <Container>
          <Suspense fallback={<p className="text-muted">Ачааллаж байна...</p>}>
            <BundlesPageClient products={products} />
          </Suspense>
        </Container>
      </main>
      <Newsletter />
      <Footer />
    </>
  );
}
