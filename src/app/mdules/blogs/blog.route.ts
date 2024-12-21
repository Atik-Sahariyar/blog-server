import express from "express";
import { createBlog, deleteBlogById, getBlogs, getBlogById, updateBlogById } from "./blog.controllers";
import auth from "../../middlewares/auth";
import { USER_ROLE } from "../user/user.constant";

const router = express.Router();

// Create a new blog
router.post("/blogs",  auth( USER_ROLE.admin, USER_ROLE.user),  createBlog);

// Get all blogs with pagination and filters
router.get("/blogs",  getBlogs);

// Get single blog by id
router.get("/blogs/:id",  getBlogById);

// Update blog by id
router.patch("/blogs/:id", auth(USER_ROLE.admin, USER_ROLE.user), updateBlogById);


// Delete blog by id (soft delete)mkl
router.delete("/blogs/:id", auth( USER_ROLE.admin, USER_ROLE.user), deleteBlogById);


// Delete blog by id (soft delete)mkl
router.delete("/admin/blogs/:id", auth( USER_ROLE.admin, USER_ROLE.user), deleteBlogById);


export const blogRoutes =  router;
