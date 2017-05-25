var express = require('express'),
  router = express.Router(),
  db = require('../../config/db'),
  Article = require('../models/article'),
  multiparty = require('multiparty'),
  user_controller = require('../../util/userCtrl'),
  article_controller = require('../../util/articleCtrl'),
  util = require('util'),
  fs = require('fs');

module.exports = function (app) {
  app.use('/', router);
};


/**
 * 查询列表页
 */
router.get('/', function (req, res, next) {
  var data = [];
  db.query('select * from kvblog_article ORDER BY publishtime DESC', function (err, rows) {
      if (err) {
          res.json({});  // this renders "views/users.html"
      } else {
          data = rows;


          var pageNum = Math.abs(parseInt(req.query.page || 1, 10));
          var pageSize = 10;

          var totalCount = data.length;
          var pageCount = Math.ceil(totalCount / pageSize);

          if (pageNum > pageCount) {
            pageNum = pageCount;
          }
          
          // res.send('req');

          res.render('home/index', {
            title: 'Generator-Express MVC',
            jsArr: ['page/query', 'page/paging'],
            cssArr: ['css/paging.css', 'private/index.css'],
            totalCount: totalCount,
            current: req.query.page || 1,
            data: data.slice((pageNum - 1) * pageSize, pageNum * pageSize)
          });
      }
  })
});