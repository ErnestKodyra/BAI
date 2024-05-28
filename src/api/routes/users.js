import express from 'express';
const router = express.Router();

let users = [
    { id: 1, username: 'user1', password: 'pass1', email: 'user1@example.com' },
    { id: 2, username: 'user2', password: 'pass2', email: 'user2@example.com' },
];

router.post('/login', (req, res) => {
    const { username, password } = req.body;
    const user = users.find(u => u.username === username && u.password === password);
    if (user) {
        res.json(user);
    } else {
        res.status(401).json({ message: 'Invalid username or password' });
    }
});

router.post('/register', (req, res) => {
    const { username, password, email } = req.body;
    const user = { id: users.length + 1, username, password, email };
    users.push(user);
    res.status(201).json(user);
});

router.get('/', (req, res) => {
    res.header("Access-Control-Allow-Origin", "*")
    const { userId } = req.params;
    const user = users.find(u => u.id === parseInt(userId));
    if (user) {
        res.json(user);
    } else {
        res.status(404).json({ message: 'User not found' });
    }
});

export default router;
