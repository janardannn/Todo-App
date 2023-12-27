export async function DeleteTask(Todos, TodoTitle, Task) {
    let Todo = await Todos.findOne({ TodoTitle });

    let tempTasks = Todo.Tasks;

    for (let i = 0; i < tempTasks.length; i++) {
        if (tempTasks[i] === Task) {
            tempTasks.splice(i, 1);
            break;
        }
    }

    Todo.Tasks = tempTasks;
    await Todo.save()

    // let Todo = await Todos.findOne({ TodoTitle });

    // let filter = { TodoTitle };
    // let Tasks;

    // for (let i = 0; i < Todo.Tasks.length; i++) {
    //     if (Todo.Tasks[i] === Task) {
    //         let tempTasks = Todo.Tasks;
    //         tempTasks.splice(i, 1);
    //         Tasks = tempTasks;
    //         break;
    //     }
    // }
    // let update = { Tasks };

    // await Todos.findOneAndUpdate(filter, update);
}

