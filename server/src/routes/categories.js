import { Router } from "express";
import { Category } from "../models/index.js";

const router = Router();

router.get("/", async (_req, res, next) => {
  try {
    const categories = await Category.findAll({ order: [["id", "ASC"]] });
    res.json(categories);
  } catch (error) {
    next(error);
  }
});

export default router;
