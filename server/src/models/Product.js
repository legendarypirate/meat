import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Product = sequelize.define(
  "Product",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    slug: {
      type: DataTypes.STRING(120),
      allowNull: false,
      unique: true,
    },
    name: {
      type: DataTypes.STRING(200),
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    longDescription: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: "long_description",
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    priceUnit: {
      type: DataTypes.STRING(30),
      allowNull: false,
      field: "price_unit",
    },
    image: {
      type: DataTypes.STRING(500),
      allowNull: true,
    },
    badge: {
      type: DataTypes.STRING(80),
      allowNull: true,
    },
    badgeVariant: {
      type: DataTypes.STRING(20),
      allowNull: true,
      field: "badge_variant",
    },
    grade: {
      type: DataTypes.STRING(80),
      allowNull: true,
    },
    cutType: {
      type: DataTypes.STRING(50),
      allowNull: true,
      field: "cut_type",
    },
    weight: {
      type: DataTypes.STRING(30),
      allowNull: true,
    },
    isBundle: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      field: "is_bundle",
    },
    bundleData: {
      type: DataTypes.JSON,
      allowNull: true,
      field: "bundle_data",
    },
    meatTypes: {
      type: DataTypes.JSON,
      allowNull: true,
      field: "meat_types",
    },
    highlights: {
      type: DataTypes.JSON,
      allowNull: true,
    },
    cookingTips: {
      type: DataTypes.JSON,
      allowNull: true,
      field: "cooking_tips",
    },
    sizes: {
      type: DataTypes.JSON,
      allowNull: true,
    },
    categoryId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: "category_id",
    },
  },
  { tableName: "products" },
);

export default Product;
