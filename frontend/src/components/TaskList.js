import React, { useState } from "react";

function TaskList({ tasks, setTasks, endpoint }) {
    const [newTask, setNewTask] = useState("");

    // Handling add a new task to backend and frontend
    const addTask = () => {
        // Check if it already exists
        const taskExists = tasks.some(task => task.text.toLowerCase() === newTask.toLowerCase());
        // Check that the new task is not empty
        if (!taskExists && newTask.trim()) {
            const newTaskObject = { text: newTask, isChecked: false };
            const requestBody = {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newTaskObject)
            }

            fetch(endpoint, requestBody)
                .then(response => response.json())
                .then(data => {
                    setTasks([...tasks, data]);
                    setNewTask("");
                })
                .catch((error) => console.error("Error:", error));
        }
    }

    // Handling update a saved task for backend and frontend
    const updateTaskCompletion = (index) => {
        const task = tasks[index];
        const updatedTaskObject = { ...task, isChecked: !task.isChecked }
        const requestBody = {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updatedTaskObject)
        }

        fetch(endpoint, requestBody)
            .then((response) => response.json())
            .then((data) => {
                setTasks((prevTasks) =>
                    prevTasks.map((task, taskIndex) =>
                        taskIndex === index ? data : task
                    )
                );
            })
            .catch((error) => {
                console.error("Error updating task:", error);
            })
    };

    // Handling deleting a saved task for backend and frontend
    const deleteTask = (index) => {
        const taskToDelete = tasks[index];
        const requestBody = {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(taskToDelete)
        };

        fetch(endpoint, requestBody)
            .then((response) => {
                if (response.status === 204) {
                    setTasks((prevTasks) =>
                        prevTasks.filter((task, taskIndex) => taskIndex !== index)
                    );
                    setNewTask('');
                } else {
                    console.error('Failed to delete task');
                }
            })
            .catch((error) => {
                console.error("Error deleting task:", error);
            })
    };

    const handleInputChange = (event) => {
        setNewTask(event.target.value);
    };

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
                    <li key={index} style={{ textDecoration: task.isChecked ? 'line-through' : 'none' }}>
                        <input
                            type="checkbox"
                            checked={task.isChecked}
                            onChange={() => updateTaskCompletion(index)} // Toggle checkbox state
                        />
                        <span 
                            onClick={() => deleteTask(index)}
                            style={{ cursor: 'pointer' }}
                        >
                            {task.text}
                        </span>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default TaskList;