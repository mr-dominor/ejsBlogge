import express from "express"
import { handleAnalytics, handleGenerate,handleRedirect } from "../controllers/url.controllers.js";

const urlRouter = express.Router();

//posting url to get shortID
urlRouter.post('/',handleGenerate)

//getting redirectUrl
urlRouter.get('/:shortId',handleRedirect)

//analytics
urlRouter.get('/analytics/:shortId',handleAnalytics)

export {urlRouter};