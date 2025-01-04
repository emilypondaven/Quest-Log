let express = require("express");
let app = express();
const PORT = 5000;

let dailyTasks = [
    { text: "Duolingo", isChecked: true },
    { text: "Play chess", isChecked: false }
];

let focusTasks = [
    { text: "Work and work", isChecked: true }
];

app.use(express.json());

const tasksMap = {
    'daily-tasks': dailyTasks,
    'focus-tasks': focusTasks
};

// General GET request handler
const getTasks = (req, res) => {
    const taskType = req.params.taskType;
    if (!tasksMap[taskType]) {
        return res.status(404).json({ message: 'Task type not found' });
    }
    res.json(tasksMap[taskType]);
};

// General POST request handler
const addTask = (req, res) => {
    const taskType = req.params.taskType;
    const newTask = req.body;
    if (!tasksMap[taskType]) {
        return res.status(404).json({ message: 'Task type not found' });
    }
    tasksMap[taskType].push(newTask);
    res.status(201).json(newTask);
};

// General DELETE request handler
const deleteTask = (req, res) => {
    const taskType = req.params.taskType;
    const taskToDelete = req.body;
    if (!tasksMap[taskType]) {
        return res.status(404).json({ message: 'Task type not found' });
    }

    const taskIndex = tasksMap[taskType].findIndex(task => task.text === taskToDelete.text);
    if (taskIndex === -1) {
        return res.status(404).json({ message: 'Task not found' });
    }

    tasksMap[taskType].splice(taskIndex, 1);
    res.status(200).json(taskToDelete);
};

// General PUT request handler
const updateTask = (req, res) => {
    const taskType = req.params.taskType;
    const updatedTaskData = req.body;
    if (!tasksMap[taskType]) {
        return res.status(404).json({ message: 'Task type not found' });
    }

    const taskIndex = tasksMap[taskType].findIndex(task => task.text === updatedTaskData.text);
    if (taskIndex === -1) {
        return res.status(404).json({ message: 'Task not found' });
    }

    tasksMap[taskType][taskIndex] = updatedTaskData;
    res.status(200).json(updatedTaskData);
};

// Define routes for tasks
app.get('/:taskType', getTasks);
app.post('/:taskType', addTask);
app.delete('/:taskType', deleteTask);
app.put('/:taskType', updateTask);

// Listen on the port number for any requests
app.listen(PORT, () =>
    console.log(`Server running on port ${PORT}!`)
);