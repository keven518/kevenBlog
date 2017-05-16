var pool = require('../config/conn');
var user_model = require('../app/models/userModel');
// 向前台返回JSON
var callback = require('./callback');
module.exports = {
//添加数据的方法
 find: function (req, res) {
//获取连接
  pool.getConnection(function(err, connection) {
// 获取前台页面传过来的参数
   var param = req.query || req.params;
//执行插入语句
   connection.query(user_model.article.queryAll, function(err, result) {
   console.log(err);
   if(!result) {
    result = {
    code: 200,
    msg:'查找失败'
    };
   }
//返回结果
   callback(res, result);
// 释放连接
   connection.release();
   });
  });
 }
};