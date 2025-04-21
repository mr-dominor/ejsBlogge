import express from "express";
import path from "path";
import { userRouter } from "./routes/user.route.js";
import { blogRouter } from "./routes/blog.route.js";
import { connectTo } from "./connection.js";
import cookieParser from "cookie-parser";
import { checkAuth } from "./middlewares/authentication.js";

//constants
const app = express();
const PORT = 8000;
const url =  'mongodb://127.0.0.1:27017/blognew'

//connection
connectTo(url).then(()=>console.log("Connected to MongoDb")).catch((err)=>console.log("Problem in connection::",err));

//middlewares
app.use(express.urlencoded({extended:false}));
app.use(cookieParser());
app.use(checkAuth("token"));

//view engine setup
app.set("view engine","ejs");
app.set("views",path.resolve("./views"))

//routes
app.get('/',(req,res)=>{
    return res.render("home",{
        user:req.user
    })
});
app.use('/user',userRouter);
app.use('/blog',blogRouter);

app.listen(PORT,()=>{
    console.log(`Listening on port ${PORT}`);
})