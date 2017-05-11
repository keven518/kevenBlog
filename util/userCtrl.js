module.exports = {
//添加数据的方法
 add: function (req, res) {
   var param = req.query || req.params;
   console.log(req.params)
 }

}