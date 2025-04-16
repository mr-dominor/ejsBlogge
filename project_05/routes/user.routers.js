import { handleLogin, handleSignup } from "../controllers/user.controllers.js";
import express from "express"

const userRouter = express.Router();
userRouter.post('/',handleSignup);

userRouter.post("/login",handleLogin);
export {userRouter};