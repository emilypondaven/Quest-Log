const mysql = require('mysql2');

// Create a connection pool to MySQL
const con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'questlogdb'
});

