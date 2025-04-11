import express from "express";
import { connectDB } from "./connection.js";
import { router } from "./routes/user.routers.js";
import {logEntry} from "./middlewares/user.middlewares.js"
const app = express();

//constants
const PORT = 8000
const url = "mongodb://127.0.0.1:27017/project_02";

//connection
connectDB(url).then(()=>console.log("MongoDB connected")).catch((err)=>console.error("Error in DB connection::",err))

//middleware
app.use(express.json())
app.use(express.urlencoded({extended:false}));
app.use(logEntry("log.txt"));

//routing
app.use("/user",router)
app.listen(PORT,()=>{
    console.log(`Listening at port ${PORT}`)
})