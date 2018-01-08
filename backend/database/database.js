var mysql = require('mysql');

var pool = mysql.createPool({
	connectionLimit : 100, //important
	host: 'localhost',
	user: 'root',
	password: 'root',
	database: 'ecommerce'
});

module.exports = pool;
