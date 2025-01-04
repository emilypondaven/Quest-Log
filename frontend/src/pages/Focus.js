import React, { useEffect, useState } from 'react';
import TaskList from '../components/TaskList';

// Colour scheme: https://coolors.co/fff5e8-f76f8e-96616b-2a3e47-113537
function Focus() {
    const [focusTasks, setFocusTasks] = useState([]);
        
    useEffect(() => {
        fetch('/focus-tasks')
            .then((response) => response.json())
            .then((data) => setFocusTasks(data))
            .catch((error) => console.error('Error:', error));
    }, [])

    return (
        <div>
            <h1>Focus Time Tasks</h1>
            <TaskList 
                tasks={focusTasks} 
                setTasks={setFocusTasks}
                endpoint="/focus-tasks"
            />
        </div>
  );
}

export default Focus;