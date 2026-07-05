import Category from "./Category.js";
import Product from "./Product.js";
import ProductImage from "./ProductImage.js";
import PurchaseOrder from "./PurchaseOrder.js";
import PurchaseOrderItem from "./PurchaseOrderItem.js";

Category.hasMany(Product, { foreignKey: "category_id", as: "products" });
Product.belongsTo(Category, { foreignKey: "category_id", as: "category" });

Product.hasMany(ProductImage, { foreignKey: "product_id", as: "images" });
ProductImage.belongsTo(Product, { foreignKey: "product_id", as: "product" });

PurchaseOrder.hasMany(PurchaseOrderItem, {
  foreignKey: "purchase_order_id",
  as: "items",
  onDelete: "CASCADE",
});
PurchaseOrderItem.belongsTo(PurchaseOrder, {
  foreignKey: "purchase_order_id",
  as: "order",
});
PurchaseOrderItem.belongsTo(Product, { foreignKey: "product_id", as: "product" });

export { Category, Product, ProductImage, PurchaseOrder, PurchaseOrderItem };
