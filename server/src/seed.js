import { Category, Product, ProductImage } from "./models/index.js";
import { categories, products } from "./data/products.js";

export default async function seed() {
  const categoryMap = {};

  for (const cat of categories) {
    const [record] = await Category.findOrCreate({
      where: { slug: cat.slug },
      defaults: cat,
    });
    categoryMap[cat.slug] = record.id;
  }

  for (const item of products) {
    const { categorySlug, images, ...data } = item;

    const [product, created] = await Product.findOrCreate({
      where: { slug: item.slug },
      defaults: {
        ...data,
        categoryId: categoryMap[categorySlug],
      },
    });

    if (!created) {
      await product.update({ ...data, categoryId: categoryMap[categorySlug] });
    }

    if (images?.length) {
      await ProductImage.destroy({ where: { productId: product.id } });
      await ProductImage.bulkCreate(
        images.map((url, index) => ({
          productId: product.id,
          url,
          sortOrder: index,
        })),
      );
    }
  }

  console.log(`Seeded ${categories.length} categories, ${products.length} products.`);
}
