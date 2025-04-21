import {Blog} from "../models/blog.models.js";


async function handleAddBlog(req,res){
    const {title, description, preview,createdby} = await req.body;

    if(!title || !description || !preview || !createdby) return res.render("blog",{msg:"All fields are required"});

    try {
        const result = await Blog.create({
            title,
            description,
            preview,
            createdby
        });
        if(!result) return res.render("blog",{msg:"Information error"});
        console.log(result);
        return res.json({msg:"Result recieved"})
    } catch (error) {
        return res.render("blog",{msg:"All fields are required"});
    }
}

export {handleAddBlog};