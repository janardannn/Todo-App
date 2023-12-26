import Header from "./components/Header";
import Footer from "./components/Footer"
import Navbar from "./components/Navbar.tsx";
import TaskItem from "./components/TaskItem.tsx"
import AddTask from "./components/AddTask.tsx"
import { useState } from "react";

export default function App() {
  const [TaskItems, setTaskItems] = useState([
    <TaskItem taskTitle="Task 1 " />,
    <TaskItem taskTitle="Task 2 " />,
    <TaskItem taskTitle="Task 3 " />,
    <TaskItem taskTitle="Task 4 " />,
  ])
  return (
    <>
      <Header />
      <div className="flex justify-center">
        <div className="flex flex-row mx-28">
          <Navbar />
          <div className="flex flex-col">
            {...TaskItems}
            <AddTask />
          </div>
        </div>
      </div>
      <Footer />
    </>

  )
}