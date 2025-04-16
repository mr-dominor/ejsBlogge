import { urlModel } from "../models/url.models.js";
import { nanoid } from "nanoid";

async function handleGenerate(req,res){
    const {url} = req.body;
    if(!url) return res.status(400).json({msg:"Enter a valid url"});
    try {
        const shortenedId = nanoid(8);
        const result = await urlModel.create({
            shortId:shortenedId,
            redirecturl:url,
            visitHistory:[],
            createdBy: req.body._id
        })
        return res.render("home",{id:shortenedId})
    } catch (error) {
        return res.status(500).json({msg:"Internal server error"})
    }
}

async function handleRedirect(req,res){
    const {shortId} = req.params;
    try{
        const entry = await urlModel.findOneAndUpdate(
        {
            shortId
        },
        {$push:{visitHistory:{timestamp:Date.now()}}},
        {new:true}
        )
        if(!entry) return res.status(400).json({msg:"Invalid shortId"});
        return res.redirect(entry.redirecturl);
   }
   catch (error) {
    return res.status(500).json({msg:"Internal server error"})
   }
}

async function handleAnalytics(req,res){
    const {shortId} = req.params;
    try {
        const result = await urlModel.findOne({shortId});
        if(!result) return res.status(400).json({msg:"Invalid shortId"});
        return res.status(200).json({totalClicks:result.visitHistory.length, analytics:result.visitHistory})
    } catch (error) {
        return res.status(500).json({msg:"Internal server error"})
    }
}

export {handleGenerate, handleRedirect, handleAnalytics}