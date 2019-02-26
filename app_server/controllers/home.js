/* GET 'home' page*/
module.exports.home = function(req, res) {
  res.render('index', {title: 'David\'s Blog'});
};
