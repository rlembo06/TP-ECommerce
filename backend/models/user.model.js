var express = require('express');
var database = require('../database/database');

module.exports.findAll = function(callback) {
    
    database.getConnection(function(err, connection) {
        connection.query("SELECT * FROM user", callback);
    });
}