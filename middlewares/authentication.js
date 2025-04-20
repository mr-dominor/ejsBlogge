import { verifyToken } from "../services/authServices.js";

    function checkAuth(token){
        return (req,res,next) =>{
            const userToken = req.cookies["token"];
            if(!userToken) return next();
            try {
                const payload = verifyToken(userToken);
                req.user = payload;
            } catch (error) {}
            return next();
        }
    }


export {checkAuth}