function TaskList() {
    const [tasks, setTasks] = useState([
        "Spanish Duoliungo Lesson",
        "Coding Project (GitHub repo push request)",
        "Game of Chess",
        "Reading book (Philosophy, Fiction)"
    ]);

    return (
        <div>
            <div class="task-field">
                <input class="task-input" placeholder="Enter task here" />
                <button class="add-button">Add</button>
            </div>

            <ul>
                <li>Spanish Duolingo Lesson</li>
                <li>Coding project (GitHub repo push request)</li>
                <li>Game of Chess</li>
                <li>Reading book (Philosophy, Fiction)</li>
            </ul>
        </div>
    )
}

export default TaskList;