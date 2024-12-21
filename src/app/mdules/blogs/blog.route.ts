import express from "express";
import { createBlog, deleteBlogById, getBlogs, getBlogById, updateBlogById } from "./blog.controllers";

const router = express.Router();

// Create a new blog
router.post("/blogs",   createBlog);

// Get all blogs with pagination and filters
router.get("/blogs", getBlogs);

// Get single blog by id
router.get("/blogs/:id", getBlogById);

// Update blog by id
router.patch("/blogs/:id", updateBlogById);


// Delete blog by id (soft delete)mkl
router.delete("/blogs/:id", deleteBlogById);


// Delete blog by id (soft delete)mkl
router.delete("/admin/blogs/:id", deleteBlogById);


export const blogRoutes =  router;
