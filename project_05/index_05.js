import express from "express";
import { connectTo } from "./connect.js";
import { staticRouter } from "./routes/url.staticRoutes.js";
import { urlRouter } from "./routes/url.routers.js";
import { userRouter } from "./routes/user.routers.js";
import path from "path"
import cookieParser from "cookie-parser";
import { allowWhenLogged } from "./middlewares/user.middlewares.js";

const PORT = 8000;
const mongoUri = "mongodb://127.0.0.1:27017/project_05";
const app = express();

//connection to DB
connectTo(mongoUri).then(()=>{console.log(`Connected to Db`)}).catch((err)=>console.log(err));

//setting middlewares
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cookieParser())

//setting routes for server side rendering
app.set("view engine","ejs")
app.set("views",path.resolve("./views"))

//setting routes
app.use('/url',allowWhenLogged,urlRouter);
app.use('/test',staticRouter);
app.use('/user',userRouter);

app.listen(PORT,()=>{
    console.log(`Listening on ${PORT}`)
});