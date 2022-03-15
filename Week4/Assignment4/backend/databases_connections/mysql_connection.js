var mysql = require('mysql');
require('dotenv').config()

var mysqlConnection = mysql.createPool({
    host     : `${process.env.MYSQL_HOST}`,
    user     : `${process.env.MYSQL_USER}`,
    password : `${process.env.MYSQL_PASSWORD}`,
    database : `${process.env.MYSQL_DATABASE}` 
});

mysqlConnection.getConnection(function (err){
    if(err){
        console.log(' Error connecting to database',err);
    } else {
        console.log(' Conected to MySQL ');
    }
});

module.exports = mysqlConnection;