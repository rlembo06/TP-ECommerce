var express = require('express');
var jwt = require('express-jwt');
var app = express();

var user = require('../models/user.model');

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

app.post('/user', function (req, res) {
    var data = req.body;

    req.accepts('application/json');
	user.Create(data, function (err, rows, fields) {
        if (!err) 
        {
            for (var key in rows[0]) {
                res.send(rows[0][key]);
            }
        }
		else console.log(err);
	});

});

app.put('/user', function (req, res) {
    var data = req.body;

    req.accepts('application/json');
	user.Update(data, function (err, rows, fields) {
        if (!err) res.send("Profil mis à jour !");
		else res.send("Echec de la mise à jour du profil !");
	});

});

app.post('/user/get', function (req, res) {
    var data = req.body;

    req.accepts('application/json');
	user.Get(data, function (err, rows, fields) {
        if (!err) res.json(rows[0]);
		else console.log(err);
	});

});

module.exports = app;
