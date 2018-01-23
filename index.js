const mongoose = require("mongoose");
const fs = require('fs');
const join = require('path').join;
const Schema = mongoose.Schema;
var express = require('express');
const pug = require("pug");
app = express();
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
// parse application/json
app.locals.basedir = join(__dirname, '/app/views');
app.set("views", join(__dirname, '/app/views') )
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())
app.use(cookieParser());
app.set("view engine", "pug");
app.use(express.static(__dirname + '/public/pdfs'));

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
