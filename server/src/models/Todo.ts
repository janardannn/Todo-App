export function GetTodoModel(mongooseInstance) {
    const TodoSchema = new mongooseInstance.Schema({
        user: String,
        TodoTitle: String,
        Tasks: [String]
    })

    const Todos = mongooseInstance.model("Todos", TodoSchema);
    return Todos;
}
