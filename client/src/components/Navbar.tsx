import { useState } from "react";
import NavbarItem from "./NavbarItem";

export default function TaskNavbar() {

    const Todos: String[] = ["todo1", "Todo2", "Todo3"];
    const [NavTodos, setNavTodos] = useState(() => {
        let JSXTodos = [];
        for (let i = 0; i < Todos.length; i++) {
            JSXTodos.push(<NavbarItem todoTitle={Todos[i]} />)
        }
        return JSXTodos;
    })

    return (
        <div className="w-[280px] mr-8">
            {...NavTodos}
        </div>
    )
}