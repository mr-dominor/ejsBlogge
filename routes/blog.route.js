import express from "express";
import { handleAddBlog } from "../controllers/blog.controllers.js";

const blogRouter = express.Router();

blogRouter.get('/add-new',(req,res)=>{
    return res.render("blog",{
       user: req.user
    });
});

blogRouter.post('/',handleAddBlog);

export {blogRouter};
