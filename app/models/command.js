'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const BaseModel = require(__dirname + '/baseModel.js');

class Command extends BaseModel {
  constructor() {
    super();
    this.setFields({
        user: {type: mongoose.Schema.ObjectId, ref: 'User'},
        produits: [{type: mongoose.Schema.ObjectId, ref: 'Produit'}],
        valid: {type: Boolean, default: false},
        createAt: {type: Date, default: Date.now}
      });
  }
}
// export the class
module.exports = Command;
