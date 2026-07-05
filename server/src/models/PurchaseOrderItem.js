import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const PurchaseOrderItem = sequelize.define(
  "PurchaseOrderItem",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    purchaseOrderId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "purchase_order_id",
    },
    productId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: "product_id",
    },
    productName: {
      type: DataTypes.STRING(200),
      allowNull: false,
      field: "product_name",
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
    },
    unitPrice: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "unit_price",
    },
    lineTotal: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "line_total",
    },
    isBundle: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      field: "is_bundle",
    },
  },
  { tableName: "purchase_order_items" },
);

export default PurchaseOrderItem;
