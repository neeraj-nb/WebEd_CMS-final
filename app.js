const express = require('express');
const res = require('express/lib/response');
const nodemon = require('nodemon');
const morgan = require("morgan")


const app = express();


app.set('view engine', 'ejs');


const port = 3000;
app.listen(port);


console.log('server running at ' + port);



app.use(morgan('dev'));




const root_path = __dirname
// home page

app.get('/', (req, res) => {
    res.render('index');
});



// edit page

app.get('/edit', (req, res) => {
    res.render('editor');
});


// blog page

app.get('/blog', (req, res) => {
    res.render('blog');
});

// create page

app.get('/create', (req, res) => {
    res.render('create');
});

// about page

app.get('/create', (req, res) => {
    res.sendFile('./views/about.html',{root:root_path});
});
//404 page

app.use((req, res) => {
    res.sendFile('./views/404.html',{root:root_path});
});