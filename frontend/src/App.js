import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React, { useState } from 'react';
import NavBar from './components/NavBar';
import Daily from './pages/Daily';
import Focus from './pages/Focus';
import SpriteChoiceButton from './components/SpriteChoiceButton';
import SpriteAnimation from './components/SpriteAnimation';

// Colour scheme: https://coolors.co/fff5e8-f76f8e-96616b-2a3e47-113537
function App() {
  // Sprite variable states
  const [isCatSprite, setIsCatSprite] = useState(true);
  const [currentFrame, setCurrentFrame] = useState(0);
  const [positionX, setPositionX] = useState(0);
  const [isIdle, setIsIdle] = useState(false);
  const [hasIdled, setHasIdled] = useState(false);
  const [stopPosition, setStopPosition] = useState(window.innerWidth / 2);

  // Handle sprite switch
  const handleSpriteChange = () => {
    setIsCatSprite(prev => !prev);
  };

  return (
    <div className="App-main">
      <title>Quest Log</title>
      <Router>
        <NavBar />
        <SpriteChoiceButton 
          handleSpriteChange={handleSpriteChange} 
        />

        <Routes>
          <Route 
            path="/" 
            element={<Daily />} 
          />
          <Route 
            path="/focus" 
            element={<Focus />} 
          />
        </Routes>

        <SpriteAnimation 
          isCatSprite={isCatSprite}
          currentFrame={currentFrame}
          setCurrentFrame={setCurrentFrame}
          positionX={positionX}
          setPositionX={setPositionX}
          isIdle={isIdle}
          setIsIdle={setIsIdle}
          hasIdled={hasIdled}
          setHasIdled={setHasIdled}
          stopPosition={stopPosition}
          setStopPosition={setStopPosition}
        />
      </Router>
    </div>
  );
}

export default App;