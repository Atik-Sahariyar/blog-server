import express from "express";
import { blockUserById,  } from "./user.controllers";
import auth from "../../middlewares/auth";
import { USER_ROLE } from "./user.constant";

const router = express.Router();


// admin can blocked any user
router.patch("/admin/users/:userId/block", auth(USER_ROLE.admin), blockUserById)

export  const userRoutes =  router;


