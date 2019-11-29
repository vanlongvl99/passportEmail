

var mysql = require('mysql');
var dbcofig = require('./confi.js');
// var connection = mysql.createConnection({
    // 'host': 'localhost',
    // 'user': 'root',
    // 'password': 'vanlong99'
// });

var connection = mysql.createConnection(dbcofig.connect);
// connection.query('CREATE DATABASE abc;')
connection.query('CREATE DATABASE ' + dbcofig.database + ";");

connection.query('use ' + dbcofig.database + ";");

connection.query('CREATE TABLE ' + dbcofig.userTable + ' ( `id` INT UNSIGNED NOT NULL AUTO_INCREMENT, \
                                            `name` VARCHAR(20) NOT NULL, \
                                            `email` CHAR(60) NOT NULL, \
                                            `password` CHAR(60) NOT NULL, \
                                                  PRIMARY KEY (`id`), \
                                            UNIQUE INDEX `id_UNIQUE` (`id` ASC), \
                                            UNIQUE INDEX `name_UNIQUE` (`name` ASC) \
                                            UNIQUE INDEX `email_UNIQUE` (`email` ASC) \
                                            )');
console.log("Tao bang thanh cong");
connection.end();