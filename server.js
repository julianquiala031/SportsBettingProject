const express = require('express');
const app = express();
const bcrypt = require('bcrypt'); // importing bcrypt for password hashing
const path = require('path');

// Set the view engine to EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// TEMPORARILY STORING INFO IN ARR, MUST LINK TO DATABASE
const users = [];
app.use(express.urlencoded({ extended: false }));

app.post("/register", async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        users.push({
            id: Date.now().toString(),
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword
        });
        res.redirect('/login');
    } catch (e) {
        res.redirect('/register');
    }
    // displaying newly registered users in the console
    console.log(users);
});

// creating routes
app.get('/', (req, res) => {
    res.render('index', { name: 'User' }); // Pass the name variable here
});

app.get('/login', (req, res) => {
    res.render('login', { messages: {} }); // Pass the messages variable here
});

app.get('/register', (req, res) => {
    res.render('register', { messages: {} }); // Pass the messages variable here
});


// Server listening on port 3000
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});