import { Router } from "express";
import { Category } from "../models/index.js";

const router = Router();

router.get("/", async (_req, res, next) => {
  try {
    const categories = await Category.findAll({ order: [["name", "ASC"]] });
    res.json(
      categories.map((c) => ({
        id: c.id,
        slug: c.slug,
        name: c.name,
        image: c.image ?? "",
      })),
    );
  } catch (error) {
    next(error);
  }
});

export default router;
