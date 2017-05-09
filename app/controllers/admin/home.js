var express = require('express'),
  router = express.Router(),
  db = require('../../../config/db'),
  multiparty = require('multiparty'),
  util = require('util'),
  fs = require('fs');

module.exports = function (app) {
  app.use('/admin', router);
};

router.get('/', function (req, res, next) {
  res.render('admin/index', {
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