var express = require('express');
var path    = require('path');
var glob = require('glob');
var db = require('./db');
var favicon = require('serve-favicon');
var logger = require('morgan');
var moment = require('moment');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var compress = require('compression');
var methodOverride = require('method-override');
var http         = require('http');
var ueditor      = require('ueditor');

module.exports = function(app, config) {
  var env = process.env.NODE_ENV || 'development';
  app.locals.ENV = env;
  app.locals.ENV_DEVELOPMENT = env == 'development';
  
  app.set('views', config.root + '/app/views');
  app.set('view engine', 'ejs');

  var category = [];
  db.query('select * from kvblog_category where pid=0 AND status=1 ORDER BY id DESC', function (err, rows) {
    category = rows;
    console.log(rows);
  })
  app.use(function (req, res, next) {
    app.locals.kvName = '柯文万岁';
    app.locals.moment = moment; 
    app.locals.kvtTitle = '专注于WEB前端开发,分享前端开发教程和前端资讯'; 
    app.locals.category = category; 

    next();
  });

  // app.use(favicon(config.root + '/public/img/favicon.ico'));
  app.use(logger('dev'));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({
    extended: true
  }));
  app.use(cookieParser());
  app.use(compress());
  app.use(express.static(config.root + '/public'));
  app.use(methodOverride());

  //ueditor
  app.use("/libs/ueditor/ue", ueditor(path.join(path.resolve(__dirname, '..'), 'public'), function (req, res, next) {

      // ueditor 客户发起上传图片请求
      if (req.query.action === 'uploadimage') {
          var foo = req.ueditor;
          var date = new Date();
          var imgname = req.ueditor.filename;

          var img_url = '/images/ueditor/'; 
          console.log('单图片上传: ');
          console.log('path: ')
          console.log(path.join(path.resolve(__dirname, '..'), 'public'));
          console.log(img_url);
          res.ue_up(img_url); //你只要输入要保存的地址 。保存操作交给ueditor来做
          res.setHeader('Content-Type', 'text/html');//IE8下载需要设置返回头尾text/html 不然json返回文件会被直接下载打开
      }

      //  客户端发起图片列表请求
      else if (req.query.action === 'listimage') {
          var dir_url = '/images/ueditor/';
          console.log('多图片上传: ');
          console.log(dir_url);
          res.ue_list(dir_url);  // 客户端会列出 dir_url 目录下的所有图片
      }

      // 客户端发起其它请求
      else {

          res.setHeader('Content-Type', 'application/json');
          res.redirect('/libs/ueditor/nodejs/config.json')
      }

  }));

  var controllers = glob.sync(config.root + '/app/routes/**/*.js');
  controllers.forEach(function (controller) {
    require(controller)(app);
  });

  app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
  });
  
  if(app.get('env') === 'development'){
    app.use(function (err, req, res, next) {
      res.status(err.status || 500);
      res.render('error', {
        message: err.message,
        error: err,
        title: 'error'
      });
    });
  }

  app.use(function (err, req, res, next) {
    res.status(err.status || 500);
      res.render('error', {
        message: err.message,
        error: {},
        title: 'error'
      });
  });

  return app;
};
