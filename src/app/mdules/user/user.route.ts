import express from "express";
import { createUser, deleteUserById, getAllUsers, getUserByEmail, getUserById, updateUserById } from "./user.controllers";

const router = express.Router();


// create a new user 
router.post("/create-user", createUser);

// get all user
router.get("/all-users", getAllUsers);

// get single user by id
router.get("/:id", getUserById);

// get single user by email
router.get("/email/:email", getUserByEmail)

router.patch("/update/:id", updateUserById);

// delete user by id 
router.delete("/delete/:id", deleteUserById);


export  const userRoutes =  router;