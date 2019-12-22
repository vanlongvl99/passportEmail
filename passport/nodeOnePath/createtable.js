

var mysql = require('mysql');
var dbcofig = require('./config/config');


var connection = mysql.createConnection(dbcofig.connect);
connection.query('CREATE DATABASE ' + dbcofig.database + ";");

connection.query('use ' + dbcofig.database + ";");

console.log(dbcofig.usersTable);
connection.query('CREATE TABLE ' + dbcofig.usersTable + ' ( `id` INT UNSIGNED NOT NULL AUTO_INCREMENT, \
                                            `email` CHAR(60) NOT NULL, \
                                            `username` CHAR(60) NOT NULL, \
                                            `password` CHAR(60) NOT NULL, \
                                            `confirm` CHAR(60) NOT NULL, \
                                            `code` INT , \
                                            PRIMARY KEY (`id`),\
                                            UNIQUE INDEX `id_UNIQUE` (`id` ASC), \
                                            UNIQUE INDEX `email_UNIQUE` (`email` ASC), \
                                            UNIQUE INDEX `username_UNIQUE` (`username` ASC) \
                                            ) ;' );
connection.query('CREATE TABLE ' + dbcofig.roomsTable + ' ( `id` INT UNSIGNED NOT NULL AUTO_INCREMENT, \
                                            `nameRoom` CHAR(60) NOT NULL, \
                                            PRIMARY KEY (`id`),\
                                            UNIQUE INDEX `id_UNIQUE` (`id` ASC), \
                                            UNIQUE INDEX `nameRoom_UNIQUE` (`nameRoom` ASC) \
                                            ) ;' );

console.log("Tao bang thanh cong");
connection.end();