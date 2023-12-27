export async function DeleteTodo(Todos, TodoTitle: string) {
    await Todos.deleteOne({ TodoTitle });
}
