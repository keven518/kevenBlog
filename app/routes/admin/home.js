var express = require('express'),
  router = express.Router(),
  db = require('../../../config/db'),
  multiparty = require('multiparty'),
  fs = require('fs'),
  userCtrl = require('../../controller/userCtrl'),
  cate_controller = require('../../controller/cateCtrl');
  article_controller = require('../../controller/artCtrl');

module.exports = function (app) {
  app.use('/admin', router);
};

router.get('/', function (req, res, next) {
  res.render('admin/index', {
    title: 'admin',
    name: '柯文'
  });
});

router.get('/main', function (req, res, next) {
  res.render('admin/main', {
    title: 'admin',
    name: '柯文'
  });
});

router.get('/addArticle', function (req, res, next) {
  res.render('admin/addArticle', {
    title: 'admin',
    name: '柯文'
  });
});

router.get('/addCate', function (req, res, next) {
  res.render('admin/addCate', {
    title: '添加顶级分类',
    name: '柯文'
  });
});

router.get('/login', function (req, res, next) {
  res.render('admin/login', {
    title: 'admin',
    name: '柯文'
  });
});

// 增加用户
//TODO 同时支持get,post
router.get('/addUser/:name', function(req, res, next) {
  // userCtrl.add(req, res, next);
  res.send('addUser' + userCtrl.add(req, res));
});

router.get('/kvCate', function(req, res, next) {
  res.render('admin/kvCate', {
    title: 'admin',
    name: '柯文'
  });
})

router.post('/addTopCate', function(req, res, next) {
  cate_controller.addTop(req, res, next);
})

router.get('/kvArticle', function(req, res, next) {
  res.render('admin/kvArticle', {
    title: 'admin',
    name: '柯文'
  });
})

router.post('/addArticle', function(req, res, next) {
  article_controller.addTop(req, res, next);
})

router.get('/truncate', function(req, res, next) {
  cate_controller.truncate(req, res, next);
  // res.send('no such file or directory')
})

router.get('/ztree', function(req, res, next) {
  res.send('ztree');
})

/* GET home page. */
router.get('/ued', function(req, res, next) {
  res.render('admin/ued', { title: 'Express' });
});