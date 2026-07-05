import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const PurchaseOrder = sequelize.define(
  "PurchaseOrder",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    orderNumber: {
      type: DataTypes.STRING(40),
      allowNull: false,
      unique: true,
      field: "order_number",
    },
    status: {
      type: DataTypes.STRING(20),
      allowNull: false,
      defaultValue: "pending",
    },
    customerName: {
      type: DataTypes.STRING(120),
      allowNull: false,
      field: "customer_name",
    },
    customerPhone: {
      type: DataTypes.STRING(30),
      allowNull: true,
      field: "customer_phone",
    },
    customerEmail: {
      type: DataTypes.STRING(120),
      allowNull: true,
      field: "customer_email",
    },
    deliveryAddress: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: "delivery_address",
    },
    notes: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    subtotal: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    totalAmount: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
      field: "total_amount",
    },
  },
  { tableName: "purchase_orders" },
);

export default PurchaseOrder;
