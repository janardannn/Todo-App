import { CreateTask, CreateTodo, DeleteTask, DeleteTodo, GetAllTasksOfATodo, GetAllTodos } from "../controllers/Todo"
import express from "express";

const router = express.Router();

router.post("/create_task", CreateTask);
router.post("/create_todo", CreateTodo);

router.delete("/delete_task", DeleteTask);
router.delete("/delete_todo", DeleteTodo);

router.get("/get_tasks", GetAllTasksOfATodo);
router.get("/get_todos", GetAllTodos);

module.exports = router;