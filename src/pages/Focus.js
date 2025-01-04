import React, { useState } from 'react';
import TaskList from '../components/TaskList';
import SpriteAnimation from '../components/SpriteAnimation';
import SpriteChoiceButton from '../components/SpriteChoiceButton';

// Colour scheme: https://coolors.co/fff5e8-f76f8e-96616b-2a3e47-113537
function Focus({ isCatSprite, handleSpriteChange }) {
    const [focusTasks, setFocusTasks] = useState([])

    return (
        <div>
          <SpriteChoiceButton isCatSprite={isCatSprite} handleSpriteChange={handleSpriteChange} />
          <h1>Focus Time To-do List</h1>
          <TaskList tasks={focusTasks} setTasks={setFocusTasks} />
          <SpriteAnimation isCatSprite={isCatSprite} />
        </div>
  );
}

export default Focus;