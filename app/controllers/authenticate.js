const mongoose = require("mongoose");
var hash = require('../helpers/hash.js');
module.exports.controller = function(app) {

    
    app.post('/authenticate', function(req, res, err) {
        console.log(req.body);
        if (typeof req.body.login != 'undefined' && typeof req.body.pass != 'undefined') {
            var login = req.body.login;
            var password = req.body.pass;
        }

        var User = mongoose.model("User");
        var user = User.findEnabled({ login: login }, function(err, user) {
            if (user.length == 0 || !hash.comparePassword(password, user[0].password)) {
                res.status(401).send({ message: "Bad login or password.", auth: false });
            } else {
                res.status(200).json({ message: "You are now connected.", user: user[0], auth: true })
            }
        })
    });
}