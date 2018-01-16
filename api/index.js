const fs = require('fs');

fs.readdirSync(__dirname + '/controllers').forEach(function(file) {
    if (file.substr(-3) == '.js') {
        route = require(__dirname + "/controllers/" + file);
        route.controller(app);
    }
});