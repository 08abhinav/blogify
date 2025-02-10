import { validateToken } from "../services/authentication.js";

export function checkForAuthentication(cookieName){
    return (req, res, next) => {
        const tokenCookieValue = req.cookies[cookieName]; 
        // console.log("Token in Cookies:", tokenCookieValue); 

        if (!tokenCookieValue) {
            // console.log("No token found, moving to next middleware");
            return next(); 
        }

        try {
            const userPayload = validateToken(tokenCookieValue);
            req.user = userPayload;
        } catch (error) {
            console.log("Invalid token:", error.message);
        }

        return next();
    };
}
