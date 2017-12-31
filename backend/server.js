var express = require('express');
var app = express();
var bodyParser = require('body-parser');

/*
app.get('/', function(req, res) {
    res.setHeader('Content-Type', 'text/plain');
    res.end('Vous êtes à l\'accueil');
});
*/

// Use Middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// Import API Routes
app.use(require('./api/user.api'));

port = process.env.PORT || 3000;
app.listen(port, function() {
	console.log("listening to port " + port);
})