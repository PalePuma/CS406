var express = require('express');
var router = express.Router();
var ctrlHome = require('../controllers/home');
var ctrlBlog = require('../controllers/blogs');

/* Home */
router.get('/', ctrlHome.home);

/* Blog */
router.get('/blog-list', ctrlBlog.blogList);

router.get('/add-blog', ctrlBlog.addBlog);
router.post('/add-blog', ctrlBlog.doAddBlog);

router.get('/edit-blog/:blogID', ctrlBlog.editBlog);
router.post('/edit-blog/:blogID', ctrlBlog.doEditBlog);

router.get('/delete-blog/:blogID', ctrlBlog.deleteBlog);
router.post('/delete-blog/:blogID', ctrlBlog.doDeleteBlog);

module.exports = router;
