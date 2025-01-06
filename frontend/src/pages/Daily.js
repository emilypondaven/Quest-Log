import React, { useState, useEffect } from 'react';
import TaskList from '../components/TaskList';

// Colour scheme: https://coolors.co/fff5e8-f76f8e-96616b-2a3e47-113537
function Daily() {
    const [dailyTasks, setDailyTasks] = useState([]);
    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}/daily`)
            .then((response) => response.json())
            .then((data) => setDailyTasks(data))
            .catch((error) => console.error('Error:', error));
    }, [])

    return (
        <div>
            <h1>Daily To-do List</h1>
            <TaskList 
                tasks={dailyTasks} 
                setTasks={setDailyTasks}
                endpoint="daily"
            />
        </div>
  );
}

export default Daily;