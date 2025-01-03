import React, { useState } from "react";

function TaskList({ tasks, setTasks }) {
    const [newTask, setNewTask] = useState("");

    // Function to handle adding a new task
    const addTask = () => {
        if (newTask.trim()) {
            // Check if any task's text includes the inputted text
            const taskExists = tasks.some(task => task.text.toLowerCase() == newTask.toLowerCase());

            if (!taskExists) {
                const newTaskObject = { text: newTask, isChecked: false };
                setTasks([...tasks, newTaskObject]);
                setNewTask("");
            }
        }
    };

    const toggleTaskCompletion = (index) => {
        const updatedTasks = tasks.map((task, taskIndex) => {
            if (taskIndex === index) {
                return { ...task, isChecked: !task.isChecked };
            }
            return task;
        });
        setTasks(updatedTasks);
    }

    const deleteTask = (index) => {
        const taskToDelete = tasks[index].text;
        const updatedTasks = tasks.filter((task, taskIndex) => taskIndex !== index);
        setTasks(updatedTasks);
        setNewTask(taskToDelete);
    }

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
                    <li key={index} style={{ textDecoration: task.isChecked ? 'line-through' : 'none' }}>
                        <input
                            type="checkbox"
                            checked={task.isChecked}
                            onChange={() => toggleTaskCompletion(index)} // Toggle checkbox state
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