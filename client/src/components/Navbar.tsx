import { useState } from "react";
import TodoItem from "./Todo";
import AddTodo from "./AddTodo";

export default function TaskNavbar() {

    const Todos: String[] = ["Todo 1", "Todo 2", "Todo 3"];
    const [NavTodos, setNavTodos] = useState(() => {
        let JSXTodos = [];
        for (let i = 0; i < Todos.length; i++) {
            JSXTodos.push(<TodoItem todoTitle={Todos[i]} />)
        }
        return JSXTodos;
    })

    return (
        <div className="w-[280px] mr-8">
            {...NavTodos}
            <AddTodo />
        </div>
    )
}