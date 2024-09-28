const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const session = require('express-session');
const path = require('path');
const User = require('./models/User');

const app = express();
const PORT = process.env.PORT || 3000;

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/sam', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1); // Exit the application if MongoDB connection fails
});

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Session middleware
app.use(session({
    secret: '396c4bed13e993ef162e476695f4bf0cc2ba6752e04aaffa375c7d69c1a405af9408dc41e2ef14073a0d6b2be0c605f79573f80858f406b5cfb38be43f1c38afc84a7c9891968521f8e720b09f01f348e220141b55e41864641140ac65aaa74ef14a7cc2e4f835393b4cdd2702bdb3c516637975f78535654b87cc3eaaac0b61f088fb4e8c53d096da56b613bde4412663e7ab9242b784172c176fc725f0a1dfba7682086a1ea0595724b616e92e373ea886bda6ff838b16bcd5a34fa65ef8aae8304317eecc534d552dfebbdaa8f2f1aca0029151a7b1a5c4be01642ae0309633cf34613c5aec03fd93a050530ca6daca84f1c4758da2fe2622fd30ebcdfc47',
    resave: false,
    saveUninitialized: true,
}));

// Signup Route
app.post('/signup', async (req, res) => {
    try {
        const { username, email, college, password } = req.body;
        
        // Check for missing fields
        if (!username || !email || !college || !password) {
            return res.status(400).send('All fields are required');
        }

        // Check if the user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).send('User with this email already exists');
        }

        // Create a new user instance
        const newUser = new User({ username, email, college, password });

        // Save the new user to the database
        await newUser.save();
        
        // Store user in session and redirect to homepage
        req.session.user = newUser;
        res.redirect('/homepage.html');
    } catch (err) {
        console.error('Error during signup:', err);
        res.status(500).send('Error during signup');
    }
});

// Login Route
app.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;

        // Check for missing fields
        if (!username || !password) {
            return res.status(400).send('Both username and password are required');
        }

        // Find user by username
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(401).send('Username not found');
        }

        // Check if the password matches
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(401).send('Incorrect password');
        }

        // Store user in session and redirect to homepage
        req.session.user = user;
        res.redirect('/homepage.html');
    } catch (err) {
        console.error('Error during login:', err);
        res.status(500).send('Error during login');
    }
});

// Logout Route
app.get('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            console.error('Error logging out:', err);
            return res.status(500).send('Error logging out');
        }
        res.redirect('/index.html');
    });
});

// Global error handler
app.use((err, req, res, next) => {
    console.error('Unhandled error:', err.stack);
    res.status(500).send('Something went wrong!');
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
