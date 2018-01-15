var express = require('express');
var database = require('../database/database');

module.exports.AllProducts = function (callback) {
    database.getConnection(function (err, connection) {
        if (err) throw err;
        connection.query(
            'SELECT id, libelle, description, price, id_category, CONVERT(photo USING utf8) as photo FROM product'
        , callback);
    })
}