var express = require('express');
var router = express.Router();
var ctrlHome = require('../controllers/home');
var ctrlBlog = require('../controllers/blogs');

/* Home */
router.get('/', ctrlHome.home);

/* Blog */
router.get('/blog-list', ctrlBlog.blogList);
router.get('/add-blog', ctrlBlog.addBlog);
router.get('/edit-blog', ctrlBlog.editBlog);
router.get('/delete-blog', ctrlBlog.deleteBlog);

module.exports = router;
