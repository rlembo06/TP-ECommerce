var express = require('express');
var database = require('../database/database');

module.exports.All = function (callback) {
    database.getConnection(function (err, connection) {
        if (err) throw err; 
        connection.query('SELECT * FROM user', callback);
    })
}

module.exports.Login = function (data, callback) {
    database.getConnection(function (err, connection) {
        connection.query('SELECT COUNT(*) AS result FROM user WHERE username = \"' + data.username + '\" AND password = \"' + data.password + '\"', callback);
    });
}
