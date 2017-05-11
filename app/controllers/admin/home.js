var express = require('express'),
  router = express.Router(),
  db = require('../../../config/db'),
  multiparty = require('multiparty'),
  util = require('util'),
  fs = require('fs'),
  userCtrl = require('../../../util/userCtrl');

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