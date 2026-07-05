import { Suspense } from "react";
import { HeaderWrapper } from "@/components/layout/HeaderWrapper";
import { Footer } from "@/components/layout/Footer";
import { Newsletter } from "@/components/layout/Newsletter";
import { Container } from "@/components/ui/Container";
import { BundlesPageClient } from "@/components/products/BundlesPageClient";

export default function BundlesPage() {
  return (
    <>
      <HeaderWrapper />
      <main className="py-10 lg:py-14">
        <Container>
          <Suspense fallback={<p className="text-muted">Ачааллаж байна...</p>}>
            <BundlesPageClient />
          </Suspense>
        </Container>
      </main>
      <Newsletter />
      <Footer />
    </>
  );
}
