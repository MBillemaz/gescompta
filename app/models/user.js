'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const BaseModel = require(__dirname + '/baseModel.js');

class User extends BaseModel {
  constructor() {
    super();
    this.setFields({
        name: {type: String, required: true},
        first_name: {type: String, required: true},
        birth_date: {type: Date, required: true},
        login: {type: String, required: true, unique: true},
        password: {type: String, required: true},
        addresses: {type: mongoose.Schema.ObjectId, ref: 'Address'},
        createAt: {type: Date, default: Date.now}
      });
  }
}
// export the class
module.exports = User;
