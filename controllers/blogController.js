const Blog = require('../models/Blogs');

exports.getAllBlogs = async (req, res) => {
  const blogs = await Blog.find({});
  res.render('index', {
    blogs,
  });
};
exports.createBlog = async (req, res) => {
  await Blog.create(req.body);
  res.redirect('/');
};
exports.getBlog = async (req, res) => {
  //console.log(req.params.id);
  const blog = await Blog.findById(req.params.id);
  res.render('post', {
    blog,
  });
};
exports.deleteBlog = async (req, res) => {
  await Blog.findByIdAndDelete(req.params.id);
  res.redirect('/');
};
exports.updateBlog = async (req, res) => {
  const blog = await Blog.findOne({ _id: req.params.id });
  blog.title = req.body.title;
  blog.text = req.body.text;
  blog.save();
  res.redirect(`/blogs/${req.params.id}`);
};
