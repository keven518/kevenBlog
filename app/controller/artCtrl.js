var pool = require('../../config/conn');
var article_model = require('../model/articleModel');
// 向前台返回JSON
var callback = function (res, ret) {
if(typeof ret === 'undefined') {
res.json({
code:'-1',
msg: '操作失败'
});
} else {
res.json(ret);
}
};

module.exports = {
addTop:function(req,res){
pool.getConnection(function(err, connection) {
// 获取前台页面传过来的参数
// console.log(req.body);

//执行插入语句
var title = req.body.title;
var content = req.body.editorValue;
console.log(req.body);
// // console.log(typeof data);
connection.query(article_model.insert, [title, content], function(err, result) {
var result = {
code: 200,
msg:'插入成功'
};
//返回结果
callback(res, result);

// 释放连接
connection.release();
});


});
},

truncate: function(req,res){
  pool.getConnection(function(err, connection) {
    connection.query(article_model.truncate, function(err, result) {
      var result = {
      code: 201,
      msg:'删除成功'
      };
      //返回结果
      callback(res, result);

      // 释放连接
      connection.release();
    })
  })
}

};