import './App.css'
import {Todolist} from "./Todolist.tsx";
import React, {useRef, useState} from 'react';
import {getFilteredTasks} from "./utils.ts";
import {v1} from 'uuid'
import {TaskType} from "./types.ts";

export type FilterValuesType = "all"| "active"| "completed"
function App() {
    const storageForCountCreatedTasks = useRef<number>(3)
    //Data
    const todolistTitle: string = "What to learn"
    const [tasks, setTasks] = React.useState<TaskType[]>([
        {id: v1(), title: 'HTML&CSS', isDone: true},
        {id: v1(), title: 'JS', isDone: true},
        {id: v1(), title: 'ReactJS', isDone: false},
    ])
    const deleteTask = (tasksId: TaskType["id"]) => {
        const nextStateOfData: TaskType[] = tasks.filter(t => t.id !== tasksId)
        setTasks(nextStateOfData)
    }
    const createTask = (title: TaskType["title"]) => {
        const newTask: TaskType = {
            id: v1(),
            title: title,
            isDone: false
        }
        const nextStateOfData: TaskType[] = [...tasks, newTask]
        setTasks(nextStateOfData)
        storageForCountCreatedTasks.current += 1
    }



    const [filter, setFilter] = useState<FilterValuesType>("all")
    const changeTodolistFilter = (newFilterValue: FilterValuesType) => {
        setFilter(newFilterValue)
    }
    //
    return (
        <div className="app">
            <Todolist
                totalTaskCount={storageForCountCreatedTasks.current}
                title={todolistTitle}
                tasks={getFilteredTasks(tasks, filter)}
                deleteTask={deleteTask}
                changeTodolistFilter={changeTodolistFilter}
                createTask={createTask}
            />
        </div>

    )
}

export default App
