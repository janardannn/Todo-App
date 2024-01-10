import { useState } from "react";

export default function TaskItem(props: any) {
    const [status, setStatus] = useState(props.taskStatus);

    function handleDelete() {
        props.taskDelete(props.taskTitle)
    }

    function handleTaskStatus() {
        props.taskStatusHandler(props.taskTitle, !status)
        setStatus(!status);
    }
    return (
        <div className="text-center flex flex-row justify-between w-[500px] h-[75px] border-2 border-slate-300 p-2.5 ml-8 rounded-lg">
            <p className={`m-auto w-3/4 text-center ${status ? 'line-through decoration-4' : ''}`}>{props.taskTitle}</p>
            <button onClick={handleTaskStatus} className="mx-2 border-2 border-slate-300 p-1 w-[50px] h-[50px] shadow shadow-green-200 rounded-lg">✅</button>
            <button onClick={handleDelete} className="mx-2 border-2 border-slate-300 p-1 w-[50px] h-[50px] shadow shadow-slate-200 rounded-lg">🗑️</button>
        </div >
    )
}