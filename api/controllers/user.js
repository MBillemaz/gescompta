const mongoose = require("mongoose");
var hash = require('../../app/helpers/hash.js');
module.exports.controller = function(app) {

    app.get('/api/user/:login', function(req, res, err) {
        var User = mongoose.model("User");
        var user = User.findEnabled({ login: login }, function(err, user) {
            if (err) res.json(res);
            else res.json(resultat)
        });
    });

    app.post('/api/user', function(req, res, err) {
        var User = mongoose.model("User");
        req.body.password = hash.hashPassword(req.body.password);
        User.create(req.body, (err, result) => {
            if (err) {
                res.statusCode = 400;
                res.send(err);
            } else {
                res.statusCode = 201;
                res.send(result);
            }

        })
    });

    app.patch('/api/user/:id', function(req, res, err) {
        var id = req.params.id;
        var idGroup = req.body.group;
        var Group = mongoose.model("Group");
        var User = mongoose.model("User");

        Group.findEnabled({ _id: idGroup }, function(err, group) {
            if (err) res.status(400).json(err);
            else {
                if (group.length == 0) res.status(400).send("Group doesn't exist");
                else {
                    User.findEnabled({ _id: id }, function(error, user) {
                        if (error) res.status(400).send(err);
                        else {
                            var inGroup = false;
                            user[0].groups.forEach((testGroup) => {
                                if (testGroup == idGroup) {
                                    inGroup = true;
                                }
                            });
                            if (inGroup == false) {
                                user[0].groups.push(group[0]);
                                user[0].save(function(err, updated) {
                                    if (err) res.status(400).send(err);
                                    else res.status(201).send("Group added to user");
                                })
                            } else {
                                res.status(400).send("User already in this gorup");
                            }

                        }
                    });
                }
            }
        })
    })

    app.delete('/api/user/:id', function(req, res, err) {
        var id = req.params.id;
        if (!id) {
            res.statusCode = 400;
            res.send("Need user id to delete");
        } else {
            var User = mongoose.model("User");
            User.findByIdAndUpdate({ _id: id }, { disabled: true }, function(err, resu) {
                console.log(resu);
                if (err) {
                    res.statusCode = 400;
                    res.send(err);
                } else {
                    res.send("User deleted");
                }
            })
        }

    });
}