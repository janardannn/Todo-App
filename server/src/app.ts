require("dotenv").config();
import express from "express";
import mongoose from "mongoose";

import { AuthenticateUser } from "./middlewares/Authetication";
import { CheckIfUserExists } from "./middlewares/CheckIfUserExists";
import { LogUserActivity } from "./middlewares/Logging";

import { GetTodoModel } from "./models/Todo";
import { GetUserModel } from "./models/User"

import { CreateTask } from "./routes/CreateTask";
import { CreateTodo } from "./routes/CreateTodo";
import { DeleteTask } from "./routes/DeleteTask";
import { DeleteTodo } from "./routes/DeleteTodo";
import { GetAllTasksOfATodo } from "./routes/GetTasks";
import { GetAllTodos } from "./routes/GetTodos";

const app = express();


const PORT = process.env.PORT || 7777;
const JWT_SECRET = process.env.JWT_SECRET;


app.listen(PORT);