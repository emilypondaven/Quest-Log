import React, { useState, useRef } from "react";
const apiURL = process.env.REACT_APP_API_URL;

function TaskList({ tasks, setTasks, endpoint }) {
    const [newTask, setNewTask] = useState("");
    const [newCategory, setNewCategory] = useState("");

    // References for the inputs
    const categoryInputRef = useRef(null);
    const taskInputRef = useRef(null);
    const addButtonRef = useRef(null);

    // Handling add a new task to backend and frontend
    const addTask = () => {
        // Check if it already exists
        const taskExists = tasks.some(task => task.text.toLowerCase() === newTask.toLowerCase());
        // Check that the new task is not empty
        if (!taskExists && newTask.trim()) {
            const task = newCategory.trim() ? `${newCategory.toUpperCase()}: ${capitalizeFirstLetter(newTask)}` : capitalizeFirstLetter(newTask);
            const newTaskObject = { text: task, isChecked: false };
            const requestBody = {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newTaskObject)
            }

            fetch(`${apiURL}/${endpoint}`, requestBody)
                .then(response => response.json())
                .then(data => {
                    setTasks([...tasks, data]);
                    setNewTask("");

                    // Add category to dropdown menuhow to 
                    if (data.text.includes(":")) {
                        const category = capitalizeFirstLetter(data.text.split(": ")[0].toLowerCase());
                        const categoryOptions = document.getElementById("category-options");

                        // Check if the task already exists in the datalist
                        let taskExists = false;

                        // Loop through the existing options in the datalist to check for the task
                        for (let option of categoryOptions.options) {
                            if (option.value === category) {
                                taskExists = true;
                                break;
                            }
                        }

                        if (!taskExists) {
                            const newOption = document.createElement("option");
                            newOption.value = category;
                            categoryOptions.appendChild(newOption);
                        }
                    }
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

        fetch(`${apiURL}/${endpoint}`, requestBody)
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

        fetch(`${apiURL}/${endpoint}`, requestBody)
            .then((response) => {
                if (response.status === 204) {
                    setTasks((prevTasks) =>
                        prevTasks.filter((task, taskIndex) => taskIndex !== index)
                    );

                    // Separate the text into category and task
                    const taskParts = taskToDelete.text.split(": ");
                    if (data.text.includes(":")) {
                        setNewCategory(taskParts[0]);
                        setNewTask(taskParts[1]);
                    } else {
                        setNewCategory("");
                        setNewTask(taskParts[0]);
                    }
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

    const handleCategoryChange = (event) => {
        setNewCategory(event.target.value);
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
          // If on category input, move focus to task input
          if (event.target === categoryInputRef.current) {
            taskInputRef.current.focus();
          }
          // If on task input, trigger addTask function
          else if (event.target === taskInputRef.current) {
            addTask();
          }
        }
      };

    return (
        <div>
            <div className="task-field">
                <input 
                    ref={categoryInputRef}
                    list="category-options" 
                    className="task-input" 
                    placeholder="Enter category here"
                    onChange={handleCategoryChange}
                    onKeyDown={handleKeyDown}
                />
                <datalist id="category-options"></datalist>

                <input 
                    ref={taskInputRef}
                    className="task-input" 
                    placeholder="Enter task here"
                    value={newTask}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown}
                />
                <button 
                    className="add-button" 
                    onClick={addTask}
                    ref={addButtonRef}
                >
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

// Capitalize the first letter of a string
function capitalizeFirstLetter(str) {
    if (!str) return str;  // Return empty string if input is empty
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  }

export default TaskList;