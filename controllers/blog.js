/* GET 'blog-list' page*/
module.exports.bloglist = function(req, res) {
  res.render('blog-list', {title: 'Blog List'});
};

/* GET 'add-blog' page*/
module.exports.addblog = function(req, res) {
  res.render('add-blog', {title: 'Add Blog' });
};
