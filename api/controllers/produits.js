const mongoose = require("mongoose");
module.exports.controller = function(app) {

    app.get('/produit/:id', function(req, res, err) {
        var produit = mongoose.model("Produit");
        var produits = produit.find({ _id: req.params.id }, function(err, resultat) {
            if (err) res.json(res);
            else res.json(resultat)
        });
    });

    app.post('/produit', function(req, res, err) {
        var produit = mongoose.model("Produit");
        req.body.password = hash.hashPassword(req.body.password);
        produit.create(req.body, (err, result) => {
            if (err) {
                res.statusCode = 400;
                res.send(err);
            } else {
                res.statusCode = 201;
                res.send(result);
            }

        })
    });

    app.patch('/produit/:id', function(req, res, err) {
        var id = req.params.id;
        var idGroup = req.body.group;
        var Group = mongoose.model("Group");
        var produit = mongoose.model("Produit");

        Group.findEnabled({ _id: idGroup }, function(err, group) {
            if (err) res.status(400).json(err);
            else {
                if (group.length == 0) res.status(400).send("Group doesn't exist");
                else {
                    produit.findEnabled({ _id: id }, function(error, produit) {
                        if (error) res.status(400).send(err);
                        else {
                            var inGroup = false;
                            produit[0].groups.forEach((testGroup) => {
                                if (testGroup == idGroup) {
                                    inGroup = true;
                                }
                            });
                            if (inGroup == false) {
                                produit[0].groups.push(group[0]);
                                produit[0].save(function(err, updated) {
                                    if (err) res.status(400).send(err);
                                    else res.status(201).send("Group added to produit");
                                })
                            } else {
                                res.status(400).send("produit already in this gorup");
                            }

                        }
                    });
                }
            }
        })
    })

    app.delete('/produit/:id', function(req, res, err) {
        var id = req.params.id;
        if (!id) {
            res.statusCode = 400;
            res.send("Need produit id to delete");
        } else {
            var produit = mongoose.model("produit");
            produit.findByIdAndUpdate({ _id: id }, { disabled: true }, function(err, resu) {
                console.log(resu);
                if (err) {
                    res.statusCode = 400;
                    res.send(err);
                } else {
                    res.send("produit deleted");
                }
            })
        }

    });
}