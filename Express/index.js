import express from "express";
const app = express();
app.get('/',(req,res)=>{
    res.send("Hello");
})
app.get('/about',(req,res)=>{
    res.send(`Welcome aboard mr ${req.query.name} you're monthly pay is ${req.query.sal}`)
})
app.listen(8000,()=>console.log("listening"))