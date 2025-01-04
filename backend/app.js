let express = require("express");
let app = express();
require('dotenv').config();
app.use(express.json());
const mysql = require('mysql2');
const PORT = 5000;

// Create a connection pool to MySQL
let con = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER, 
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

con.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }
    console.log('Connected to MySQL database');
});

// General GET request handler
const getTasks = (req, res) => {
    const taskType = req.params.taskType;

    if (taskType !== 'daily' && taskType !== 'focus') {
        return res.status(404).json({ message: 'Task type not found' });
    }

    const query = 'SELECT * FROM tasks WHERE type = ?'
    con.query(query, [taskType], (err, results) => {
        if (err) {
            console.error('Error fetching tasks:', err);
            return res.status(500).json({ message: 'Error fetching tasks' });
        }
        res.json(results);
    });
};

// General POST request handler
const addTask = (req, res) => {
    const taskType = req.params.taskType;
    const { text, isChecked } = req.body;

    if (taskType !== 'daily' && taskType !== 'focus') {
        return res.status(404).json({ message: 'Task type not found' });
    }

    const query = 'INSERT INTO tasks (type, text, isChecked) VALUES (?, ?, ?)';
    con.query(query, [taskType, text, isChecked], (err, result) => {
        print(taskType, text, isChecked);
        if (err) {
            console.error('Error inserting task:', err);
            return res.status(500).json({ message: 'Error inserting task' });
        }
        const newTask = { id: result.insertId, type: taskType, text, isChecked };
        res.status(201).json(newTask);
    });
};

// General DELETE request handler
const deleteTask = (req, res) => {
    const taskType = req.params.taskType;
    const { text } = req.body;

    if (taskType !== 'daily' && taskType !== 'focus') {
        return res.status(404).json({ message: 'Task type not found' });
    }

    const query = 'DELETE FROM tasks WHERE type = ? AND text = ?';
    con.query(query, [taskType, text], (err, result) => {
        if (err) {
            console.error('Error deleting task:', err);
            return res.status(500).json({ message: 'Error deleting task' });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Task not found' });
        }

        res.status(204).send();
    });
};

// General PUT request handler
const updateTask = (req, res) => {
    const taskType = req.params.taskType;
    const { text, isChecked } = req.body;

    if (taskType !== 'daily' && taskType !== 'focus') {
        return res.status(404).json({ message: 'Task type not found' });
    }

    const query = 'UPDATE tasks SET isChecked = ? WHERE type = ? AND text = ?';
    con.query(query, [isChecked, taskType, text], (err, result) => {
        if (err) {
            console.error('Error updating task:', err);
            return res.status(500).json({ message: 'Error updating task' });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Task not found' });
        }

        const updatedTask = { type: taskType, text, isChecked };
        res.status(200).json(updatedTask);
    });
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