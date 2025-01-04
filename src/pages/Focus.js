import React, { useState } from 'react';
import TaskList from '../components/TaskList';

// Colour scheme: https://coolors.co/fff5e8-f76f8e-96616b-2a3e47-113537
function Focus(props) {
    const [focusTasks, setFocusTasks] = useState([])

    return (
        <div>
            <h1 style="margin-right">Focus Time To-do List</h1>
            <TaskList tasks={focusTasks} setTasks={setFocusTasks} />
        </div>
  );
}

export default Focus;