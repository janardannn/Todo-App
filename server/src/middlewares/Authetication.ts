import jwt from "jsonwebtoken";

export const AuthenticateUser = (req: any, res: any, next: any) => {

    const username: string = req.body.user || req.query.user;
    const authHeader: string = req.headers.authorization;
    const JWT_SECRET: string = process.env.JWT_SECRET!;

    // console.log("in auth middleware")
    // console.log(username, TOKEN)

    if (username && authHeader) {
        const TOKEN: string = authHeader.split(" ")[1]

        // console.log(TOKEN)
        // console.log(jwt.verify(TOKEN, JWT_SECRET))

        if (TOKEN) {
            const decode = jwt.verify(TOKEN, JWT_SECRET);
            if (decode === username) {
                next()
            }
        }
    }
    else {
        console.log("User authentication failed")
        res.status(403).json({
            msg: "Authentication failed!"
        })
    }
}

