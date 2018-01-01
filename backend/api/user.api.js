var express = require('express');
var app = express();

var user = require('../models/user.model');

// API Routes
app.get('/', function(req, res) {

    req.accepts('application/json');
	user.findAll(function(err, rows, fields) {
        if (!err)
        {
            console.log('Le résultat de la requête: ', rows);
            res.json(rows);
        }
        else console.log(err);
    });
    
});

app.get('/test', function(req, res) {
    console.log('TEST2');
});

module.exports = app;