import express from "express";
import { handleAddBlog,openBlog,handleComments } from "../controllers/blog.controllers.js";
const blogRouter = express.Router();

blogRouter.get('/add-new',(req,res)=>{
    return res.render("blog",{
       user: req.user
    });
});

blogRouter.post('/',handleAddBlog);

blogRouter.get('/:id',openBlog);

blogRouter.post('/comments',handleComments);

export {blogRouter};
