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
        connection.query('SELECT COUNT(*) AS result FROM user WHERE username = \"'+ data.username +'\" AND password = MD5(\"'+ data.password +'\")', callback);
    });
}

module.exports.Create = function (data, callback) {
    database.getConnection(function (err, connection) {
        connection.query(
              'INSERT INTO user(username, password, email, firstname, lastname) '
            + ' VALUES(\"'+ data.username +'\", MD5(\"'+ data.password +'\"), \"'+ data.email +'\", \"'+ data.firstname +'\", \"'+ data.lastname +'\")'
        , callback);
    });
}
