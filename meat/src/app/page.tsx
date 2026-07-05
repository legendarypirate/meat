import { HeaderWrapper } from "@/components/layout/HeaderWrapper";
import { Footer } from "@/components/layout/Footer";
import { Newsletter } from "@/components/layout/Newsletter";
import {
  Hero,
  CategoryGrid,
  MeatCategorySection,
  Testimonial,
} from "@/components/home/HomeSections";
import { FeaturedProducts, FeaturedBundles } from "@/components/products/ProductCard";
import { fetchProducts } from "@/lib/api";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const products = await fetchProducts().catch((error) => {
    console.error("Home page: failed to fetch products", error);
    return [];
  });

  return (
    <>
      <HeaderWrapper variant="home" showSearch />
      <main>
        <Hero />
        <CategoryGrid />
        <MeatCategorySection />
        <FeaturedProducts products={products} />
        <FeaturedBundles products={products} />
        <Testimonial />
        <Newsletter />
      </main>
      <Footer />
    </>
  );
}
