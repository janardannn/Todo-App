export async function CreateTask(Todos, TodoTitle, NewTask) {
    let Todo = await Todos.findOne({ TodoTitle });

    Todo.Tasks.push(NewTask);

    await Todo.save();
    // let tempTasks = Todo.Tasks;
    // let Tasks = tempTasks.push(NewTask);

    // let filter = { TodoTitle };
    // let update = { Tasks };

    // await Todos.findOneAndUpdate(filter, update);
}
