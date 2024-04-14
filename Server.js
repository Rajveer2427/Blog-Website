const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/blogDB', { useNewUrlParser: true, useUnifiedTopology: true });

// Create Blog Post Schema
const blogPostSchema = new mongoose.Schema({
    title: String,
    content: String
});

// Create Blog Post Model
const BlogPost = mongoose.model('BlogPost', blogPostSchema);

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// Routes
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/blog.html');
});

app.post('/posts', (req, res) => {
    const newBlogPost = new BlogPost({
        title: req.body.title,
        content: req.body.content
    });
    newBlogPost.save((err) => {
        if (err) {
            console.log(err);
        } else {
            res.redirect('/');
        }
    });
});

app.listen(3000, () => {
    console.log('Server is running on http://localhost:
