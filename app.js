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
    res.render('index' , { title:'Home'});
});



// edit page

app.get('/edit', (req, res) => {
    res.render('editor',{ title:'Editor'});
});


// blog page

app.get('/blog', (req, res) => {
    res.render('blog',{ title:'Blog'});
});

// create page

app.get('/create', (req, res) => {
    res.render('create',{ title:'Create'});
});

// about page

app.get('/about', (req, res) => {
    res.render('about',{ title:'About'});
});
//404 page

app.use((req, res) => {
    res.render('404',{ title:'Oops!'});
});