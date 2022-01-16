const express = require('express');
const res = require('express/lib/response');
const morgan = require("morgan");
const mongoose = require("mongoose");
const dotenv = require('dotenv');
const md = require('markdown-it')();

dotenv.config();

const Blog = require('./model/blog.js')


const app = express();

const port = process.env.PORT || 3000;

app.set('view engine', 'ejs');


// data base


const dbURI = `mongodb+srv://${process.env.DBUSER}:${process.env.DBPASS}@cluster0.lmdxk.mongodb.net/cms?retryWrites=true&w=majority`;


mongoose.connect(dbURI)
     .then(result =>{
         console.log("database connected");
         app.listen(port);
         console.log('server running at ' + port);


     })
     .catch(err =>{
         console.log(err)
     })

 



app.use(morgan('dev'));


// public files
app.use(express.static('public'));


// url encoder
app.use(express.urlencoded({extended:true}));

const root_path = __dirname
// home page

app.get('/', (req, res) => {
  

    Blog.find().sort({ createdAt: -1})
        .then(result => {
            res.render('index' , { title:'Home', blogarray:result});

        })
        .catch(err => {console.log(err)});



});



// edit page

app.get('/edit', (req, res) => {

      Blog.find().sort({ createdAt: -1})
        .then(result => {
            res.render('editor' , { title:'Editor', blogarray:result});

        })
        .catch(err => {console.log(err)});

});


// blog page

app.get('/blog/:id', (req, res) => {


     Blog.findById(req.params.id)
          .then(result => {
            res.render('blog',{ title:'Blog', data:result, body:md.render(result.body) });
          })
          .catch(err =>{ console.log(err)})
     
});

app.delete('/blog/:id', (req, res) => {
     const response = {
         status : "sucess"
     }

    Blog.findByIdAndDelete(req.params.id)
         .then(result => {
           res.json(response)
         })
         .catch(err =>{ console.log(err)})
    
});

// create page

app.get('/create', (req, res) => {
    res.render('create',{ title:'Create', head:"create blog"});
});

app.post('/create', (req, res) => {

    const blog = new Blog(req.body);

    blog.save()
       .then(result =>{
           res.redirect('/edit')
       })
       .catch(err => console.log(err))
});


// edit blog


app.get('/editblog/:id', (req, res) => {


    Blog.findById(req.params.id)
    .then(result => {
        res.render('editblog',{ title:'Edit blog', head:"Edit blog", blog:result});
    })
    .catch(err =>{ console.log(err)})

});

app.post('/editblog/:id', (req,res) =>{
      console.log(req.body);
      const response = {
          status:"sucess"
      }
       
      const data = req.body
      Blog.findByIdAndUpdate(req.params.id, { heading:data.heading, author:data.author, body:data.body})
          .then(result =>{ 
              res.redirect('/edit')
            })
          .catch(err => {console.log(err)})
          
     
})


//404 page

app.use((req, res) => {
    res.render('404',{ title:'Oops!'});
});