const mongoose = require("mongoose");
module.exports.controller = function (app) {

    app.get('/api/command/:user', function (req, res, err) {
        var command = mongoose.model("Command");
        var commands = command.find({ user: req.params.user, valid: false }, function (err, resultat) {
            if (err) res.json(res);
            else res.json(resultat)
        });
    });

    app.post('/api/command', function (req, res, err) {
        var command = mongoose.model("Command");
        var commands = command.find({ user: req.body.user, valid: false }, function (err, resultat) {
            if (err) res.json(res);
            else {
                if (resultat.length > 0){
                    resultat[0].produits.push(req.body.produits[0]);
                    resultat[0].save(function (err, updated) {
                        if (err) res.status(400).send(err);
                        else res.status(201).send("Produit added to command");
                    })
                }
                else {
                    command.create(req.body, (err, result) => {
                        if (err) {
                            res.statusCode = 400;
                            res.send(err);
                        } else {
                            res.statusCode = 201;
                            res.send(result);
                        }
            
                    })
                }
                
            }
        });

        
    });

    app.post('/api/command/deleteProduit', function(req, res, err){
        var command = mongoose.model("Command");
        var commands = command.find({ user: req.body.user, valid: false }, function (err, resultat) {
            if (err) res.json(res);
            else {
                var produitIndex = command[0].produits.findIndex(function(element){
                    return resultat._id = element._id;
                });
                command[0].produits.splice(produitIndex, 1);
                command[0].save(function (err, updated) {
                    if (err) res.status(400).send(err);
                    else res.status(201).send("Produit added to command");
                });
            }
    })
})

    app.patch('/api/command/:id', function (req, res, err) {
        var id = req.params.id;
        var idProduit = req.body.produit;
        var Produit = mongoose.model("Produit");
        var command = mongoose.model("Command");

        Produit.findEnabled({ _id: idProduit }, function (err, produit) {
            if (err) res.status(400).json(err);
            else {
                if (produit.length == 0) res.status(400).send("Produit doesn't exist");
                else {
                    command.findEnabled({ _id: id }, function (error, command) {
                        if (error) res.status(400).send(err);
                        else {
                            command[0].produits.push(produit[0]);
                            command[0].save(function (err, updated) {
                                if (err) res.status(400).send(err);
                                else res.status(201).send("Produit added to command");
                            })
                        }
                    });
                }
            }
        })
    })

    //Utilisé pour valider la commande
    app.delete('/api/command/:id', function (req, res, err) {
        var id = req.params.id;
        if (!id) {
            res.statusCode = 400;
            res.send("Need command id to valid");
        } else {
            var command = mongoose.model("Command");
            command.findByIdAndUpdate({ _id: id }, { valid: true }, function (err, resu) {
                console.log(resu);
                if (err) {
                    res.statusCode = 400;
                    res.send(err);
                } else {
                    res.send("command validated");
                }
            })
        }

    })
}