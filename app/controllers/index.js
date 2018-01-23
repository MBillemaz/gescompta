
module.exports.controller = function(app){
  app.get('/', function(req, res, err) {
    res.render("authenticate");
  });
}
