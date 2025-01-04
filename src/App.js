import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React, { useState } from 'react';
import NavBar from './components/NavBar';
import Daily from './pages/Daily';
import Focus from './pages/Focus';

// Colour scheme: https://coolors.co/fff5e8-f76f8e-96616b-2a3e47-113537
function App() {
  const [isCatSprite, setIsCatSprite] = useState(true);

  const handleSpriteChange = () => {
    setIsCatSprite(prevSprite => !prevSprite);
  };

  return (
    <div className="App">
      <header className="App-main">
        <Router>
          <NavBar />
          <Routes>
            <Route path="/" element={<Daily isCatSprite={isCatSprite} handleSpriteChange={handleSpriteChange} />} />
            <Route path="/focus" element={<Focus isCatSprite={isCatSprite} handleSpriteChange={handleSpriteChange} />} />
          </Routes>
        </Router>
      </header>
    </div>
  );
}

export default App;