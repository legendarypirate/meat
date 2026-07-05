import { Router } from "express";
import { Category, Product, ProductImage } from "../../models/index.js";

const router = Router();

function normalizeImages(images) {
  if (!images?.length) return [];
  return images.map((img, index) => {
    if (typeof img === "string") {
      return { url: img, cloudinaryPublicId: null, sortOrder: index };
    }
    return {
      url: img.url,
      cloudinaryPublicId: img.publicId || img.cloudinaryPublicId || null,
      sortOrder: img.sortOrder ?? index,
    };
  });
}

async function saveProductImages(productId, images) {
  const normalized = normalizeImages(images);
  await ProductImage.destroy({ where: { productId } });
  if (!normalized.length) return;
  await ProductImage.bulkCreate(
    normalized.map((img) => ({
      productId,
      url: img.url,
      cloudinaryPublicId: img.cloudinaryPublicId,
      sortOrder: img.sortOrder,
    })),
  );
}

function parseProductBody(body) {
  const {
    slug,
    name,
    description,
    longDescription,
    price,
    priceUnit,
    image,
    images,
    badge,
    badgeVariant,
    grade,
    categorySlug,
    categoryId,
    cutType,
    weight,
    isBundle,
    bundleData,
    meatTypes,
    highlights,
    cookingTips,
    sizes,
  } = body;

  return {
    slug,
    name,
    description,
    longDescription,
    price: price != null ? Number(price) : undefined,
    priceUnit,
    image,
    badge,
    badgeVariant,
    grade,
    categoryId,
    categorySlug,
    cutType,
    weight,
    isBundle: Boolean(isBundle),
    bundleData,
    meatTypes,
    highlights,
    cookingTips,
    sizes,
    images,
  };
}

router.get("/", async (req, res, next) => {
  try {
    const { isBundle } = req.query;
    const where = {};

    if (isBundle === "true") where.isBundle = true;
    if (isBundle === "false") where.isBundle = false;

    const products = await Product.findAll({
      where,
      include: [
        { model: Category, as: "category", attributes: ["id", "slug", "name"] },
        { model: ProductImage, as: "images", attributes: ["id", "url", "sortOrder", "cloudinaryPublicId"] },
      ],
      order: [["id", "ASC"]],
    });
    res.json(products);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.id, {
      include: [
        { model: Category, as: "category", attributes: ["id", "slug", "name"] },
        { model: ProductImage, as: "images", attributes: ["id", "url", "sortOrder", "cloudinaryPublicId"] },
      ],
    });
    if (!product) return res.status(404).json({ error: "Product not found" });
    res.json(product);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const data = parseProductBody(req.body);
    if (!data.slug || !data.name || data.price == null || !data.priceUnit) {
      return res
        .status(400)
        .json({ error: "slug, name, price, and priceUnit are required" });
    }

    let categoryId = data.categoryId;
    if (!categoryId && data.categorySlug) {
      const category = await Category.findOne({ where: { slug: data.categorySlug } });
      if (!category) {
        return res.status(400).json({ error: "Category not found" });
      }
      categoryId = category.id;
    }

    const { images, categorySlug: _cs, ...productFields } = data;
    const product = await Product.create({ ...productFields, categoryId });

    await saveProductImages(product.id, images);

    const created = await Product.findByPk(product.id, {
      include: [
        { model: Category, as: "category" },
        { model: ProductImage, as: "images" },
      ],
    });
    res.status(201).json(created);
  } catch (error) {
    next(error);
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) return res.status(404).json({ error: "Product not found" });

    const data = parseProductBody(req.body);
    let categoryId = data.categoryId ?? product.categoryId;

    if (data.categorySlug) {
      const category = await Category.findOne({ where: { slug: data.categorySlug } });
      if (category) categoryId = category.id;
    }

    const { images, categorySlug: _cs, ...productFields } = data;
    const updates = Object.fromEntries(
      Object.entries({ ...productFields, categoryId }).filter(([, v]) => v !== undefined),
    );
    await product.update(updates);

    if (images) {
      await saveProductImages(product.id, images);
    }

    const updated = await Product.findByPk(product.id, {
      include: [
        { model: Category, as: "category" },
        { model: ProductImage, as: "images" },
      ],
    });
    res.json(updated);
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) return res.status(404).json({ error: "Product not found" });
    await ProductImage.destroy({ where: { productId: product.id } });
    await product.destroy();
    res.status(204).send();
  } catch (error) {
    next(error);
  }
});

export default router;
