const express = require('express');
const res = require('express/lib/response');
const nodemon = require('nodemon');


const app = express();

const port = 3000;
app.listen(port);


console.log('server running at ' + port);

// home page

app.get('/', (req, res) => {
    res.send('<h1>home</h1>');
});



// edit page

app.get('/edit', (req, res) => {
    res.send('<h1>edit</h1>');
});


// blog page

app.get('/blog', (req, res) => {
    res.send('<h1>blog</h1>');
});

// create page

app.get('/create', (req, res) => {
    res.send('<h1>blog</h1>');
});

