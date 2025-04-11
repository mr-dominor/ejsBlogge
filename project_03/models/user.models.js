import mongoose from "mongoose";
const schema = new mongoose.Schema({
    first_name:{
        type:String,
        required:true,
    },
    last_name:{
        type:String,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    gender:{
        type:String,
        required:true,
    },
    job:{
        type:String,
        required:true,
    },
},{timestamps:true});

const User = mongoose.model("user2",schema);
export {User};