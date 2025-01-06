let express = require("express");
let app = express();
const PORT = process.env.PORT || 5000;
require('dotenv').config();
app.use(express.json());

// Set up cors
let cors = require('cors');
app.use(cors({
    origin: process.env.FRONTEND_URL
}));

const { Pool } = require('pg');
// CREATE TABLE tasks ( id INT AUTO_INCREMENT PRIMARY KEY, type ENUM('daiy', 'focus') NOT NULL, text VARCHAR(255) NOT NULL, isChecked BOOLEAN NOT NULL);
// Create a connection pool to MySQL
let pool = new Pool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER, 
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT
});

pool.query('SELECT NOW()', (err, res) => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }
    console.log('Connected to PostgreSQL database');
});

const validateTaskType = (req, res, next) => {
    const { taskType } = req.params;
    if (taskType !== 'daily' && taskType !== 'focus') {
        return res.status(404).json({ message: 'Task type not found' });
    }
    next();
};

// GET request handler
const getTasks = (req, res) => {
    const taskType = req.params.taskType;

    const query = 'SELECT * FROM tasks WHERE type = $1'
    pool.query(query, [taskType], (err, results) => {
        if (err) {
            console.error('Error fetching tasks:', err);
            return res.status(500).json({ message: 'Error fetching tasks' });
        }
        res.json(results.rows);
    });
};

// POST request handler
const addTask = (req, res) => {
    const taskType = req.params.taskType;
    const { text, isChecked } = req.body;

    const query = 'INSERT INTO tasks (type, text, "isChecked") VALUES ($1, $2, $3) RETURNING id';
    pool.query(query, [taskType, text, isChecked], (err, result) => {
        if (err) {
            console.error('Error inserting task:', err);
            return res.status(500).json({ message: 'Error inserting task' });
        }
        const newTask = { id: result.rows[0].id, type: taskType, text, isChecked };
        res.status(201).json(newTask);
    });
};

// DELETE request handler
const deleteTask = (req, res) => {
    const taskType = req.params.taskType;
    const { text } = req.body;

    const query = 'DELETE FROM tasks WHERE type = $1 AND text = $2';
    pool.query(query, [taskType, text], (err, result) => {
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

// PUT request handler
const updateTask = (req, res) => {
    const taskType = req.params.taskType;
    const { text, isChecked } = req.body;

    const query = 'UPDATE tasks SET "isChecked" = $1 WHERE type = $2 AND text = $3';
    pool.query(query, [isChecked, taskType, text], (err, result) => {
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
app.get('/:taskType', validateTaskType, getTasks);
app.post('/:taskType', validateTaskType, addTask);
app.delete('/:taskType', validateTaskType, deleteTask);
app.put('/:taskType', validateTaskType, updateTask);

// Listen on the port number for any requests
app.listen(PORT, () =>
    console.log(`Server running on port ${PORT}!`)
);

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Internal server error');
});