import { TodoModel } from "../models/Todo"
import { TodoType } from "../types/TodoType";
import express from "express";
import mongoose from "mongoose";

const Todos: mongoose.Model<TodoType> = TodoModel;

export const CreateTask = async (req: express.Request, res: express.Response) => {

    const TodoTitle: string = req.body.TodoTitle;
    const NewTask: string = req.body.NewTask;

    let Todo: any = await Todos.findOne({ TodoTitle });

    Todo.Tasks.push(NewTask);

    await Todo.save();
    // let tempTasks = Todo.Tasks;
    // let Tasks = tempTasks.push(NewTask);

    // let filter = { TodoTitle };
    // let update = { Tasks };

    // await Todos.findOneAndUpdate(filter, update);
}

export const CreateTodo = async (req: express.Request, res: express.Response) => {

    const user: string = req.body.user;
    const todoTitle = req.body.TodoTitle;
    const tasks = req.body.Tasks;

    const newTodo = new Todos({
        user: user,
        TodoTitle: todoTitle,
        Tasks: tasks,
    });

    await newTodo.save();
}

export const DeleteTask = async (req: express.Request, res: express.Response) => {

    const TodoTitle: string = req.body.TodoTitle;
    const Task: string = req.body.Task;

    let Todo: any = await Todos.findOne({ TodoTitle });

    let tempTasks: [string] = Todo.Tasks;

    for (let i = 0; i < tempTasks.length; i++) {
        if (tempTasks[i] === Task) {
            tempTasks.splice(i, 1);
            break;
        }
    }

    Todo.Tasks = tempTasks;
    await Todo.save()

    // let Todo = await Todos.findOne({ TodoTitle });

    // let filter = { TodoTitle };
    // let Tasks;

    // for (let i = 0; i < Todo.Tasks.length; i++) {
    //     if (Todo.Tasks[i] === Task) {
    //         let tempTasks = Todo.Tasks;
    //         tempTasks.splice(i, 1);
    //         Tasks = tempTasks;
    //         break;
    //     }
    // }
    // let update = { Tasks };

    // await Todos.findOneAndUpdate(filter, update);
}

export const DeleteTodo = async (req: express.Request, res: express.Response) => {
    const TodoTitle: string = req.body.TodoTitle;
    await Todos.deleteOne({ TodoTitle });
}

export const GetAllTasksOfATodo = async (req: express.Request, res: express.Response) => {
    const TodoTitle: string = req.body.TodoTitle;
    const Todo: any = await Todos.findOne({ TodoTitle });
    return Todo.Tasks;
}

export const GetAllTodos = async () => {
    let AllTodoObjs = await Todos.find();

    let AllTodos: string[] = [];

    for (let i = 0; i < AllTodoObjs.length; i++) {
        AllTodos.push(AllTodoObjs[i].TodoTitle)
    }

    return AllTodos;
}

