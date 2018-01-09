var express = require('express');
var jwt = require('jsonwebtoken');
var app = express();

var user = require('../models/user.model');

app.get('/user/all', function (req, res) {

	req.accepts('application/json');
	user.All(function (err, rows, fields) {
		if (!err) res.json(rows);
		else console.log(err);
	});

});

app.post('/user/login', function (req, res) {
    var data = req.body;

	user.Login(data, function (err, rows, fields) {
        var token;
        if (!err) {
            if(rows[0]) {
                var user = JSON.stringify(rows[0]);
                token = jwt.sign( user, 'secret');
                res.send(token);
            } 
            else res.send("Connexion refusé !");
        } else err;
	});
});

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

app.put('/user/password', function (req, res) {
    var data = req.body;

    req.accepts('application/json');
	user.UpdatePassword(data, function (err, rows, fields) {
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

app.put('/user/delete', function (req, res) {
    var data = req.body;

    req.accepts('application/json');
	user.Delete(data, function (err, rows, fields) {
        if (!err) res.send("Profil supprimé !");
		else res.send("Echec de la suppression du profil !");
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
