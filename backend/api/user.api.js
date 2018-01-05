var express = require('express');
var jwt = require('express-jwt');
var app = express();

var user = require('../models/user.model');

// API Routes
app.get('/user/all', function (req, res) {

	req.accepts('application/json');
	user.All(function (err, rows, fields) {
		if (!err) res.json(rows);
		else console.log(err);
	});

});

//app.post('/user/login', jwt({secret: 'shhhhhhared-secret'}), function (req, res) {
app.post('/user/login', function (req, res) {
    var data = req.body;

	user.Login(data, function (err, rows, fields) {

		if (!err) {
            //if (rows[0].result >= 1) res.json(true);
            if (rows[0].result >= 1) res.json(true);
			else {
				res.json(false);
				console.log('Errors :', false);
			}
		} else err;

	});

});

app.post('/user/new', function (req, res) {
    var data = req.body;

	user.Create(data, function (err, rows, fields) {
        console.log('ERREURS :', err);
        console.log('ROWS :', rows);
        console.log('FIELDS :', fields);
        return;
	});

});

app.get('/user/test', function (req, res) {
	console.log('TEST2');
});

module.exports = app;
