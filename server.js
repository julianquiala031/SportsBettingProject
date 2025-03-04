// Initiate the server/ grabbing imported modules
const express = require('express');
const app = express();

// creating routes
app.get('/', (req, res) => {
    res.require('index.ejs');
});

app.get('/login', (req, res) => {
    res.require('login.ejs');
});

app.get('/register', (req, res) => {
    res.require('register.ejs');
});
// End of routes

