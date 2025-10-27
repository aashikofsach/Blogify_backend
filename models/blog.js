import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import User from "./user.js"; // Import User model

const Blog = sequelize.define(
  "Blog",
  {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    body: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    imageUrl: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: null,
    },
    createdBy: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "users", // must match your User tableName
        key: "id",
      },
      onDelete: "CASCADE", // optional: delete blogs if user is deleted
      onUpdate: "CASCADE",
    },
  },
  {
    tableName: "blogs",
    timestamps: true,
  }
);

// // 🔗 Relationship: Blog belongs to User (creator)
// Blog.belongsTo(User, {
//   foreignKey: "createdBy",
//   as: "author", // alias
// });

// User.hasMany(Blog, {
//   foreignKey: "createdBy",
//   as: "blogs",
// });

export default Blog;
