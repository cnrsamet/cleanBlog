const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//New Schema
const BlogSchema = new Schema({
        title: String,
        text: String,
        dateNow:{
            type: Date,
            default: Date.now,
        },
    });
    const Blog = mongoose.model('Blog', BlogSchema);
    module.exports = Blog;