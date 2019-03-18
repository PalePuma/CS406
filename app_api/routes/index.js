var express = require('express');
var router = express.Router();
var ctrlBlogs = require('../controllers/blogs');

// blogs
router.get('/blogs', ctrlBlogs.blogsListAll);
router.post('/blogs', ctrlBlogs.blogsCreate);
router.get('/blogs/:blogID', ctrlBlogs.blogsReadOne);
router.put('/blogs/:blogID', ctrlBlogs.blogsUpdateOne);
router.delete('/blogs/:blogID', ctrlBlogs.blogsDeleteOne);

module.exports = router;
