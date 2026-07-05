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
import { fetchProducts, fetchCategories } from "@/lib/api";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const [products, categories] = await Promise.all([
    fetchProducts().catch((error) => {
      console.error("Home page: failed to fetch products", error);
      return [];
    }),
    fetchCategories().catch((error) => {
      console.error("Home page: failed to fetch categories", error);
      return [];
    }),
  ]);

  return (
    <>
      <HeaderWrapper variant="home" showSearch />
      <main>
        <Hero />
        <CategoryGrid />
        <MeatCategorySection categories={categories} />
        <FeaturedProducts products={products} />
        <FeaturedBundles products={products} />
        <Testimonial />
        <Newsletter />
      </main>
      <Footer />
    </>
  );
}
