import { Router } from "express";
import { Op } from "sequelize";
import {
  Product,
  PurchaseOrder,
  PurchaseOrderItem,
} from "../../models/index.js";

const router = Router();

const STATUSES = ["pending", "confirmed", "shipped", "delivered", "cancelled"];

function generateOrderNumber() {
  const date = new Date().toISOString().slice(0, 10).replace(/-/g, "");
  const rand = Math.floor(Math.random() * 9000) + 1000;
  return `PO-${date}-${rand}`;
}

function calcTotals(items) {
  const subtotal = items.reduce(
    (sum, item) => sum + Number(item.lineTotal || item.unitPrice * item.quantity),
    0,
  );
  return { subtotal, totalAmount: subtotal };
}

async function resolveItems(rawItems) {
  if (!rawItems?.length) return [];

  const resolved = [];
  for (const item of rawItems) {
    let productName = item.productName;
    let unitPrice = Number(item.unitPrice);
    let isBundle = Boolean(item.isBundle);
    let productId = item.productId ?? null;

    if (productId) {
      const product = await Product.findByPk(productId);
      if (product) {
        productName = product.name;
        unitPrice = unitPrice || product.price;
        isBundle = product.isBundle;
      }
    }

    const quantity = Number(item.quantity) || 1;
    resolved.push({
      productId,
      productName: productName || "Unknown",
      quantity,
      unitPrice,
      lineTotal: quantity * unitPrice,
      isBundle,
    });
  }
  return resolved;
}

router.get("/", async (req, res, next) => {
  try {
    const { status, q } = req.query;
    const where = {};

    if (status) where.status = status;
    if (q) {
      where[Op.or] = [
        { orderNumber: { [Op.iLike]: `%${q}%` } },
        { customerName: { [Op.iLike]: `%${q}%` } },
        { customerPhone: { [Op.iLike]: `%${q}%` } },
      ];
    }

    const orders = await PurchaseOrder.findAll({
      where,
      include: [{ model: PurchaseOrderItem, as: "items" }],
      order: [["createdAt", "DESC"]],
    });
    res.json(orders);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const order = await PurchaseOrder.findByPk(req.params.id, {
      include: [
        {
          model: PurchaseOrderItem,
          as: "items",
          include: [{ model: Product, as: "product", attributes: ["id", "slug", "name", "image"] }],
        },
      ],
    });
    if (!order) return res.status(404).json({ error: "Order not found" });
    res.json(order);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const {
      customerName,
      customerPhone,
      customerEmail,
      deliveryAddress,
      notes,
      status = "pending",
      items = [],
    } = req.body;

    if (!customerName) {
      return res.status(400).json({ error: "customerName is required" });
    }
    if (!items.length) {
      return res.status(400).json({ error: "At least one order item is required" });
    }

    const resolvedItems = await resolveItems(items);
    const { subtotal, totalAmount } = calcTotals(resolvedItems);

    const order = await PurchaseOrder.create({
      orderNumber: generateOrderNumber(),
      status: STATUSES.includes(status) ? status : "pending",
      customerName,
      customerPhone,
      customerEmail,
      deliveryAddress,
      notes,
      subtotal,
      totalAmount,
    });

    await PurchaseOrderItem.bulkCreate(
      resolvedItems.map((item) => ({ ...item, purchaseOrderId: order.id })),
    );

    const created = await PurchaseOrder.findByPk(order.id, {
      include: [{ model: PurchaseOrderItem, as: "items" }],
    });
    res.status(201).json(created);
  } catch (error) {
    next(error);
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    const order = await PurchaseOrder.findByPk(req.params.id);
    if (!order) return res.status(404).json({ error: "Order not found" });

    const {
      customerName,
      customerPhone,
      customerEmail,
      deliveryAddress,
      notes,
      status,
      items,
    } = req.body;

    const updates = {};
    if (customerName != null) updates.customerName = customerName;
    if (customerPhone != null) updates.customerPhone = customerPhone;
    if (customerEmail != null) updates.customerEmail = customerEmail;
    if (deliveryAddress != null) updates.deliveryAddress = deliveryAddress;
    if (notes != null) updates.notes = notes;
    if (status && STATUSES.includes(status)) updates.status = status;

    if (items) {
      const resolvedItems = await resolveItems(items);
      const { subtotal, totalAmount } = calcTotals(resolvedItems);
      updates.subtotal = subtotal;
      updates.totalAmount = totalAmount;

      await PurchaseOrderItem.destroy({ where: { purchaseOrderId: order.id } });
      await PurchaseOrderItem.bulkCreate(
        resolvedItems.map((item) => ({ ...item, purchaseOrderId: order.id })),
      );
    }

    await order.update(updates);

    const updated = await PurchaseOrder.findByPk(order.id, {
      include: [{ model: PurchaseOrderItem, as: "items" }],
    });
    res.json(updated);
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const order = await PurchaseOrder.findByPk(req.params.id);
    if (!order) return res.status(404).json({ error: "Order not found" });
    await PurchaseOrderItem.destroy({ where: { purchaseOrderId: order.id } });
    await order.destroy();
    res.status(204).send();
  } catch (error) {
    next(error);
  }
});

export default router;
