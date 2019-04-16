var express = require('express');
var router = express.Router();
var jwt = require('express-jwt');

var auth = jwt({
		secret: process.env.JWT_SECRET,
		userProperty: 'payload'
	      });

var ctrlBlogs = require('../controllers/blogs');
var ctrlAuth = require('../controllers/authentication');

// blogs
router.get('/blogs', ctrlBlogs.blogsListAll);
router.post('/blogs', auth, ctrlBlogs.blogsCreate);
router.get('/blogs/:blogID', ctrlBlogs.blogsReadOne);
router.put('/blogs/:blogID', auth, ctrlBlogs.blogsUpdateOne);
router.delete('/blogs/:blogID', auth, ctrlBlogs.blogsDeleteOne);
router.post('/register', ctrlAuth.register);
router.post('/login', ctrlAuth.login);

module.exports = router;
