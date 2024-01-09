export default function TaskItem(props: any) {
    function handleDelete() {
        props.taskDelete(props.taskTitle)
    }
    return (
        <div className="text-center flex flex-row justify-between w-[500px] h-[75px] border-2 border-slate-300 p-2.5 ml-8 rounded-lg">
            <p className="w-3/4 text-center">{props.taskTitle}</p>
            <button onClick={props.taskComplete} className="mx-2 border-2 border-slate-300 p-1 w-[50px] h-[50px] shadow shadow-green-200 rounded-lg">✅</button>
            <button onClick={handleDelete} className="mx-2 border-2 border-slate-300 p-1 w-[50px] h-[50px] shadow shadow-slate-200 rounded-lg">🗑️</button>
        </div >
    )
}