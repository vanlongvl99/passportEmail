

var mysql = require('mysql');
var dbcofig = require('./config/config');
// var connection = mysql.createConnection({
    // 'host': 'localhost',
    // 'user': 'root',
    // 'password': 'vanlong99'
// });

// console.log(dbcofig.connect)
// 
// console.log(dbcofig.database);

var connection = mysql.createConnection(dbcofig.connect);
connection.query('CREATE DATABASE ' + dbcofig.database + ";");

connection.query('use ' + dbcofig.database + ";");

connection.query('CREATE TABLE ' + dbcofig.userTable + ' ( `id` INT UNSIGNED NOT NULL AUTO_INCREMENT, \
                                            `name` VARCHAR(20) NOT NULL, \
                                            `email` CHAR(60) NOT NULL, \
                                            `password` CHAR(60) NOT NULL, \
                                            PRIMARY KEY (`id`)) ;' );
console.log("Tao bang thanh cong");
connection.end();