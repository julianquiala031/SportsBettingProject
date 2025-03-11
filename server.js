// Description: This file is the main file that will run the 
// server and handle all the requests.
if (process.env.NODE_ENV !== 'production') { // if we are not in production mode
    require('dotenv').config(); // require the dotenv package
}

// importing libraries that we installed using npm
const express = require('express');
const app = express();
const bcrypt = require('bcrypt'); // importing bcrypt for password hashing
const path = require('path');
const passport = require('passport'); // Import passport
const initializePassport = require('./passport-config');
const flash = require('express-flash');
const session = require('express-session');

// TEMPORARILY STORING INFO IN ARR, MUST LINK TO DATABASE
const users = [];

initializePassport(
    passport,
    email => users.find(user => user.email === email),
    id => users.find(user => user.id === id)
);

app.use(express.urlencoded({ extended: false }));
app.use(flash());
app.use(session({
        secret: process.env.SESSION_SECRET,
        resave: false, // we wont resave the session var if nothing is changed
        saveUninitialized: false
    })
);

app.use(passport.initialize());
app.use(passport.session());

// Set the view engine to EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// configuring the login post functionality
app.post('/login', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
}));

// configuring the register post functionality
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
    res.render('index', { name: req.user ? req.user.name : 'User' }); // Pass the name variable here
});

app.get('/login', (req, res) => {
    res.render('login', { messages: req.flash('error') }); // Pass the messages variable here
});

app.get('/register', (req, res) => {
    res.render('register', { messages: req.flash('error') }); // Pass the messages variable here
});

// Server listening on port 3000
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});