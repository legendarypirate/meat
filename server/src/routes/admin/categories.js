import { Router } from "express";
import { Category, Product } from "../../models/index.js";

const router = Router();

router.get("/", async (_req, res, next) => {
  try {
    const categories = await Category.findAll({
      include: [{ model: Product, as: "products", attributes: ["id"] }],
      order: [["name", "ASC"]],
    });
    res.json(
      categories.map((c) => ({
        id: c.id,
        slug: c.slug,
        name: c.name,
        image: c.image ?? "",
        productCount: c.products?.length ?? 0,
      })),
    );
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { slug, name, image } = req.body;
    if (!slug || !name) {
      return res.status(400).json({ error: "slug and name are required" });
    }
    const category = await Category.create({ slug, name, image: image ?? null });
    res.status(201).json(category);
  } catch (error) {
    next(error);
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    const category = await Category.findByPk(req.params.id);
    if (!category) return res.status(404).json({ error: "Category not found" });
    await category.update({
      slug: req.body.slug ?? category.slug,
      name: req.body.name ?? category.name,
      image: req.body.image !== undefined ? req.body.image || null : category.image,
    });
    res.json(category);
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const category = await Category.findByPk(req.params.id);
    if (!category) return res.status(404).json({ error: "Category not found" });
    await category.destroy();
    res.status(204).send();
  } catch (error) {
    next(error);
  }
});

export default router;
