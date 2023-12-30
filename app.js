const express = require('express');
const mongoose = require('mongoose');
var methodOverride = require('method-override');

const path = require('path');
const ejs = require('ejs');

const Blog = require('./models/Blogs');
const blogController = require('./controllers/blogController');
const pageController = require('./controllers/pageController');

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
app.use(
    methodOverride('_method', {
    methods: ['POST', 'GET'],
  })
);

//ROUTES
app.get('/', blogController.getAllBlogs);

//PAGES
app.get('/about', pageController.getAboutPage);
app.get('/add_post', pageController.getAddPage);
app.get('/blogs/edit/:id', pageController.getEditPage);


//BLOGS
app.post('/blogs', blogController.createBlog);
app.get('/blogs/:id', blogController.getBlog);
app.delete('/blogs/:id', blogController.deleteBlog);
app.put('/blogs/:id', blogController.updateBlog);





const port = 3000;
app.listen(port, () => {
  console.log(`Sunucu ${port} Portunda Çalıştırıldı.`);
});
