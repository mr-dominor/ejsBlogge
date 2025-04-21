import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    preview:{
        type:String,
        required:true
    },
 createdby:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
    }
},{timestamps:true});


const Blog = mongoose.model("blog",blogSchema);
export {Blog};