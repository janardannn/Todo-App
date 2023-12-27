export async function CreateTodo(Todos, user, todoTitle, tasks) {
    const newTodo = new Todos({
        user: user,
        TodoTitle: todoTitle,
        Tasks: tasks,
    });
    await newTodo.save();
}
