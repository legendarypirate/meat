import { Router } from "express";
import { Category, Product } from "../../models/index.js";

const router = Router();

router.get("/", async (_req, res, next) => {
  try {
    const [productCount, categoryCount, bundleCount] = await Promise.all([
      Product.count({ where: { isBundle: false } }),
      Category.count(),
      Product.count({ where: { isBundle: true } }),
    ]);

    const recent = await Product.findAll({
      limit: 5,
      order: [["updatedAt", "DESC"]],
      include: [{ model: Category, as: "category", attributes: ["name", "slug"] }],
      attributes: ["id", "name", "slug", "price", "isBundle", "updatedAt"],
    });

    res.json({ productCount, categoryCount, bundleCount, recentProducts: recent });
  } catch (error) {
    next(error);
  }
});

export default router;
