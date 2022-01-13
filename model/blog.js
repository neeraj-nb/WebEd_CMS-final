const mongoose = require('mongoose');
const { required } = require('nodemon/lib/config');

const Schema = mongoose.Schema;

const blogSchema = new Schema({

    heading:{
       type: String,
       required: true,
    },
    author:{
        type: String,
        required: true,
     },
     body:{
        type: String,
        required: true,
     }
},{timestamps:true});

const Blog = mongoose.model('blog', blogSchema);


module.exports = Blog
