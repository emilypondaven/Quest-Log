import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <nav>
          <a href="daily">Daily</a>
          <a href="main">Main</a>
        </nav>
        <h1>Quest Log</h1>
        <div>
          <input placeholder="Enter task here"></input>
          <button>Add</button>
        </div>
      </header>
    </div>
  );
}

export default App;
