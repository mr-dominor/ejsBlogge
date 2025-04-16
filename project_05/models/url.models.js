import mongoose, { Mongoose } from "mongoose"
import { redirect } from "react-router-dom"

const urlSchema = new mongoose.Schema({
    shortId:{
        type : String,
        unique: true,
        required:true
    },
    redirecturl:{
        type:String,
        required:true
    },
    visitHistory:[{
        timestamp:{
            type:Number
        }
    }],
    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
    }
})

const urlModel = mongoose.model("urls",urlSchema);
export {urlModel};