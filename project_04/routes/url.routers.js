import express from "express";
import {handleShortId, handleRedirect, handleAnalytics} from "../controllers/url.controllers.js"

const router = express.Router();

router.route('/')
    .post(handleShortId);

router.get('/:shortId',handleRedirect);

router.get('/analytics/:shortId',handleAnalytics)
export {router}