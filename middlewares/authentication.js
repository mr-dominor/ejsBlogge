import { verifyToken } from "../services/authServices.js";

function checkAuth(tokenKey = "token") {
    return (req, res, next) => {
        const userToken = req.cookies[tokenKey];
        if (!userToken) return next();

        try {
            const payload = verifyToken(userToken);
            req.user = payload;
        } catch (error) {
            // Optional: handle error
        }

        return next();
    };
}

export { checkAuth };
