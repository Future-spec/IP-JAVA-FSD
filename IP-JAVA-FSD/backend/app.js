const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
const allowedOrigins = (process.env.CORS_ORIGIN || 'http://localhost:5500')
    .split(',')
    .map((origin) => origin.trim())
    .filter(Boolean);
app.use(cors({
    origin: (origin, callback) => callback(null, !origin || allowedOrigins.includes(origin))
}));
app.use(express.json()); // Middleware to parse JSON bodies

const requiredDatabaseVariables = ['DB_HOST', 'DB_USER', 'DB_PASSWORD', 'DB_NAME'];
const missingDatabaseVariables = requiredDatabaseVariables.filter((key) => !process.env[key]);
if (missingDatabaseVariables.length > 0) {
    throw new Error(`Missing required database configuration: ${missingDatabaseVariables.join(', ')}`);
}

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT || 3306),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err.message);
        process.exit(1);
    }
    console.log('Successfully connected to the MySQL database.');
});

// --- API ROUTES ---

// Get All Employees (GET /api/employees)
app.get('/api/employees', (req, res) => {
    const sql = 'SELECT * FROM employees';
    db.query(sql, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});

// Add a New Employee (POST /api/employees)
app.post('/api/employees', (req, res) => {
    const { name, department, salary } = req.body;
    const sql = 'INSERT INTO employees (name, department, salary) VALUES (?, ?, ?)';
    
    db.query(sql, [name, department, salary], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ 
            message: 'Employee added successfully',
            employeeId: result.insertId 
        });
    });
});

// Get a Single Employee by ID (GET /api/employees/:id)
app.get('/api/employees/:id', (req, res) => {
    const sql = 'SELECT * FROM employees WHERE id = ?';
    db.query(sql, [req.params.id], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        if (results.length === 0) return res.status(404).json({ message: 'Employee not found' });
        res.json(results[0]);
    });
});

// Update an Employee (PUT /api/employees/:id)
app.put('/api/employees/:id', (req, res) => {
    const { name, department, salary } = req.body;
    const sql = 'UPDATE employees SET name = ?, department = ?, salary = ? WHERE id = ?';
    db.query(sql, [name, department, salary, req.params.id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        if (result.affectedRows === 0) return res.status(404).json({ message: 'Employee not found' });
        res.json({ message: 'Employee updated successfully' });
    });
});

// Delete an Employee (DELETE /api/employees/:id)
app.delete('/api/employees/:id', (req, res) => {
    const sql = 'DELETE FROM employees WHERE id = ?';
    db.query(sql, [req.params.id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        if (result.affectedRows === 0) return res.status(404).json({ message: 'Employee not found' });
        res.json({ message: 'Employee deleted successfully' });
    });
});

// Start the server
const PORT = Number(process.env.PORT || 3000);
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});