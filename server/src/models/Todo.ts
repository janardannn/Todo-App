import mongoose from "mongoose";
import { TodoType } from "../types/TodoType";

const TodoSchema = new mongoose.Schema<TodoType>({
    user: String,
    TodoTitle: String,
    Tasks: [String]
})

export const TodoModel = mongoose.model<TodoType>("Todos", TodoSchema);

