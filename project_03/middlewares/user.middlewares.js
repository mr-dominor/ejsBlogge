import fs from "fs";

function logEntry(filename){
    return (req,res,next) => {
        const entry = `\n${Date.now} ${req.ip} ${req.method} ${req.path}`
        fs.appendFile(filename,entry,(data,err) => {
            next();
        })
    }
}

export {logEntry};