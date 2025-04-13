import mongoose from "mongoose";

async function makeConnection(url){
    return mongoose.connect(url)
}

export {makeConnection}