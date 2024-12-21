import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import { loginUser, registerUser } from "./auth.controller";
import { AuthValidation } from "./auth.validation";

const router = express.Router();

// create a new user
router.post(
  "/auth/register",
  validateRequest(AuthValidation.registerValidationSchema),
  registerUser
);

// login user
router.post(
  "/auth/login",
  validateRequest(AuthValidation.loginValidationSchema),
  loginUser
);

export const authRoutes = router;
