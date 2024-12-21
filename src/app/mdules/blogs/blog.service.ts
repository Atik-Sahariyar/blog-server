import { IBlog } from "./blog.interface";
import { Blog } from "./blog.model";

// Create a blog
const createBlog = async (blogData: IBlog) => {
 

    // Create the blog in the database
    const blog = new Blog(blogData);
    const newBlog = await blog.save();

    const populatedBlog = await Blog.findById(newBlog._id).populate('author', '-password'); // Exclude sensitive fields like password
    return populatedBlog;
};

// Get all blogs from the database
const getAllBlogsFromDB = async () => {

    const result = await Blog.find().populate("author"); 
  
    return result
};

// Get a single blog by ID
const getBlogById = async (id: string) => {
    const blog = await Blog.findById(id).populate("authorId categoryId", "profilePicture name slug");
    return blog;
};




// Update a blog by ID
const updateBlogById = async (id: string, updateBlog: IBlog) => {
    const updatedBlog = await Blog.findByIdAndUpdate(id, updateBlog, { new: true });
    return updatedBlog;
};

// Delete a blog by ID (soft delete)
const deleteBlogById = async (id: string) => {
    await Blog.findByIdAndDelete(id);
    return {};
};

export const BlogServices = {
    createBlog,
    getAllBlogsFromDB,
    getBlogById,
    updateBlogById,
    deleteBlogById,
};
