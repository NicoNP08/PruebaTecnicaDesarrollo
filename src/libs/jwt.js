import { TOKEN_SECRET } from "../config.js";
import jwt from "jsonwebtoken";
export function createAccessToken(payload){
    return new Promise((resolve, rejetc) => {
        jwt.sign(
            payload, 
            TOKEN_SECRET,
            {
                expiresIn: '1d'
            },
            (err, token)=>{
                if(err) rejetc(err)
                resolve(token)
            }
        )
    })
}