import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
    comment:{
        type:String,
        required:true
    },
    createdby:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
    },
    forBlog:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'blog'
    }
},{timestamps:true})

const Comments = mongoose.model("comment",commentSchema);
export {Comments};