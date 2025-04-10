import express from "express";
import mongoose from "mongoose";

const app = express();
app.use(express.json());
//connection
mongoose.connect("mongodb://127.0.0.1:27017/project_02")
.then(()=>console.log("MongoDB connected"))
.catch((err)=>console.log("Error::"))

//Schema
const schema = new mongoose.Schema({
    first_name:{
        type:String,
        required:true,
    },
    last_name:{
        type:String,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    gender:{
        type:String,
        required:true,
    },
    job:{
        type:String,
        required:true,
    },
},{timestamps:true});

//schema modelling
const User = mongoose.model("user",schema)

app.route('/api/users')
   .get(async (req,res)=>{
        try {
            const result = await User.find({})
            const html = `<ul>${result.map(u=>`<li>${u.first_name} - ${u.email}</li>`)}</ul>`
            return res.send(html)
        } catch (error) {
            return res.status(500).json({message:"error occured"})
        }
   })
   .post(async (req,res)=>{
    let data = req.body;
    if(!data.first_name || !data.email || !data.gender || !data.job){
        return res.status(400).json({message:"Everything is needed"});
    }
    try {
        const result = await User.create({
            first_name:data.first_name,
            last_name:data.last_name,
            email:data.email,
            gender:data.gender,
            job:data.job,
        })
        console.log(result);
        return res.status(201).json({msg:"Success"})
    } catch (error) {
        console.log(error)
       return res.status(404).json({msg:"Something went wrong"})
    }
    
   })

app.route('/api/users/:id')
   .get(async (req,res)=>{
    const user = await User.findById(req.params.id);
    if(!user) return res.status(404).json({msg:"Failure"});
    return res.send(user)
   })
   .patch(async (req,res)=>{
    const id = req.params.id;
    const update = req.body;

    try {
        const updated = await User.findByIdAndUpdate(id,update,{new:true, runValidators:true});
        if(!updated) return res.status(400).json({msg:"failure"});
        return res.status(200).json({msg:"success",user:updated});
    } catch (error) {
        return res.status(500).json({msg:"internal error"});
    }
   })
   .delete(async (req,res)=>{
    const id = req.body;
    try {
        await User.findByIdAndDelete(id);
        return res.status(200).json({msg:"Success",userId:id});
    } catch (error) {
        return res.status(500).json({msg:"internal error"});
    }
   })
app.listen(8000,()=>{
    console.log("Listening")
})