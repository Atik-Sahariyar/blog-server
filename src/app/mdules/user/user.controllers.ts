import httpStatus from 'http-status';
import { UserServices } from "./user.service";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";




// admin can block any user by ID
export const blockUserById = catchAsync(async (req, res) => {
        const { userId } = req.params;
  
        const result = await UserServices.blockUserByIdFromDB(userId);

        sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: "User updated successfully",
            data: result,
        });
});

