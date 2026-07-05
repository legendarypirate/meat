import { Router } from "express";
import productRoutes from "./products.js";
import categoryRoutes from "./categories.js";
import adminProductRoutes from "./admin/products.js";
import adminCategoryRoutes from "./admin/categories.js";
import adminStatsRoutes from "./admin/stats.js";
import adminUploadRoutes from "./admin/upload.js";
import adminPurchaseOrderRoutes from "./admin/purchaseOrders.js";

const router = Router();

router.use("/products", productRoutes);
router.use("/categories", categoryRoutes);
router.use("/admin/products", adminProductRoutes);
router.use("/admin/categories", adminCategoryRoutes);
router.use("/admin/stats", adminStatsRoutes);
router.use("/admin/upload", adminUploadRoutes);
router.use("/admin/purchase-orders", adminPurchaseOrderRoutes);

export default router;
