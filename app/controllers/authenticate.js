const mongoose = require("mongoose");
var hash = require('../helpers/hash.js');
var request = require("request");
module.exports.controller = function(app) {

    
    app.post('/authenticate', function(req, res, err) {
        if (typeof req.body.login != 'undefined' && typeof req.body.pass != 'undefined') {
            var login = req.body.login;
            var password = req.body.pass;
        }
        
        var User = mongoose.model("User");
        var user = User.findEnabled({ login: login }, function(err, user) {
            if (user.length == 0 || !hash.comparePassword(password, user[0].password)) {
                res.redirect("/");
            } else {
                res.cookie("authenticate", user[0], {expire: true})
                res.redirect('/accueil')
            }
        })
    });
}