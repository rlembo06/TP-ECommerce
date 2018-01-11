var express = require('express');
var database = require('../database/database');

/* ---------------------------------- */
/* Category handle */

module.exports.CreateCategory = function (data, callback) {
    database.getConnection(function (err, connection) {
        connection.query(
            'SELECT createCategory(\"'+ data.libelle +'\")'
        , callback);
    });
}

module.exports.AllCategories = function (callback) {
    database.getConnection(function (err, connection) {
        if (err) throw err;
        connection.query('SELECT * FROM category', callback);
    })
}

/* ---------------------------------- */
