import express from "express";
import {readFile,writeFile} from "fs/promises"
import fs from "fs"
const app = express();

//middleware
app.use(express.urlencoded({extended:false}));
//middlewares
app.use((req,res,next)=>{
    console.log("Hello from Middleware 1");
    return res.end("Your requesrt cant be processed");
})
app.use(express.json())
let user = [];
const loaderFunction = async()=>{
    try{
        const data = await readFile('./MOCK_DATA.json','utf-8')
        const parsed = JSON.parse(data);
        user = parsed;
        console.log("Data loaded successfully");
    }catch(err){
        console.log("Failed to load because::",err)
    }
}
/*
//Sending Raw Data
//all users
app.get('/api/users',(req,res)=>{
    return res.json(user);
})
//user with specific id
app.get('/api/users/:id',(req,res)=>{
    const id = Number(req.params.id);
    const spec = user.find((user)=> user.id === id);
    return res.json(spec);
})
*/
//another method

app.route('/api/users')
  .get((req,res)=>{
    return res.json(user);
})
  .post((req,res)=>{
   const data = req.body;
   const userNew = {...data, id:user.length+1};
   user.push(userNew);
   fs.writeFile("./MOCK_DATA.json",JSON.stringify(user),(err)=>{
     if(err){
         return res.json({status:"faled",message:err})
     }
     return res.json({status:"success",id:userNew.id})
   })
 })

 /*
   Read file, parse, remove, update
 */
.delete(async (req,res)=>{
    try{
        const id = Number(req.query.id);
        const data = await fs.promises.readFile("./MOCK_DATA.json","utf-8")
        let parsed =JSON.parse(data);

        const orgLen = parsed.length;
        parsed = parsed.filter(u=>u.id !== id);

        if(parsed.length == orgLen){
            return res.json({status:"failed",message:"No such user found"})
        }
        await fs.promises.writeFile("./MOCK_DATA.json",JSON.stringify(parsed,null,2))
        user = parsed;
        return res.json({status:"success",deletedID:id})
        
    }catch{
        return res.json({status:"failed"})
    }
})
.put((req,res)=>{
    res.json({status:"Pending"});
    })
///patch

app.patch('/api/users/:id', async (req, res) => {
    const id = Number(req.params.id);
    const updates = req.body;

    console.log("PATCH request received for ID:", id);
    console.log("Update payload:", updates);

    try {
        const file = await readFile("./MOCK_DATA.json", "utf-8");
        const parsed = JSON.parse(file);

        let data = parsed.find(u => u.id === id);
        if (!data) {
            console.log("User not found in parsed");
            return res.json({ status: "Failed", message: "User not found" });
        }

        for (let key in updates) {
            if (data.hasOwnProperty(key)) {
                data[key] = updates[key];
            }
        }

        await writeFile("./MOCK_DATA.json", JSON.stringify(parsed, null, 2));
        console.log("File written successfully");
        
        user = parsed; // update in-memory copy
        return res.json({ status: "success", updated: data });
    } catch (err) {
        console.error("PATCH error:", err);
        return res.json({ status: "Failed", message: err.message });
    }
});

//operation 1::sending html 
app.get('/user',(req,res)=>{
    const html = `
    <ul>
      ${user.map(u=>`<li>${u.first_name}</li>`).join('')}
    </ul>
    `
    return res.send(html);
})
await loaderFunction();
app.listen(5000,()=>{
    console.log("Listening")
}) 