import express, { Router } from "express";
import UserController from "../controller/UserController/UserController";

export const userRouter = express.Router()

userRouter.post("/signup", UserController.signup)
userRouter.post("/login", UserController.login)
userRouter.put("/edit", UserController.editUser)

userRouter.post("/address", UserController.createAddress)