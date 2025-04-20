import { userModel } from "../models/user.models.js";

async function handleSignup(req,res){
    const {fullName, email,password} = req.body;
    if(!fullName || !email || !password) return res.json({msg:"All are required"});
    try {
        const response = await userModel.create({
            fullName,
            email,
            password
        })
        console.log(req.body);
        if(!response) return res.status(400).json({msg:"failed request"});
        return res.redirect("/");
    } catch (error) {
        return res.status(500).json({msg:"Internal error"});
    }
}

async function handleSignin(req,res){
    console.log("hello there")
    const {email,password} = req.body;
    try {
        const token = await userModel.matchPassword(email,password);
        if(!token) return res.redirect('/use/signup');
        console.log("token from controller::",token);
        return res.cookie("token",token).redirect("/");
    } catch (error) {
        return res.render("signin",{
            error:"Incorrect Something"
        })
    }
}

async function handleLogout(req,res){
     res.clearCookie("token").redirect("/")
}

export {handleSignup, handleSignin, handleLogout}