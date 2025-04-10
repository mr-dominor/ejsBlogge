import http from "http";
import fs from "fs";
import url from "url";
const server = http.createServer((req,res)=>{
    if(req.url === "/favicon.ico") return res.end();
    const log = `[${new Date().toISOString()}] ${req.url} ${req.socket.remoteAddress}\n`;
    const myUrl = url.parse(req.url,true)
    fs.appendFile("./input.modules.txt",log,(err)=>{
        if(err) console.error("Failed");
    })
    switch(myUrl.pathname){
        case "/":
            res.end(`Welcome to Mubashshis's spot`)
        break;
        case "/about":
            const user2 = myUrl.query.name
            res.end(`Hello ${user2}`)
        break;
        case "/search":
            const user = myUrl.query.search_here
            res.end(`Here is the result for ${user}`)
        break;
        default:
            res.end("404 Not Found")
    }
})
const PORT = 8002;
server.listen(PORT,()=>{
    console.log(`Listening @ port ${PORT}`);
})