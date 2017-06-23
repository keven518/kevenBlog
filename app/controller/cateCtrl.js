var pool = require('../../config/conn');
var cate_model = require('../model/cateModel');
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
var data = req.body['items'];
console.log(data);
// // console.log(typeof data);
if(typeof data=='string'){
connection.query(cate_model.insert, [data,0], function(err, result) {
var result = {
code: 200,
msg:'插入成功'
};
//返回结果
callback(res, result);

// 释放连接
connection.release();
});
}else{
for(var i=0;i<data.length;i++){
var name = data[i];
connection.query(cate_model.insert, [name,3], function(err, result) {

});
if(i==(data.length-1)){
var result = {
code: 200,
msg:'插入成功'
};
//返回结果
callback(res, result);

// 释放连接
connection.release();
}else{
continue;
}
}
}

});
},

truncate: function(req,res){
  pool.getConnection(function(err, connection) {
    connection.query(cate_model.truncate, function(err, result) {
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