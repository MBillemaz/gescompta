
module.exports.controller = function(app){
  app.get('/', function(req, res, err) {
      res.sendFile('views/authenticate.html', {root: __dirname + '/../'});
  });
}
