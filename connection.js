import mongoose from "mongoose";

async function connectTo(url){
    return mongoose.connect(url);
}

export {connectTo};