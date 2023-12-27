import { UserModel } from "../models/User";
import { UserType } from "../types/UserType";
import md5 from "md5";
import * as jwt from "jsonwebtoken";
import express from "express";

const JWT_SECRET = process.env.JWT_SECRET;

const Users = UserModel;

const GetAllUsers = async (req: express.Request, res: express.Response) => {
    const AllUserObjs = await Users.find();

    let AllUsers: string[] = [];

    for (let i = 0; i < AllUserObjs.length; i++) {
        AllUsers.push(AllUserObjs[i].username);
    }

    return AllUsers;
}

export const RegisterUser = (req: express.Request, res: express.Response, next: express.NextFunction) => {

    const username: string = req.header['username'] as string;
    const password: string = req.header['password'] as string;

    const hashedPassword = md5(password);
    //check  if user already exists
    console.log("Registering user: " + username)
    const user = new Users({
        username,
        hashedPassword,
    });

    let saveUser = async function () {
        await user.save();
    }
    saveUser();

    res.status(200).json({
        msg: "User registration successfull!"
    })

    console.log("Registration successfull!");
}

export function LoginUser(req, res, next, Users, JWT_SECRET) {

    const username: string = req.header['username'] as string;
    const password: string = req.header['password'] as string;

    const hashedPassword = md5(password);

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


