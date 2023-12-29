import { useState } from "react";
import TaskItem from "./Task"

export default function AddTask(props: any) {

    const [NewTask, setNewTask] = useState("");

    return (
        <div className="text-center flex flex-row justify-between w-[500px] h-[75px] border-2 border-slate-200 p-2.5 ml-8 rounded-lg">
            <input onChange={e => setNewTask(e.target.value)} className="w-3/4 text-center shadow shadow-slate-300 rounded" type="text" placeholder="Enter task ..."></input>
            <button className="mx-2 border-2 border-slate-300 p-1 w-[50px] h-[50px] shadow shadow-green-200 rounded-lg" onClick={
                () => {
                    props.add_to_state((prevState = props.state) => {
                        return ([
                            ...prevState,
                            <TaskItem taskTitle={NewTask} />
                        ])
                    })
                }
            }>✅</button>
        </div>
    )
}