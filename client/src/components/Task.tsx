import React, { useState } from "react";

export default function TaskItem(props: any) {
    const [status, setStatus] = useState(props.taskStatus);

    const [editTask, setEditTask] = useState<boolean>(false)

    const [task, setTask] = useState<string>("");

    function handleDelete() {
        props.taskDelete(props.taskTitle)
    }

    function handleTaskStatus() {
        props.taskStatusHandler(props.taskTitle, !status)
        setStatus(!status);
    }

    function handleTaskEdit() {
        setEditTask(true);
        setTask(props.taskTitle);
    }

    function handleTaskEditChange(e: React.ChangeEvent<HTMLInputElement>) {
        setTask(e.target.value)
    }

    async function handleTaskEditButton() {
        await props.handleTaskEdit(props.taskTitle, task)
        setEditTask(false);
    }

    return (
        <div className="text-center flex flex-row justify-between w-[650px] h-fit border-2 border-slate-300 p-2.5 ml-8 rounded-lg">
            {
                editTask ?
                    <input onChange={e => handleTaskEditChange(e)} value={task} onKeyDown={e => { if (e.key === "Enter") handleTaskEditButton() }} className={`text-pretty whitespace-normal break-all m-auto w-3/4 text-center ${status ? 'line-through decoration-4' : ''}`}></input>
                    :
                    <p className={`text-pretty whitespace-normal break-all m-auto w-3/4 text-center ${status ? 'line-through decoration-4' : ''}`}>{props.taskTitle}</p>
            }

            {
                editTask ?
                    <button onClick={handleTaskEditButton} onKeyDown={e => { if (e.key === "Enter") handleTaskEditButton() }} className="mx-2 m-auto border-2 border-slate-300 p-1 w-[50px] h-[50px] shadow shadow-green-200 rounded-lg">✅</button>

                    :
                    <>
                        <button onClick={handleTaskEdit} className="mx-2 m-auto border-2 border-slate-300 p-1 w-[50px] h-[50px] shadow shadow-green-200 rounded-lg">🖋️</button>
                        <button onClick={handleTaskStatus} className="mx-2 m-auto border-2 border-slate-300 p-1 w-[50px] h-[50px] shadow shadow-green-200 rounded-lg">✅</button>
                        <button onClick={handleDelete} className="mx-2 m-auto border-2 border-slate-300 p-1 w-[50px] h-[50px] shadow shadow-slate-200 rounded-lg">🗑️</button>
                    </>
            }
        </div >
    )
}