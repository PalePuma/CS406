var express = require('express');
var router = express.Router();
var ctrlHome = require('../controllers/home');
var ctrlBlog = require('../controllers/blog');

/* Home */
router.get('/', ctrlHome.home);

/* Blog */
router.get('/blog-list', ctrlBlog.bloglist);
router.get('/add-blog', ctrlBlog.addblog);

module.exports = router;
