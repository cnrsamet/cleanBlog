const express = require('express');
const mongoose = require('mongoose');

const path = require('path');
const ejs = require('ejs');

const Blog = require('./models/Blogs');

const app = express();

//Connect DB
mongoose.connect('mongodb://localhost/cleanblog-test-db', {
  //useNewUrlParser: true,
  //useUnifiedTopology: true,
});

//Template Engine
app.set('view engine', 'ejs');

//Public file saved. || MIDDLEWARE
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//ROUTES
app.get('/', async (req, res) => {
  const blogs = await Blog.find({});
  res.render('index', {
    blogs,
  });
});
app.get('/about', (req, res) => {
  res.render('about');
});
app.get('/add_post', (req, res) => {
  res.render('add_post');
});
app.get('/post', (req, res) => {
  res.render('post');
});
//POST Yakalama.
app.post('/blogs', async (req, res) => {
  await Blog.create(req.body);
  res.redirect('/');
});
//single Post Catch
app.get('/blogs/:id', async (req, res) => {
  //console.log(req.params.id);
  const blog = await Blog.findById(req.params.id);
  res.render('post', {
    blog
  })
});

const port = 3000;

app.listen(port, () => {
  console.log(`Sunucu ${port} Portunda Çalıştırıldı.`);
});
