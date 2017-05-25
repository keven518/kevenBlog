/**
 * Created by Administrator on 2016/7/19.
 */
// 连接MySQL
var mysql = require('mysql');
var pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'kvblog'
});

function query(sql, arr, callback) {
    pool.getConnection(function (err, connection) {
        // Use the connection
        connection.query(sql, arr, function (err, rows) {
            callback(err, rows);
            connection.release();//释放链接
        });
    });
}
exports.query = query;