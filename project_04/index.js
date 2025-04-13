import express from "express";
import {makeConnection} from "./connection.js"
import {router} from "./routes/url.routers.js"

//Constants
const app = express();
const PORT = 8000;
const mongoUri = "mongodb://127.0.0.1:27017/project_04";

//Connection to Db
makeConnection(mongoUri).then(()=>console.log("Mongo successfully connected")).catch((err)=>{console.log("Error in connection",err)});


//middlewares
app.use(express.json())

//routing
app.use("/url",router)

app.listen(PORT,()=>{
    console.log(`Listening on ${PORT}`);
})