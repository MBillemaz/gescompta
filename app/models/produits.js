'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const BaseModel = require(__dirname + '/baseModel.js');

class Produit extends BaseModel {
  constructor() {
    super();
    this.setFields({
       identifiant: String,
       name: String,
       price_TTC: Number,
       price_HT: Number,
       descriptif: {
        capacity: Number,
        frequency: Number,
        autonomy: Number,
        compatibility: Boolean
       },
       infos: {
        guarantee: Number,
        mail: String,
        address: String
       },
       createAt: {type: Date, default: Date.now}
      });
  }
}
// export the class
module.exports = Produit;
