var express = require('express');
var jwt = require('jsonwebtoken');
var app = express();

var user = require('../models/user.model');
var admin = require('../models/admin.model');


/* ---------------------------------- */
/* Login Admin */

app.post('/login', function (req, res) {
    var data = req.body;

	user.Login(data, function (err, rows, fields) {
        var token;

        if (!err) {
            if(rows[0] && data.username === "admin") {
                var user = JSON.stringify(rows[0]);
                token = jwt.sign( user, 'secret');
                res.send(token);
            }
            else res.status(500).send("Connexion refusé !");
        } else err;
	});
});

/* ---------------------------------- */

/* ---------------------------------- */
/* Category handle */

app.post('/category/create', function (req, res) {
    var data = req.body;

    req.accepts('application/json');
	admin.CreateCategory(data, function (err, rows, fields) {
        if (!err)
        {
            for (var key in rows[0]) {
                res.send(rows[0][key]);
            }
        }
		else console.log(err);
	});
});

/* ---------------------------------- */


module.exports = app;
