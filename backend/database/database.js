var mysql = require('mysql');

var pool = mysql.createPool({
	connectionLimit : 100, //important
	host: 'localhost',
	user: 'test',
	password: 'test',
	database: 'ecommerce'
});

module.exports = pool;