import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"

import Header from "../components/Header";
import Footer from "../components/Footer";

import TaskItem from "../components/Task";
import AddTask from "../components/AddTask";
import { API_URL } from "../App";
// axios.defaults.headers.post['Content-Type'] = 'application/json';
// axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';

export default function Home() {
    type Task = {
        Task: string,
        isDone: boolean
    }
    const user: string = localStorage.username;
    const TOKEN: string = localStorage.TOKEN;
    axios.defaults.headers.common = { 'Authorization': `Bearer ${TOKEN}` }


    const navigate = useNavigate();

    if (user && TOKEN) {
        const todoTitle: string = `${user}'s todo`;

        const [tasks, setTasks] = useState<Task[]>([]);

        const [TaskItems, setTaskItems] = useState<JSX.Element[]>([]);

        const [appErrStatus, setAppErrStatus] = useState<Boolean>(false);

        const [errorMessage, setErrorMessage] = useState<String>("")

        const handleAuthError = () => {
            localStorage.clear()
            navigate("/sign-in");
        }

        // let TaskItems: ReactElement[] = [];

        useEffect(() => {
            const getAllTasks = async () => {
                let allTasks: Task[] = [];
                try {
                    const tasksData = await axios.get(API_URL + "/todo/get_tasks", {
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

                    // console.log(tasks)

                    // console.log(TaskItems)
                }
                catch (err: any) {
                    console.log(err)
                    setAppErrStatus(true);
                    setErrorMessage(`[${err.response.status}] ${err.response.data.msg} `)
                    setTimeout(() => handleAuthError(), 2357);
                }
            }

            getAllTasks();
        }, [])

        useEffect(() => {
            setTaskItems(() => {
                return (
                    tasks.map(task => <div key={task.Task}>
                        <TaskItem taskTitle={task.Task} taskDelete={handleDeleteTask} taskStatus={task.isDone} taskStatusHandler={handleTaskStatus} handleTaskEdit={handleTaskEdit} />
                    </div>)
                )
            })
        }, [tasks])


        const [newTask, setNewTask] = useState("");

        const handleAddTask = async () => {

            if (newTask.trim() !== "") {
                try {
                    setTasks([...tasks, { Task: newTask, isDone: false }])
                    // console.log(todoTitle, newTask, user)
                    axios.post(API_URL + "/todo/create_task",
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
                catch (err: any) {
                    console.log(err)
                    setAppErrStatus(true);
                    setErrorMessage(`[${err.response.status}] ${err.response.data.msg} `)

                }
            }
        }
        // console.log(NewTask)

        const handleDeleteTask = async (taskTitle: string) => {
            try {
                await axios.delete(API_URL + "/todo/delete_task",
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
            catch (err: any) {
                console.log(err)
                setAppErrStatus(true);
                setErrorMessage(`[${err.response.status}] ${err.response.data.msg} `)

            }
        }

        const handleTaskStatus = async (taskTitle: string, taskStatus: boolean) => {
            try {
                await axios.post(API_URL + "/todo/task_status",
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
            catch (err: any) {
                console.log(err)
                setAppErrStatus(true);
                setErrorMessage(`[${err.response.status}] ${err.response.data.msg} `)

            }
        }

        const handleTaskEdit = async (taskTitle: string, newTitle: string) => {
            try {
                await axios.post(API_URL + "/todo/task_edit",
                    {
                        user: user,
                        TodoTitle: todoTitle,
                        Task: taskTitle,
                        NewTitle: newTitle,
                    }, {
                    headers: { 'Content-Type': 'application/json' }
                })
                setTasks((tasks) => {
                    return (
                        tasks.map(task => task.Task === taskTitle ? { ...task, Task: newTitle } : task)
                    )
                })
            }
            catch (err: any) {
                console.log(err)
                setAppErrStatus(true);
                setErrorMessage(`[${err.response.status}] ${err.response.data.msg} `)

            }
        }

        return (
            <div>
                <Header username={user} />
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
                {<div className={`mt-[1.5rem] mb-[1.2rem] text-center ${appErrStatus ? "text-red-600" : ""}`}>{appErrStatus ? "!!! " + errorMessage : ""}</div>}
                <Footer />
            </div >
        )
    }

    else {
        useEffect(() => {
            navigate("/sign-in")
        })
    }
}