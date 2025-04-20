import express from "express";

const blogRouter = express.Router();

blogRouter.get('/add-new',(req,res)=>{
    return res.render("blog",{
       user: req.user
    })
});

blogRouter.post('/',)

export {blogRouter};
