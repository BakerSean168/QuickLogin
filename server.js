const express = require('express');
const { login } = require('./playwright'); // import the login function from your playwright.js file
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors({
    origin: '*', // allow all origins
    credentials: true, // allow credentials
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // allow these HTTP methods
    allowedHeaders: ['Content-Type', 'Authorization'], // allow these headers
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
    preflightContinue: true
}));
app.use(bodyParser.json());

const port = 3000;

app.post('/login', async (req, res) => {
    const account = req.body;
    await login(account);
    res.send('Logged in');
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});