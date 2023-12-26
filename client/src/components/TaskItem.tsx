import React from "react";

export default function TaskItem(props: any) {
    return (
        <div className="text-center flex flex-row justify-between w-[500px] h-[75px] border-2 border-slate-300 p-2.5">
            <p className="w-3/4 text-center">{props.taskTitle}</p>
            <button onClick={props.taskEdit} className="mx-2 border-2 border-slate-300 p-1 w-[50px] h-[50px] shadow shadow-orange-200">✏️</button>
            <button onClick={props.taskComplete} className="mx-2 border-2 border-slate-300 p-1 w-[50px] h-[50px] shadow shadow-green-200">✅</button>
            <button onClick={props.taskDelete} className="mx-2 border-2 border-slate-300 p-1 w-[50px] h-[50px] shadow shadow-slate-200">🗑️</button>
        </div >
    )
}