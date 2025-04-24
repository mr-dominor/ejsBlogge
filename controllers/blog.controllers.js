import { Blog } from "../models/blog.models.js";
import {userModel} from "../models/user.models.js"
import { Comments } from "../models/comments.models.js";
import multer from "multer";
import path from "path";

// Define Multer storage config
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.resolve('public/uploads')); // relative to project root
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

// Multer setup (done outside the function for performance)
const upload = multer({ storage: storage }).single("preview");

// Controller
async function handleAddBlog(req, res) {
  upload(req, res, async function (err) {
    if (err) {
      console.error(err);
      return res.render("blog", { msg: "File upload error",user:req.user });
    }

    const { title, description } = req.body;
    const preview = req.file?.filename;

    if (!title || !description || !preview) {
      return res.render("blog", { msg: "All fields are required" ,user:req.user});
    }

    try {
      const result = await Blog.create({
        title,
        description,
        preview,
        createdby:req.user?._id
      });

      if (!result) {
        return res.render("blog", { msg: "Information error",user:req.user });
      }


      return res.redirect("/");
    } catch (error) {
      console.error(error);
      return res.render("blog", { msg: "Something went wrong" });
    }
  });
};

async function openBlog(req,res){
  const {id} = req.params;
  try {
    const result = await Blog.findById(id).populate("createdby");
    const commentHere = await Comments.find({forBlog:id}).populate("createdby");
    if(!result) return res.render("readBlog",{msg:"No Such thing available",user:req.user});
    return res.render("readBlog",{blog:result,user:req.user, comments:commentHere});
  } catch (error) {
    return res.render("readBlog",{msg:"Fetching it is not possible right now",user:req.user})
  }
}

async function handleComments(req,res){
  const {comment,blogId} = req.body;
  if(!comment) return res.render("readBlog",{msg:"Comment before submitting"});
  try {
    const blogs = await Blog.findById(blogId)
    const result = await Comments.create({
      comment,
      forBlog:blogId,
      createdby:req.user?._id
    })
    if(!result) return res.render("readBlog",{user:req.user, blogs:blogs});
    return res.render("readBlog",{user:req.user, blogs:blogs});
  } catch (error) {
    return res.render("readBlog",{user:req.user});
  }
}

export { handleAddBlog ,openBlog, handleComments};
