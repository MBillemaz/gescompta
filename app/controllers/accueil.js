
const pug = require("pug");
const mongoose = require("mongoose");
const request = require("request");
var htmlPdf = require("html-pdf");
const fs = require("fs");
global.window = {document: {createElementNS: () => {return {}} }};
global.navigator = {};
global.btoa = () => {};
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
            res.render("commande", {
                 produits: body[0] ? body[0].produits : null
             })
         })
        }
    })

    app.get('/validate', function(req, res, err){
        // Variables pour utiliser jsPDF coté serveur

        var cookies = req.cookies;
        if(!cookies.authenticate){
            res.redirect("/");
        }else {
            const compiledFunction = pug.compileFile('app/views/facture.pug');
            request.get({
                url: 'http://localhost:3000/api/command/' + cookies.authenticate._id,
                json: true
            }, function(err, httpResponse, body){
                // createFacture(body[0]);
                var doc = compiledFunction({
                   commande: body[0]
               });
               htmlPdf.create(doc).toFile('/pdfs/Facture.pdf', function(err, response){
                   if(err) return console.log("pdf failed");
                    var data =fs.readFileSync('/pdfs/Facture.pdf');
                    res.contentType("application/pdf");
                    res.send(data);
               })
                // var doc = pdfDoc.createPdfKitDocument({
                //     content: [
                //         {text: "Facture", style: "titre"},
                //         user.first_name + " " + user.name,
                //         {
                //             table: {
                //                 body: tableContent
                //             }
                //         },
                //         "Prix HT : " + price_HT,
                //         "TVA : " + TVA,
                //         "Prix TTC : " + price_TTC 
                //     ],
                //     styles: {
                //         titre: {
                //             bold: true,
                //             alignent: 'center'
                //         }
                //     }

            })
        }
    })

    // function createFacture(){
    //     var user = body[0].user;
    //     var produits = body[0].produits;
    //     var price_TTC = 0;
    //     var price_HT = 0;
    //     var TVA = 0;
    //     var tableContent = [];
    //     produits.forEach((prod) => {
    //         tableContent.push([prod.name, prod.price_TTC, prod.price_HT]);
    //         price_TTC += prod.price_TTC;
    //         price_HT += prod.price_HT;
    //         TVA += (prod.price_TTC - prod.price_HT);
    //     })  
    //     var doc = new PDFDocument;
    //     doc.pipe fs.createWriteStream('pdfs/output.pdf');
    // }


  }
  