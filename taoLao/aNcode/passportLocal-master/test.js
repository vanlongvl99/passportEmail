const mysql = require('mysql');

var connection = mysql.createConnection({
    'host': 'localhost',
    'user': 'root',
    'password': 'vanlong99'
});

connection.query("CREATE database vanlong;");
connection.query("USE vanlong");
connection.query("CREATE TABLE A");