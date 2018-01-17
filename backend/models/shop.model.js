var express = require('express');
var database = require('../database/database');

/* ---------------------------------- */
/* Product handle */

module.exports.AllProducts = function (callback) {
    database.getConnection(function (err, connection) {
        if (err) throw err;
        connection.query(
            'SELECT id, libelle, description, price, id_category, CONVERT(photo USING utf8) as photo FROM product'
        , callback);
    })
}

module.exports.GetProductsByCategory = function (data, callback) {
    database.getConnection(function (err, connection) {
        if (err) throw err;
        connection.query(
            'SELECT id, libelle, description, price, id_category, CONVERT(photo USING utf8) as photo FROM product WHERE id_category = '+ data
        , callback);
    })
}

/* ---------------------------------- */

/* ---------------------------------- */
/* Category handle */

module.exports.GetCategory = function (data, callback) {
    database.getConnection(function (err, connection) {
        if (err) throw err;
        connection.query(
            'SELECT * FROM category WHERE id = \"'+ data +'\"' 
        , callback);
    })
}

/* ---------------------------------- */
