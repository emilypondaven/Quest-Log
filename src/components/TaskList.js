import React, { useState } from "react";

function TaskList() {
    const [tasks, setTasks] = useState([
        "Spanish Duoliungo Lesson",
        "Coding Project (GitHub repo push request)",
        "Game of Chess",
        "Reading book (Philosophy, Fiction)"
    ]);

    const [newTask, setNewTask] = useState("");

    // Function to handle adding a new task
    const addTask = () => {
        if (newTask.trim()) {
            console.log("ghg");
            setTasks([...tasks, newTask]);
            setNewTask("");
        }
    };

    const handleInputChange = (event) => {
        setNewTask(event.target.value);
    }

    const handleKeyDown = (event) => {
        if (event.key === "Enter") {
            addTask();
        }
    };

    return (
        <div>
            <div className="task-field">
                <input 
                    className="task-input" 
                    placeholder="Enter task here"
                    value={newTask}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown}
                />
                <button className="add-button" onClick={addTask}>
                    Add
                </button>
            </div>

            <ul>
                {tasks.map((task, index) => (
                    <li key={index}>{task}</li>
                ))}
            </ul>
        </div>
    )
}

export default TaskList;