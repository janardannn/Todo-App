import { useEffect, useState } from "react";
import TodoItem from "./Todo";
import AddTodo from "./AddTodo";

export default function TaskNavbar(props: any) {

    // const Todos: String[] = ["St"];
    const [Todos, setTodos] = useState([]);

    const [NewTodo, setNewTodo] = useState("");

    // const [NavTodos, setNavTodos] = useState(() => {
    //     let JSXTodos = [];
    //     for (let i = 0; i < Todos.length; i++) {
    //         JSXTodos.push(<TodoItem todoTitle={Todos[i]} />)
    //     }
    //     return JSXTodos;
    // })


    return (
        <div className="w-[280px] mr-8">
            {...Todos}
            <AddTodo state={Todos} add_to_state={setTodos} />


            {/* <input onChange={e => setNewTodo(e.target.value)} className="input-todo w-3/4 text-center shadow shadow-slate-300 rounded" type="text" placeholder="Enter todo ..."></input>
            <button onClick={
                () => {
                    setTodos((prevState) => {
                        return ([
                            ...Todos,
                            <TodoItem todoTitle={NewTodo} />
                        ])
                    })
                }
            } className="mx-2 border-2 border-slate-300 p-1 w-[50px] h-[50px] shadow shadow-green-200 rounded-lg">✅</button> */}

        </div>
    )
}