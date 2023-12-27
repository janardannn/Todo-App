export async function GetAllTodos(Todos: any) {
    let AllTodoObjs = await Todos.find();

    let AllTodos: string[] = [];

    for (let i = 0; i < AllTodoObjs.length; i++) {
        AllTodos.push(AllTodoObjs[i].TodoTitle)
    }

    return AllTodos;
}

