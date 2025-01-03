import './App.css';
import React, { useState } from 'react';
import TaskList from './components/TaskList';
import NavBar from './components/NavBar';
import SpriteAnimation from './components/SpriteAnimation';
import SpriteChoiceButton from './components/SpriteChoiceButton';

// Colour scheme: https://coolors.co/fff5e8-f76f8e-96616b-2a3e47-113537
function App() {
  const [isCatSprite, setIsCatSprite] = useState(true);

  const handleSpriteChange = () => {
    setIsCatSprite(prevSprite => !prevSprite);
  };

  return (
    <div className="App">
      <header className="App-main">
        <NavBar />
        <SpriteChoiceButton isCatSprite={isCatSprite} handleSpriteChange={handleSpriteChange} />
        <div className="todo-container">
          <h1>Daily To-do List</h1>

          <TaskList />
          <SpriteAnimation isCatSprite={isCatSprite} />
        </div>
      </header>
    </div>
  );
}

export default App;