import {Button} from "./Button.tsx";
import {FilterValuesType} from "./App.tsx";
import {TaskType} from "./types.ts";
import {useRef, useState} from "react";


type PropsType = {
    totalTaskCount: number
    title: string
    tasks: TaskType[]
    filter: FilterValuesType
    deleteTask: (tasksId: TaskType["id"]) => void
    changeTodolistFilter: (newFilterValue: FilterValuesType) => void
    createTask: (title: TaskType["title"]) => void
    changeTaskStatus: (tasksId: TaskType["id"], isDone: TaskType["isDone"]) => void
}

export const Todolist = ({
                             totalTaskCount,
                             title,
                             tasks,
                             filter,
                             deleteTask,
                             createTask,
                             changeTaskStatus,
                             changeTodolistFilter
                         }: PropsType) => {

    const [titleInput, setTitleInput] = useState("")
    const [error, setError] = useState(false)

    const tasksList = tasks.length === 0
        ? <span>Your tasks list is empty</span>
        : <ul>
            {
                tasks.map(t => {
                    return (
                        <li>
                            <input
                                type="checkbox"
                                checked={t.isDone}
                                onChange={e => changeTaskStatus(t.id, e.currentTarget.checked)}
                            />
                            <span className={t.isDone ? "task-done" : "task"}>{t.title}</span>
                            <Button title="x" onClick={() => deleteTask(t.id)}/>
                        </li>
                    )
                })
            }
        </ul>
    const createTaskHandler = () => {
        const title = titleInput.trim()
        if (title !== "") {
            createTask(titleInput)
        } else {
            setError(true)
        }
        setTitleInput("")
    }

    const isTitleValid = titleInput.length > 0 && titleInput.length <= 10
    return (
        <div>

            <h3>{title}
                <span>{totalTaskCount}</span>
            </h3>


            <div>
                <input
                    value={titleInput}
                    onChange={e => {
                        error && setError(false)
                        setTitleInput(e.target.value)
                    }}
                    onKeyDown={e => {
                        if (e.key === "Enter" && isTitleValid) {
                            createTaskHandler()
                        }
                    }}
                    className={error ? "error" : ""}
                />
                <Button
                    title="+"
                    disabled={!isTitleValid}
                    onClick={createTaskHandler}/>
                {!error && titleInput.length === 0 && <div>Enter task title</div>}
                {!error && isTitleValid && <div>Max title length 10 character</div>}
                {!error && titleInput.length > 10 && <div style={{color: 'red'}}>Title is too long</div>}
                {error && <div style={{color: 'red'}}>Enter valid title</div>}
            </div>
            {tasksList}
            <div>
                <Button
                    title="All"
                    onClick={() => changeTodolistFilter("all")}
                    className={filter === "all" ? "filter__btn-active" : ""}
                />
                <Button
                    title="Active"
                    onClick={() => changeTodolistFilter("active")}
                    className={filter === "active" ? "filter__btn-active" : ""}
                />
                <Button
                    title="Completed"
                    onClick={() => changeTodolistFilter("completed")}
                    className={filter === "completed" ? "filter__btn-active" : ""}
                />
            </div>
        </div>
    )
}