
//==========================================Here you map frontend compos to its route(not backend)======================================================
import express from "express"
import { urlModel } from "../models/url.models.js";

const staticRouter = express.Router();

//setting routes
staticRouter.get('/',async (req,res)=>{
    const allUrls = await urlModel.find({})
    return res.render("home",{
        urls:allUrls,
    });
})

staticRouter.get('/signup', async (req,res)=>{
    return res.render("signup")
})

staticRouter.get('/login', async (req,res)=>{
    return res.render("login")
})

export {staticRouter};