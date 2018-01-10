var express = require('express');
var jwt = require('jsonwebtoken');
var app = express();

var user = require('../models/user.model');
var admin = require('../models/admin.model');

app.post('/admin/login', function (req, res) {
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