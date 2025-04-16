import { getUser } from "../services/authStore.js";
export const allowWhenLogged = (req,res,next)=>{
    console.log(req)
    const urlCookie = req.cookies?.uuid;
    if(!urlCookie) return res.redirect("/test/login")
    console.log("middleware triggered")
    const user = getUser(urlCookie);
    if(!user) return res.redirect("/test/login")
    req.user = user;
    next();
}

