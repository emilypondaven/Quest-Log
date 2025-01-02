import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-main">
        <nav>
          <a href="daily">Daily</a>
          <a href="main">Main</a>
        </nav>
        <h1>Daily To-do List</h1>

        <div class="task-field">
          <input class="task-input" placeholder="Enter task here"></input>
          <button class="add-button">Add</button>
        </div>

        <li>
          <ul>Spanish Duolingo Lesson</ul>
          <ul>Coding project (GitHub repo push request)</ul>
          <ul>Game of Chess</ul>
          <ul>Reading book (Philosophy, Fiction)</ul>
        </li>
      </header>
    </div>
  );
}

export default App;