import { nanoid } from "nanoid";
import { urlShort } from "../models/url.models.js";

async function handleShortId(req,res){
    const urlRecieved = req.body;
    if(!urlRecieved.url/*url because we're sendind url */) return res.status(400).json({msg:"Enter a valid url"});
    const shortenedId = nanoid(8);
    const entry = await urlShort.create({
        shortId : shortenedId,
        redirectUrl: urlRecieved.url,
        visitHistory:[]
    }); 
    return res.status(200).json({id:shortenedId});
}

async function handleRedirect(req,res){
    const {shortId} =  req.params;
    try {
        const entry = await urlShort.findOneAndUpdate(
            {shortId},
            {$push:{visitHistory:{timestamp:Date.now()}}},
            {new:true}
        )
        if(!entry) return res.status(404).json({msg:"Not found"});
        return res.redirect(entry.redirectUrl);
    } catch (error) {
        return res.json("Internal Error");
    }
}

async function handleAnalytics(req,res){
    const {shortId} = req.params;
    try {
        const entry = await urlShort.findOne({shortId});
        if(!entry) return res.status(404).json({msg:"Not found"});
        return res.json({totalClicks:entry.visitHistory.length, analytics:entry.visitHistory});
    } catch (error) {
        return res.status(500).json("Internal Error");
    }

}
export {handleShortId, handleRedirect,handleAnalytics};