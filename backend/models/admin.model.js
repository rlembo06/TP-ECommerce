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


module.exports.UpdateCategory = function (data, callback) {
    database.getConnection(function (err, connection) {
        if (err) throw err;
        connection.query(
            'SELECT updateCategory('+ data.id +', \"'+ data.libelle +'\")'
        , callback);
    })
}

module.exports.DeleteCategory = function (data, callback) {
    database.getConnection(function (err, connection) {
        connection.query('DELETE FROM category WHERE id = '+ data.id, callback);
    });
}
/* ---------------------------------- */

/* ---------------------------------- */
/* Product handle */

module.exports.CreateProduct = function (data, callback) {
    database.getConnection(function (err, connection) {
        connection.query(
              'INSERT INTO product (libelle, photo, description, price, id_category)'
            + 'VALUES (\"'+ data.libelle +'\", \"'+ data.photo +'\", \"'+ data.description +'\", '+ data.price +', '+ data.id_category +')'
        , callback);
    });
}

/* ---------------------------------- */