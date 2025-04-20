import mongoose from "mongoose";
import {createHmac,randomBytes} from "crypto"
import { createToken } from "../services/authServices.js";

const userSchema = new mongoose.Schema({
    fullName:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    salt:{
        type:String,
    },
    password:{
        type:String,
        required:true
    },
    profilePhoto:{
        type:String,
        default:'../public/images.png'
    },
    role:{
        type:String,
        enum:['USER','CREATOR'],
        default:'USER',
    }
},{timestamps:true});

userSchema.pre("save",function(next){
    const user = this;
    if(!user.isModified("password")) return;
    const salt = randomBytes(16).toString();
    const hashedPassword = createHmac("sha256",salt).update(user.password).digest("hex");

    this.salt = salt;
    this.password = hashedPassword;

    next(); 
});

userSchema.static("matchPassword",async function(email,password){
    const user = await this.findOne({email});
    if(!user) throw new Error('Not a user, signup');

    const salt = user.salt;
    const hashedPassword = user.password;

    const userGivenPassword = createHmac('sha256',salt).update(password).digest("hex");
    if(hashedPassword !== userGivenPassword) throw new Error('Wrong Password');

    const token = createToken(user);
    return token;
})

const userModel = mongoose.model("user",userSchema);
export {userModel};