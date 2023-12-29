import Header from "./components/Header";
import Footer from "./components/Footer"
import Navbar from "./components/Navbar.tsx";
import TaskItem from "./components/Task.tsx"
import AddTask from "./components/AddTask.tsx"
import { useEffect, useState } from "react";
import axios from "axios";


axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';


export default function App() {
  const [TaskItems, setTaskItems] = useState([])

  // const [Todos, setTodos] = useState([]);
  // const [Tasks, setTasks] = useState([]);

  // useEffect(() => {
  //   const getAllTodos = async () => {
  //     const data = await axios.get("http://localhost:7777/todo/get_todos", {
  //       headers: { 'Content-Type': 'application/json' },
  //       data: { user: "janardan" }
  //     })
  //   }
  //   getAllTodos();

  // }, [])

  return (
    <>
      <Header />
      <div className="flex justify-center">
        <div className="flex flex-row mx-28">
          <Navbar />
          <div className="flex flex-col">
            {...TaskItems}
            <AddTask state={TaskItems} add_to_state={setTaskItems} />
          </div>
        </div>
      </div>
      <Footer />
    </>

  )
}