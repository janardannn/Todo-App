import taskStore from "./store/TaskStore";

const getTasks = taskStore(state => state.getAllTasks);

(async () => {
    await getTasks();
})();