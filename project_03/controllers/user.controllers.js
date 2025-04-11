import { User } from "../models/user.models.js";

async function getAllUsers(req,res){
    try {
        const user = await User.find({});
        return res.send(user);
    } catch (error) {
        return res.status(500).json({msg:"Error occured @ gettingAll"})
    }
}

async function addNewUser(req,res){
    const data = req.body;
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
        });
        console.log(result);
        return res.status(201).json({msg:"Success",user:result});
    } catch (error) {
        return res.status(500).json({msg:"Error occured @ posting"})
    }
}

async function findOne(req,res){
    const id = req.params.id;
    try {
         const user = await User.findById(id);
         if(!user) return res.status(404).json({msg:"None found"})
         return res.send(user);
    } catch (error) {
         return res.status(500).json({msg:"Error occured @ getting by id"})
    }
}

async function delteOne(req,res){
    const id = req.params.id;
    try {
     await User.findByIdAndDelete(id);
     return res.status(200).json({msg:"Success",userId:id});
    } catch (error) {
     return res.status(500).json({msg:"Error occured @ deleting"})
    }
}

async function findUpdate(req,res){
    const id = req.params.id;
    const updates = req.body;
    console.log(updates)
    try {
        const updated = await User.findByIdAndUpdate(id,updates,{new:true, runValidators:true})
        if(!updated) return res.status(400).json({msg:"failure"});
        return res.status(200).json({msg:"success",user:updated});
    } catch (error) {
        return res.status(500).json({msg:"Error occured @ patching"})
    }
}

export {
    getAllUsers,
    addNewUser,
    findOne,
    delteOne,
    findUpdate
}