import express from "express";
import path from "path";
import { userRouter } from "./routes/user.route.js";
import { blogRouter } from "./routes/blog.route.js";
import cookieParser from "cookie-parser";
import { checkAuth } from "./middlewares/authentication.js";
import { Blog } from "./models/blog.models.js";
import dotenv from 'dotenv';
import mongoose from "mongoose";
dotenv.config();

//constants
const app = express();
const url = process.env.MONGO_URL;
const PORT = process.env.PORT || 5000;

console.log("MONGO_URL loaded:", process.env.MONGO_URL);
console.log("PORT loaded:", process.env.PORT);


//connection
mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected!'))
.catch((err) => console.error('Connection error:', err));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


//middlewares
app.use(express.urlencoded({extended:false}));
app.use(cookieParser());
app.use(checkAuth("token"));
app.use(express.static(path.resolve('./public')));

//view engine setup
app.set("view engine","ejs");
app.set("views",path.resolve("./views"))

//routes
app.get('/',async (req,res)=>{
    const allBlogs = await Blog.find({});
    return res.render("home",{
        user:req.user,
        blogs:allBlogs,
    })
});
app.use('/user',userRouter);
app.use('/blog',blogRouter);

app.listen(PORT,()=>{
    console.log(`Listening on port ${PORT}`);
})