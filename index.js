const mongoose = require("mongoose");
const fs = require('fs');
const join = require('path').join;
const Schema = mongoose.Schema;
var express = require('express')
var app = express();
var bodyParser = require('body-parser');
// parse application/json
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost/gescompta', {useMongoClient: true});
mongoose.plugin(schema => { schema.options.usePushEach = true });
/* Use good Promise */
mongoose.Promise = Promise

const dirModels = join(__dirname, 'app/models');
const excludeModels = [
    'baseModel.js'
]

var models = {}

/* Dynamic export models */
fs.readdirSync(dirModels)
  .filter(file => (~file.search(/^[^\.].*\.js$/) && excludeModels.indexOf(file) === -1))
  .forEach(file => {
    let classModel = require(join(dirModels, file));
    let tmpModel = new classModel()
    models[tmpModel.constructor.name] = tmpModel;
    models[tmpModel.constructor.name].exportModel();
  });

// dynamically include routes (Controller)
fs.readdirSync('./app/controllers').forEach(function (file) {
  if(file.substr(-3) == '.js') {
      route = require('./app/controllers/' + file);
      route.controller(app, models);
  }
});

/* On charge les valeurs par défaults */
require(join(__dirname, 'app/utils/defaultData.js'))

app.listen(3000);
