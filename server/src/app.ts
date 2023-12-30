require('dotenv').config();
import express from "express";

const cors = require("cors");
const mongoose = require("mongoose");

import { AuthenticateUser } from "./middlewares/Authetication";
import { CheckIfUserExists } from "./middlewares/CheckIfUserExists";
import { LogUserActivity } from "./middlewares/Logging";

import { TodoModel } from "./models/Todo";
import { UserModel } from "./models/User"

const TodoRoute = require('./routes/Todo')

// ALL constants from .env file
const PORT = process.env.PORT || 7777;
const JWT_SECRET = process.env.JWT_SECRET;
const MONGODB_URL = process.env.MONGODB_URL;

// Initialize all
const app = express();

app.use(cors());
app.use(express.json());
app.use(LogUserActivity);

try {
    mongoose.connect(MONGODB_URL);
    console.log("MongoDB connection successfull!")
}
catch (err) {
    console.log(err);
    throw new Error("MongoDB connection failed!")
}

const Todos = TodoModel;
const Users = UserModel;

// app.post("/register",)
// let Todo = new Todos({
//     user: "janardan",
//     TodoTitle: "todo 1",
//     Tasks: ["task 1", "task 2", "task 3"]
// })

// Todos.save();

app.use("/todo", TodoRoute);

app.listen(PORT, () => {
    console.log("server is running")
});