import {Button} from "./Button.tsx";
import {FilterValuesType} from "./App.tsx";
import {TaskType} from "./types.ts";
import {useRef, useState} from "react";


type PropsType = {
    totalTaskCount: number
    title: string
    tasks: TaskType[]
    deleteTask: (tasksId: TaskType["id"]) => void
    changeTodolistFilter: (newFilterValue: FilterValuesType) => void
    createTask: (title: TaskType["title"]) => void
}

export const Todolist = ({
                             totalTaskCount,
                             title,
                             tasks,
                             deleteTask,
                             createTask,
                             changeTodolistFilter
                         }: PropsType) => {

    const [titleInput, setTitleInput] = useState("")
    const tasksList = tasks.length === 0
        ? <span>Your tasks list is empty</span>
        : <ul>
            {
                tasks.map(t => {
                    return (
                        <li>
                            <input type="checkbox" checked={t.isDone}/>
                            <span>{t.title}</span>
                            <Button title="x" onClick={() => deleteTask(t.id)}/>
                        </li>
                    )
                })
            }
        </ul>
    const createTaskHandler = () => {
        createTask(titleInput)
        setTitleInput("")
    }

    const isTitleValid = titleInput.length > 0 && titleInput.length <= 10
    return (
        <div>

            <h3>{title}
                <span>{totalTaskCount}</span>
            </h3>


            <div onClick={(e) => {
                if (e.nativeEvent.target) {
                    // @ts-ignore
                    if (e.nativeEvent.target.tagName !== "INPUT") {
                        alert("Click")
                    }
                }

            }}>
                <input
                    value={titleInput}
                    onChange={e => {
                        setTitleInput(e.target.value)
                    }}
                    onKeyDown={e => {
                        if (e.key === "Enter" && isTitleValid) {
                            createTaskHandler()
                        }
                    }}
                />
                <Button
                    title="+"
                    disabled={!isTitleValid}
                    onClick={createTaskHandler}/>
                {titleInput.length === 0 && <div>Enter task title</div>}
                {isTitleValid && <div>Max title length 10 character</div>}
                {titleInput.length > 10 && <div style={{color: 'red'}}>Title is too long</div>}

            </div>
            {tasksList}
            <div>
                <Button
                    title="All"
                    onClick={() => changeTodolistFilter("all")}
                />
                <Button
                    title="Active"
                    onClick={() => changeTodolistFilter("active")}
                />
                <Button
                    title="Completed"
                    onClick={() => changeTodolistFilter("completed")}
                />
            </div>
        </div>
    )
}