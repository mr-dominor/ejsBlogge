import http from "http";
import fs from "fs";
import url from "url";
const server = http.createServer((req,res)=>{
    if(req.url === "/favicon.ico") return res.end();
    //creeating log
    const log = `[${new Date().toISOString()}] ${req.url} ${req.socket.remoteAddress}\n`
    //parsing with a tool
    const myUrl = url.parse(req.url, true);
    console.log(myUrl)
    //appending to the log file
    fs.appendFile("./input.txt",log,(err)=>{
        if(err){
            console.error("Failed");
        }
    });
    //deciding response end on client side
    switch(myUrl.pathname){ //or req.url
        case "/":
            res.end("Welcome to HomePage");
        break;
        case "/about":
            const user = myUrl.query.name;
            res.end(`Hello, ${user}`)
        break;
        case "/search":
            const search = myUrl.query.search_here
            res.end(`Here are your search results ${search}`)
        break;
        default:
            res.end("404 Not End");
    }
})
const PORT = 8001
server.listen(PORT,()=>console.log(`Listening @ port::${PORT}`))