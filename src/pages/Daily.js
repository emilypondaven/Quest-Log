import React, { useState } from 'react';
import TaskList from '../components/TaskList';
import SpriteAnimation from '../components/SpriteAnimation';
import SpriteChoiceButton from '../components/SpriteChoiceButton';

// Colour scheme: https://coolors.co/fff5e8-f76f8e-96616b-2a3e47-113537
function Daily({ isCatSprite, handleSpriteChange }) {
    const [dailyTasks, setDailyTasks] = useState([])

    return (
        <div>
            <SpriteChoiceButton isCatSprite={isCatSprite} handleSpriteChange={handleSpriteChange} />
            <h1>Daily To-do List</h1>
            <TaskList tasks={dailyTasks} setTasks={setDailyTasks} />
            <SpriteAnimation isCatSprite={isCatSprite} />
        </div>
  );
}

export default Daily;