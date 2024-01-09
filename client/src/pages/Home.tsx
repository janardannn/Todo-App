import React, { useState, useEffect, ReactElement } from "react";
import axios from "axios";

import Header from "../components/Header";
import Footer from "../components/Footer";

import TaskItem from "../components/Task";
import AddTask from "../components/AddTask";
// axios.defaults.headers.post['Content-Type'] = 'application/json';
// axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';

export default function Home() {
    type Task = {
        Task: string,
        isDone: boolean
    }
    const user: string = "janardan";
    const todoTitle: string = "current-app-use";

    const [tasks, setTasks] = useState<Task[]>([]);

    const [TaskItems, setTaskItems] = useState([]);

    // let TaskItems: ReactElement[] = [];

    useEffect(() => {
        const getAllTasks = async () => {
            let allTasks: Task[] = [];
            try {
                const tasksData = await axios.get("http://localhost:7777/todo/get_tasks", {
                    headers: { 'Content-Type': 'application/json' },
                    params: { user: user, TodoTitle: todoTitle }
                })

                //?user=janardan&TodoTitle=Today 
                for (let i = 0; i < tasksData.data.Tasks.length; i++) {
                    let task = {
                        Task: tasksData.data.Tasks[i].Task,
                        isDone: tasksData.data.Tasks[i].isDone
                    }
                    allTasks.push(task);
                }
                setTasks(allTasks);

                // for (let i = 0; i < tasks.length; i++) {
                //     let element = (
                //         <div className="text-center flex flex-row justify-between w-[500px] h-[75px] border-2 border-slate-300 p-2.5 ml-8 rounded-lg">
                //             <TaskItem taskTitle={tasks[i].Task} />
                //         </div>
                //     )
                //     setTaskItems({ ...TaskItems, element })
                // }

                // setTaskItems(() => {
                //     return (
                //         tasks.map(task => <div key={task.Task}><TaskItem taskTitle={task.Task} /></div>)
                //     )
                // })

                console.log(tasks)

                console.log(TaskItems)
            }
            catch (err) {
                console.log(err)
            }
        }

        getAllTasks();
    }, [])

    useEffect(() => {
        setTaskItems(() => {
            return (
                tasks.map(task => <div key={task.Task}>
                    <TaskItem taskTitle={task.Task} taskDelete={handleDeleteTask} taskStatus={task.isDone} taskStatusHandler={handleTaskStatus} />
                </div>)
            )
        })
    }, [tasks])


    const [newTask, setNewTask] = useState("");

    const handleAddTask = async () => {


        if (newTask.trim() !== "") {
            setTasks([...tasks, { Task: newTask, isDone: false }])
            // console.log(todoTitle, newTask, user)
            axios.post("http://localhost:7777/todo/create_task",
                {
                    TodoTitle: todoTitle,
                    Task: newTask,
                    user: user,
                    isDone: false
                },
                {
                    headers: { 'Content-Type': 'application/json' }
                })
            setNewTask("");
        }
    }
    // console.log(NewTask)

    const handleDeleteTask = async (taskTitle: string) => {
        await axios.delete("http://localhost:7777/todo/delete_task",
            {
                data: {
                    TodoTitle: todoTitle,
                    Task: taskTitle,
                    user: user
                },
                headers: { 'Content-Type': 'application/json' }
            })
        setTasks(tasks.filter(task => task.Task !== taskTitle))
    }

    const handleTaskStatus = async (taskTitle: string, taskStatus: boolean) => {
        await axios.post("http://localhost:7777/todo/task_status",
            {
                TodoTitle: todoTitle,
                Task: taskTitle,
                user: user,
                isDone: taskStatus
            }, {
            headers: { 'Content-Type': 'application/json' }
        })
        setTasks((tasks) => {
            return (
                tasks.map(task => task.Task === taskTitle ? { ...task, isDone: taskStatus } : task)
            )
        })
    }

    return (
        <div>
            <Header />
            {/* {tasks.map(task => {
                <TaskItem taskTitle={}/>
            })} */}
            <div className="flex flex-row justify-center">
                <div className="flex flex-col">
                    {TaskItems}
                    <div className="my-[12px]" />
                    <AddTask state={newTask} setState={setNewTask} button={handleAddTask}></AddTask>
                </div>
            </div>
            <Footer />
        </div >
    )
}