const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

// In-memory storage for users
let users = [];

// GET / - Hello World route
app.get('/', (req, res) => {
    res.send('Hello World');
});

// GET /users - Return all registered users
app.get('/users', (req, res) => {
    res.json({ users });
});

// POST /users - Register a new user
app.post('/users', (req, res) => {
    const newUserId = req.body.userId;

    // Case 1 - userId not provided
    if (!newUserId) {
        return res.status(400).send('Missing userId');
    }

    // Case 2 - userId already exists
    if (users.includes(newUserId)) {
        return res.status(400).send('User already exists');
    }

    // Case 3 - Valid userId, register the user
    users.push(newUserId);
    return res.status(201).send('User registered.');
});

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});