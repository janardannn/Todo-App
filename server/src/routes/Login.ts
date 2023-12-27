import * as jwt from "jsonwebtoken";

export function LoginUser(res, Users, username, hashedPassword, JWT_SECRET) {
    console.log("Logging in user: " + username)

    async function getUserFromDB() {
        let user = await Users.findOne({ username }).exec();
        if (user !== undefined) {
            // console.log("here")
            // console.log(user);
            return user;
        }
        else {
            res.status(404).json({
                msg: "User not found!"
            })
        }
    }
    getUserFromDB().then(user => {
        if (user !== null && (user.username === username && user.hashedPassword === hashedPassword)) {
            const token = jwt.sign(username, JWT_SECRET);
            res.json({
                msg: "User login successfull!",
                accessToken: token
            })
            console.log("Logged in successfully!")
        }
        else {
            console.log("Login failed!")
            res.status(403).json({
                msg: "Invalid credentials!"
            })
        }
    })
}