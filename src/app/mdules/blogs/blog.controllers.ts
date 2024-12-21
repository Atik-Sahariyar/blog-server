import { BlogServices } from './blog.service';
import sendResponse from '../../utils/sendResponse';
import catchAsync from '../../utils/catchAsync';
import httpStatus from 'http-status';
import AppError from '../../errors/AppError';

// Create a new blog
export const createBlog = catchAsync( async (req, res) => {

    const blogData = req.body; // Get blog data from the request body
    const result = await BlogServices.createBlog(blogData); // Call service to create blog

    sendResponse(res, {
      statusCode: httpStatus.CREATED,
      success: true,
      message: 'Blog created successfully',
      data: result, // Return the created blog data
    });

});

// Get all blogs with optional filters
export const getBlogs = catchAsync( async (req, res) => {
   
   console.log( "user: ",req.user)
    const result = await BlogServices.getAllBlogsFromDB(); // Call service to get blogs

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Blogs fetched successfully',
      data: result, // Return the list of blogs
    });

});

// Get a single blog by ID
export const getBlogById = catchAsync( async (req, res) => {

    const { id } = req.params; // Get blog ID from URL params
    const result = await BlogServices.getBlogById(id); // Call service to get the blog by ID

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Blog fetched successfully',
      data: result, // Return the blog data
    });

});

// Update a blog by ID
export const updateBlogById = catchAsync( async (req, res) => {

    const { id } = req.params; // Get blog ID from URL params
    const updateData = req.body; // Get updated data from request body
    
    const isExistBlog = await BlogServices.getBlogById(id); 
    if(!isExistBlog){
      throw new AppError(httpStatus.NOT_FOUND, "The blog is not found!")
    }
    console.log("user: ", req.user)

    const result = await BlogServices.updateBlogById(id, updateData); // Call service to update blog

    console.log("result: ", result)
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Blog updated successfully',
      data: result, // Return updated blog data
    });

});


// delete a blog
export const deleteBlogById = catchAsync( async (req, res) => {

    const { id } = req.params; // Get blog ID from URL params

    // Delete the blog from the database
    const result = await BlogServices.deleteBlogById(id);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Blog deleted successfully',
      data: result,
    });

});

