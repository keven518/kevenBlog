var express = require('express'),
  router = express.Router(),
  db = require('../../../config/db'),
  Article = require('../../models/article'),
  multiparty = require('multiparty'),
  util = require('util'),
  fs = require('fs');

module.exports = function (app) {
  app.use('/', router);
};

router.get('/', function (req, res, next) {
  var articles = [new Article(), new Article()];
  var data = [];
  db.query('select * from kvblog_article LIMIT 0,10', function (err, rows) {
      if (err) {
          res.json({});  // this renders "views/users.html"
      } else {
          data = rows;
          res.render('index', {
            title: 'Generator-Express MVC',
            articles: articles,
            jsArr: ['index'],
            data: data
          });
      }
  })
});
/**
 * 查询列表页
 */
router.get('/kv', function (req, res, next) {
    db.query('select * from kvblog_article LIMIT 0,10', function (err, rows) {
        if (err) {
            res.json({});  // this renders "views/users.html"
        } else {
            res.json(rows);
            // res.render('kv', {
            //   title: '柯文万岁',
            //   rows: rows
            // });
        }
    })
});
/**/
router.get('/add', function(req, res, next) {
    db.query("insert into kvblog_article(title,click) values('柯文', 1000)", function (err, rows) {
        if (err) {
            res.end('新增失败：' + err);
        } else {
            res.send('ok');
        }
    })
    // res.send('add');
  
})

/* 上传页面 */
router.get('/upload', function(req, res, next) {
  res.render('upload', { title: 'Express' });
});

/* 上传*/
router.post('/file/uploading', function(req, res, next){
  //生成multiparty对象，并配置上传目标路径
  var form = new multiparty.Form({uploadDir: './public/files/'});
  //上传完成后处理
  form.parse(req, function(err, fields, files) {
    var filesTmp = JSON.stringify(files,null,2);

    if(err){
      console.log('parse error: ' + err);
    } else {
      console.log('parse files: ' + filesTmp);
      var inputFile = files.inputFile[0];
      var uploadedPath = inputFile.path;
      var dstPath = './public/files/' + inputFile.originalFilename;
      console.log('inputFile:');
      console.log(inputFile);
      //重命名为真实文件名
      fs.rename(uploadedPath, dstPath, function(err) {
        if(err){
          console.log('rename error: ' + err);
        } else {
          console.log('rename ok');
        }
      });
    }

    res.writeHead(200, {'content-type': 'text/plain;charset=utf-8'});
    res.write('received upload:\n\n');
    res.end(util.inspect({fields: fields, files: filesTmp}));
 });
});