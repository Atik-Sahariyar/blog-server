import express from "express";
import { blockUserById,  } from "./user.controllers";

const router = express.Router();



// admin can block any user
router.patch("/api/admin/users/:userId/block", blockUserById);



export  const userRoutes =  router;