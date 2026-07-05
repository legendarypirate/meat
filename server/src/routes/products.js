import { Router } from "express";
import { Op } from "sequelize";
import { Category, Product, ProductImage } from "../models/index.js";

const router = Router();

function formatProduct(product) {
  const json = product.toJSON();
  const imageUrls = (json.images || [])
    .sort((a, b) => a.sortOrder - b.sortOrder)
    .map((i) => i.url)
    .filter(Boolean);
  const image = json.image || imageUrls[0] || "";

  return {
    id: String(json.id),
    slug: json.slug,
    name: json.name,
    description: json.description,
    longDescription: json.longDescription,
    price: json.price,
    priceUnit: json.priceUnit,
    image,
    images: imageUrls.length > 0 ? imageUrls : image ? [image] : [],
    badge: json.badge,
    badgeVariant: json.badgeVariant,
    grade: json.grade,
    category: json.category?.slug,
    cutType: json.cutType,
    weight: json.weight,
    meatTypes: json.meatTypes,
    highlights: json.highlights,
    cookingTips: json.cookingTips,
    sizes: json.sizes,
    bundle: json.isBundle ? json.bundleData : undefined,
  };
}

router.get("/", async (req, res, next) => {
  try {
    const { category, type, q } = req.query;
    const where = {};

    if (q) {
      where[Op.or] = [
        { name: { [Op.like]: `%${q}%` } },
        { description: { [Op.like]: `%${q}%` } },
      ];
    }

    const include = [
      { model: Category, as: "category", attributes: ["slug", "name"] },
      { model: ProductImage, as: "images", attributes: ["url", "sortOrder"] },
    ];

    if (category) {
      include[0].where = { slug: category };
    }

    let products = await Product.findAll({
      where,
      include,
      order: [["id", "ASC"]],
    });

    if (type) {
      products = products.filter((p) => p.meatTypes?.includes(type));
    }

    res.json(products.map(formatProduct));
  } catch (error) {
    next(error);
  }
});

router.get("/:slug", async (req, res, next) => {
  try {
    const product = await Product.findOne({
      where: { slug: req.params.slug },
      include: [
        { model: Category, as: "category", attributes: ["slug", "name"] },
        { model: ProductImage, as: "images", attributes: ["url", "sortOrder"] },
      ],
    });

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.json(formatProduct(product));
  } catch (error) {
    next(error);
  }
});

export default router;
