import './App.css';
import TaskList from './components/TaskList';
import NavBar from './components/NavBar';

// https://coolors.co/fff5e8-f76f8e-96616b-2a3e47-113537
function App() {
  return (
    <div className="App">
      <header className="App-main">
        <NavBar />

        <div className="todo-container">
          <h1>Daily To-do List</h1>

          <TaskList />
        </div>
      </header>
    </div>
  );
}

export default App;