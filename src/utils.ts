
import {FilterValuesType} from "./App.tsx";
import {TaskType} from "./types.ts";

export const getFilteredTasks = (tasks: TaskType[], filter: FilterValuesType): TaskType[] =>{
    // let filteredTasks: TaskType[] = tasks
    // if(filter === "active"){
    //     filteredTasks = tasks.filter(t => t.isDone === false)
    // }
    //
    // if(filter === "completed"){
    //     filteredTasks = tasks.filter(t => t.isDone === true)
    // }

    switch (filter) {
        case "active":
            return tasks.filter(t => !t.isDone)
        case "completed":
            return tasks.filter(t => t.isDone)
        default:
            return tasks;

    }

}