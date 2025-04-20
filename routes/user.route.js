import express from "express";
import { handleSignin, handleSignup , handleLogout} from "../controllers/user.controllers.js";

const userRouter = express.Router();

userRouter.route('/signup')
   .get((req,res)=>{
      return res.render("signup")
   })
   .post(handleSignup);

userRouter.route('/signin')
.get((req,res)=>{
   return res.render("signin")
   })
   .post(handleSignin);

userRouter.get('/logout',handleLogout);
   
export {userRouter}