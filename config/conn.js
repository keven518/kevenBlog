var mysql = require('mysql');
var conf = require('./database');
//使用连接池的方式连接,并将句柄返回，
module.exports = mysql.createPool(conf.mysql);