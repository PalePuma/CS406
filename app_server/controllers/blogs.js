/* GET 'blog-list' page */
module.exports.blogList = function(req, res) {
    res.render('blog-list', {
        title: 'Blog List',

        blogs: [{
                blogTitle: 'My First Blog Post',
                blogText: 'Welcome to my blog!',
                createdOn: '02.24.2019'
        }, {
                blogTitle: 'My Second Blog Post',
                blogText: 'I am so excited about my new blog!',
                createdOn: '02.24.2019'
        }, {
                blogTitle: 'My Third Blog Post',
                blogText: 'Please tell your friends about my blog!',
                createdOn: '02.24.2019'
        }]
    });
};

/* GET 'add-blog' page */
module.exports.addBlog = function(req, res) {
  res.render('add-blog', {title: 'Add Blog' });
};

/* GET 'edit-blog' page */
module.exports.editBlog = function(req, res) {
  res.render('edit-blog', {title: 'Edit Blog' });
};

/* GET 'delete-blog' page */
module.exports.deleteBlog = function(req, res) {
  res.render('delete-blog', {title: 'Delete Blog' });
};
