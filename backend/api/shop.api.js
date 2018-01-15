var express = require('express');
var jwt = require('jsonwebtoken');
var app = express();

var shop = require('../models/shop.model');

app.get('/product/all', function (req, res) {

	req.accepts('application/json');
	shop.AllProducts(function (err, rows, fields) {
        console.log(rows);
		if (!err) res.json(rows);
		else console.log(err);
	});

});

module.exports = app;