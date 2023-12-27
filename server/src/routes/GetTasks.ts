export async function GetAllTasksOfATodo(Todos, TodoTitle) {
    const AllTasks = await Todos.findOne({ TodoTitle });
    return AllTasks.Tasks;
}

