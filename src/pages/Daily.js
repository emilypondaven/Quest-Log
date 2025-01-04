import React, { useState } from 'react';
import TaskList from '../components/TaskList';

// Colour scheme: https://coolors.co/fff5e8-f76f8e-96616b-2a3e47-113537
function Daily() {
    const [dailyTasks, setDailyTasks] = useState([])

    return (
        <div>
            <h1>Daily To-do List</h1>
            <TaskList tasks={dailyTasks} setTasks={setDailyTasks} />
        </div>
  );
}

export default Daily;