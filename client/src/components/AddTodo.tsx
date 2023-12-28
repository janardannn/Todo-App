import React from "react"

export default function AddTodo(props: any) {
    return (
        <div className="border-2 p-3 text-center w-[278px] flex flex-row justify-between h-[75px] rounded-xl">
            <input className="w-3/4 text-center shadow shadow-slate-300 rounded" type="text" placeholder="Enter todo ..."></input>
            <button className="mx-2 border-2 border-slate-300 p-1 w-[50px] h-[50px] shadow shadow-green-200 rounded-lg" onClick={props.AddNewTask}>✅</button>
        </div>
    )
}