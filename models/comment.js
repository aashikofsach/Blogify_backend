// models/comment.js
import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import User from "./user.js";
import Blog from "./blog.js";

const Comment = sequelize.define(
  "Comment",
  {
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    blogId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "blogs",
        key: "id",
      },
      onDelete: "CASCADE",   // if blog deleted, delete its comments
      onUpdate: "CASCADE",
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "users",
        key: "id",
      },
      onDelete: "CASCADE",   // if user deleted, delete their comments
      onUpdate: "CASCADE",
    },
  },
  {
    tableName: "comments",
    timestamps: true, // gives createdAt, updatedAt
  }
);

// Associations
Comment.belongsTo(User, {
  foreignKey: "userId",
  as: "author",
});

Comment.belongsTo(Blog, {
  foreignKey: "blogId",
  as: "blog",
});

Blog.hasMany(Comment, {
  foreignKey: "blogId",
  as: "comments",
});

User.hasMany(Comment, {
  foreignKey: "userId",
  as: "comments",
});

export default Comment;
