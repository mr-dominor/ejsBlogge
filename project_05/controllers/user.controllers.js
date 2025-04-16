import { userModel } from "../models/user.models.js";
import { setUser } from "../services/authStore.js";
import { v4 as uuidv4 } from "uuid";

async function handleSignup(req,res){
    const {name,email,password} = req.body;
    if(!name || !email || !password) return res.json({msg:"All are needed"});
    try {
        const result = await userModel.create({
            name:name,
            email:email,
            password:password
        })
        if(!result) return res.render("signup",{error:"Not found"});
        return res.redirect("/test/");
    } catch (error) {
        return res.status(500).json({msg:"Internal error"})
    }
}

async function handleLogin(req,res) {
    const {email, password} = req.body;
    if(!email || !password) return res.json({msg:"All are needed"});
    try {
        const result = await userModel.findOne({email,password});
        if(!result) return res.render("login",{error:"Not found"});
        const sessionId = uuidv4();
        setUser(sessionId, result);
        res.cookie("uuid",sessionId);
        return res.redirect("/test/")
    } catch (error) {
        return res.status(500).json({msg:"Internal error"})
    }
}

export {handleSignup, handleLogin}