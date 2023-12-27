import jwt from "jsonwebtoken";
import type { JwtPayload, Secret } from "jsonwebtoken";

export function AuthenticateUser(req: any, res: any, next: any) {

    const username: string = req.headers.username;
    const token: string = req.headers.auth;
    const JWT_SECRET: Secret = process.env.JWT_SECRET!;

    if (token) {
        const decode: JwtPayload | string = jwt.verify(token, JWT_SECRET);
        if (decode === username) {
            next()
        }
    }
    else {
        res.status(403).json({
            msg: "Authentication failed!"
        })
    }
}

