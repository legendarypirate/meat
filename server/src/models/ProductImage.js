import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const ProductImage = sequelize.define(
  "ProductImage",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    url: {
      type: DataTypes.STRING(500),
      allowNull: false,
    },
    sortOrder: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      field: "sort_order",
    },
    productId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "product_id",
    },
    cloudinaryPublicId: {
      type: DataTypes.STRING(200),
      allowNull: true,
      field: "cloudinary_public_id",
    },
  },
  { tableName: "product_images" },
);

export default ProductImage;
