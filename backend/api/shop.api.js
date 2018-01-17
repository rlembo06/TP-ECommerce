var express = require('express');
var jwt = require('jsonwebtoken');
var app = express();

var shop = require('../models/shop.model');
var admin = require('../models/admin.model');

/* ---------------------------------- */
/* Product handle */

app.get('/product/all', function (req, res) {

	req.accepts('application/json');
	shop.AllProducts(function (err, rows, fields) {
		if (!err) res.json(rows);
		else console.log(err);
	});

});

app.get('/category/products/:id', function (req, res) {
    var data = req.params.id;

	shop.GetProductsByCategory(data, function (err, rows, fields) {
		if (!err) res.json(rows);
		else console.log(err);
	});

});

/* ---------------------------------- */

/* ---------------------------------- */
/* Category handle */

app.get('/category/all', function (req, res) {

	req.accepts('application/json');
	admin.AllCategories(function (err, rows, fields) {
		if (!err) res.json(rows);
		else console.log(err);
	});

});

app.get('/category/:id', function (req, res) {
    var data = req.params.id;

	shop.GetCategory(data, function (err, rows, fields) {
		if (!err) res.json(rows[0]);
		else console.log(err);
    });

});

/* ---------------------------------- */

module.exports = app;