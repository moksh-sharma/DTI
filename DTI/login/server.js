const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));

// In-memory user storage (replace with a database in production)
const users = [];
const JWT_SECRET = 'your-secret-key'; // Change this in production

// Signup endpoint
app.post('/signup', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if user already exists
        if (users.find(user => user.email === email)) {
            return res.status(400).json({ error: 'User already exists' });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Store user
        users.push({
            email,
            password: hashedPassword
        });

        // Create token
        const token = jwt.sign({ email }, JWT_SECRET, { expiresIn: '1h' });

        res.json({ token });
    } catch (error) {
        res.status(500).json({ error: 'Error creating user' });
    }
});

// Login endpoint
app.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find user
        const user = users.find(u => u.email === email);
        if (!user) {
            return res.status(400).json({ error: 'User not found' });
        }

        // Check password
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(400).json({ error: 'Invalid password' });
        }

        // Create token
        const token = jwt.sign({ email }, JWT_SECRET, { expiresIn: '1h' });

        res.json({ token });
    } catch (error) {
        res.status(500).json({ error: 'Error logging in' });
    }
});

// Google OAuth endpoint (mock)
app.post('/auth/google', (req, res) => {
    // In a real implementation, this would handle Google OAuth
    res.json({ message: 'Google authentication not implemented' });
});

// Facebook OAuth endpoint (mock)
app.post('/auth/facebook', (req, res) => {
    // In a real implementation, this would handle Facebook OAuth
    res.json({ message: 'Facebook authentication not implemented' });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
}); 