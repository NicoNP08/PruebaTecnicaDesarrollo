import jwt from 'jsonwebtoken'
import User from '../models/user.model.js'
import { TOKEN_SECRET } from "../config.js";

export const authRequired = async (req, res, next) => {
        try {
            let token = req.cookies.token || req.headers.authorization?.split(" ")[1];
    
            if (!token) {
                console.log("No token provided");
                return res.status(401).json({ message: "No token, authorization denied" });
            }
    
            const decoded = jwt.verify(token, TOKEN_SECRET);
            const user = await User.findById(decoded.id);

            if (!user) {
                console.log(" Usuario no encontrado en la base de datos");
                return res.status(404).json({ message: "User not found" });
            }
    
            req.user = user;
            next();
        } catch (error) {
            console.log("JWT Error:", error.message);
            return res.status(403).json({ message: "Invalid token" });
        }
    
}