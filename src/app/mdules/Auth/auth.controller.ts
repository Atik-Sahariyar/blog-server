import httpStatus from "http-status";
import config from "../../config";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { AuthServices } from "./auth.service";


// register a new user
export const registerUser = catchAsync(async (req, res) => {
  const userData = req.body;
  const result = await AuthServices.registerUserIntoDB(userData);
  sendResponse(res, {
      success: true,
      message: "User registered successfully",
      statusCode: httpStatus.CREATED,
      data: result,
  });
});



// login user
export const loginUser = catchAsync(async (req, res) => {
  const result = await AuthServices.loginUser(req.body);
  const {  accessToken } = result;

  res.cookie("token", accessToken, {
    secure: config.NODE_ENV === "production",
    httpOnly: true,
  });

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User is logged in succesfully!",
    data: {
      token: accessToken,
    },
  });
});



