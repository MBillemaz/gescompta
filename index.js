const mongoose = require("mongoose");
const fs = require('fs');
const join = require('path').join;
const Schema = mongoose.Schema;
var express = require('express')
app = express();
var bodyParser = require('body-parser');
// parse application/json
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost/gescompta', { useMongoClient: true });
mongoose.plugin(schema => { schema.options.usePushEach = true });
/* Use good Promise */
mongoose.Promise = Promise


require(join(__dirname, '/app/index.js'));

/* Import API */

require(join(__dirname, "/api/index.js"));

/* Dynamic export models */

/* On charge les valeurs par défaults */
require(join(__dirname, 'api/utils/defaultData.js'))

app.listen(3000);