import { notFound } from "next/navigation";
import { HeaderWrapper } from "@/components/layout/HeaderWrapper";
import { Footer } from "@/components/layout/Footer";
import { Container } from "@/components/ui/Container";
import { ProductDetail } from "@/components/products/ProductDetail";
import { fetchProductBySlug, fetchProducts } from "@/lib/api";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  try {
    const products = await fetchProducts();
    return products.map((product) => ({ slug: product.slug }));
  } catch {
    return [];
  }
}

export default async function ProductPage({ params }: PageProps) {
  const { slug } = await params;
  const product = await fetchProductBySlug(slug).catch(() => null);

  if (!product) {
    notFound();
  }

  return (
    <>
      <HeaderWrapper />
      <main className="py-10 lg:py-14">
        <Container>
          <ProductDetail product={product} />
        </Container>
      </main>
      <Footer />
    </>
  );
}
