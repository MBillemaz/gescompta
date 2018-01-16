const fs = require('fs');
const join = require('path').join;

const dirModels = join(__dirname, '/models');
const excludeModels = [
    'baseModel.js'
]

var models = {}

fs.readdirSync(dirModels)
    .filter(file => (~file.search(/^[^\.].*\.js$/) && excludeModels.indexOf(file) === -1))
    .forEach(file => {
        let classModel = require(join(dirModels, file));
        let tmpModel = new classModel()
        models[tmpModel.constructor.name] = tmpModel;
        models[tmpModel.constructor.name].exportModel();
    });

// dynamically include routes (Controller)
fs.readdirSync(__dirname + '/controllers').forEach(function(file) {
    if (file.substr(-3) == '.js') {
        route = require(__dirname + '/controllers/' + file);
        route.controller(app, models);
    }
});