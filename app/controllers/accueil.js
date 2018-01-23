
const pug = require("pug");
const mongoose = require("mongoose");
const request = require("request");

module.exports.controller = function(app){
    app.get('/accueil', function(req, res, err) {
        var cookies = req.cookies;
        if(!cookies.authenticate){
            res.redirect("/");
        }else {
            var Produits = mongoose.model("Produit");
            var produits = Produits.findEnabled({}, function(err, prod){
                res.render("liste", {
                    produits: prod
                });
            })
            
        }
    });

    app.get('/detail/:id', function(req, res, err){
        var cookies = req.cookies;
        if(!cookies.authenticate){
            res.redirect("/");
        }else {
            var Produits = mongoose.model("Produit");
            var produits = Produits.findEnabled({_id: req.params.id}, function(err, prod){
                res.render("detail", {
                    produit: prod[0]
                });
            })
        }
    })

    app.get('/command/:produit', function(req, res, err){
        var cookies = req.cookies;
        if(!cookies.authenticate){
            res.redirect("/");
        }else {
        request.post({
            url: 'http://localhost:3000/api/command',
            body: {
                user: req.cookies.authenticate,
                produits: [req.params.produit]
            },
            json: true
        }, function(err, httpResponse, body){
            if (err) {
                return console.error('upload failed:', err);
            }
            res.redirect("/accueil");
        })
    }
    })

    app.get('/liste', function(req, res, err){
        var cookies = req.cookies;
        if(!cookies.authenticate){
            res.redirect("/");
        }else {
         request.get({
             url: 'http://localhost:3000/api/command/' + cookies.authenticate._id,
             json: true
         }, function(err, httpResponse, body){
             console.log(body[0].produits);
             res.render("commande", {
                 produits: body[0].produits
             })
         })
        }
    })


  }
  