const express = require('express');
const res = require('express/lib/response');
const morgan = require("morgan");
const mongoose = require("mongoose");

const Blog = require('./model/blog.js')


const app = express();

const port = 3000;

app.set('view engine', 'ejs');


// data base


const dbURI = 'mongodb+srv://neerajbabu:neerajneeraj27@cluster0.lmdxk.mongodb.net/cms?retryWrites=true&w=majority';


mongoose.connect(dbURI)
     .then(result =>{
         console.log("database connected");
         app.listen(port);
         console.log('server running at ' + port);


     })
     .catch(err =>{
         console.log(err)
     })

  const blogarray = [
    { heading : "heading", author : "author", body : "test 123", timestamp : "1:20 pm" },
    { heading : "heading", author : "author", body : "test 123", timestamp : "1:20 pm" },
    { heading : "heading", author : "author", body : "test 123", timestamp : "1:20 pm" }
  ];









app.use(morgan('dev'));


// public files
app.use(express.static('public'));


// url encoder
app.use(express.urlencoded({extended:true}));

const root_path = __dirname
// home page

app.get('/', (req, res) => {
    res.render('index' , { title:'Home', blogarray:blogarray});
});



// edit page

app.get('/edit', (req, res) => {
    res.render('editor',{ title:'Editor', blogarray:blogarray});
});


// blog page

app.get('/blog', (req, res) => {
    res.render('blog',{ title:'Blog'});
});

// create page

app.get('/create', (req, res) => {
    res.render('create',{ title:'Create'});
});

app.post('/create', (req, res) => {

    const blog = new Blog(req.body);

    blog.save()
       .then(result =>{
           res.redirect('/')
       })
       .catch(err => console.log(err))
});

// about page

app.get('/about', (req, res) => {
    res.render('about',{ title:'About'});
});
//404 page

app.use((req, res) => {
    res.render('404',{ title:'Oops!'});
});