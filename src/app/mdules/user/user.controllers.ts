import httpStatus from 'http-status';
import { UserServices } from "./user.service";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";

// Create a user
export const createUser = catchAsync(async (req, res) => {
        const userData = req.body;
        const result = await UserServices.createUserIntoDB(userData);
        sendResponse(res, {
            statusCode: 201,
            success: true,
            message: "User created successfully",
            data: result,
        });
});

// Get all users with pagination
export const getAllUsers  = catchAsync(async (req, res) => {
        const { page = 1, limit = 10 } = req.query;
        const result = await UserServices.getAllUserFromDB(Number(page), Number(limit));

        sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: "Users retrieved successfully",
            data: result,
        });

});

// Get a single user by ID
export const getUserById = catchAsync(async (req, res) => {
  
        const { id } = req.params;
        const result = await UserServices.getSingleUserByIdFromDB(id);
        sendResponse(res, {
            statusCode: 200,
            success: true,
            message: "User retrieved successfully",
            data: result,
        });

});

// Get a single user by email
export const getUserByEmail = catchAsync(async (req, res) => {
  
        const  email  = req.params.email;
        const result = await UserServices.getSingleUserByEmailFromDB(email as string);
        sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: "User retrieved successfully",
            data: result,
        });
});

// Update a user by ID
export const updateUserById = catchAsync(async (req, res) => {
  
        const { id } = req.params;
        const updateUser = req.body;
  
        const result = await UserServices.updateSingleUserByIdFromDB(id, updateUser);

        sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: "User updated successfully",
            data: result,
        });
});

// Delete a user by ID
export const deleteUserById = catchAsync(async (req, res) => {
        const { id } = req.params;
        await UserServices.deleteSingleUserByIdFromDB(id);
        sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: "User deleted successfully",
            data: {},
        });

});
