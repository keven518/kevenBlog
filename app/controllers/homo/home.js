var express = require('express'),
  router = express.Router(),
  db = require('../../../config/db'),
  Article = require('../../models/article'),
  multiparty = require('multiparty'),
  user_controller = require('../../../util/userCtrl'),
  article_controller = require('../../../util/articleCtrl'),
  util = require('util'),
  fs = require('fs');

module.exports = function (app) {
  app.use('/', router);
};

router.get('/addUser', function(req, res, next) {
 user_controller.add(req, res, next);
});

router.get('/', function (req, res, next) {});

// router.get('/', function (req, res, next) {
//   var articles = [new Article(), new Article()];
//   var data = [];
//   db.query('select * from kvblog_article LIMIT 0,10', function (err, rows) {
//       if (err) {
//           res.json({});  // this renders "views/users.html"
//       } else {
//           data = rows;
//           res.render('index', {
//             title: 'Generator-Express MVC',
//             articles: articles,
//             jsArr: ['index'],
//             data: data
//           });
//       }
//   })
// });
// /**
//  * ²éÑ¯ÁÐ±íÒ³
//  */
router.get('/kv', function (req, res, next) {
    article_controller.find(req, res, next);
});
// /**/
// router.get('/add', function(req, res, next) {
//     db.query("insert into kvblog_article(title,click) values('¿ÂÎÄ', 1000)", function (err, rows) {
//         if (err) {
//             res.end('ÐÂÔöÊ§°Ü£º' + err);
//         } else {
//             res.send('ok');
//         }
//     })
//     // res.send('add');
  
// })

// /* ÉÏ´«Ò³Ãæ */
// router.get('/upload', function(req, res, next) {
//   res.render('upload', { title: 'Express' });
// });

// /* ÉÏ´«*/
// router.post('/file/uploading', function(req, res, next){
//   //Éú³Émultiparty¶ÔÏó£¬²¢ÅäÖÃÉÏ´«Ä¿±êÂ·¾¶
//   var form = new multiparty.Form({uploadDir: './public/files/'});
//   //ÉÏ´«Íê³Éºó´¦Àí
//   form.parse(req, function(err, fields, files) {
//     var filesTmp = JSON.stringify(files,null,2);

//     if(err){
//       console.log('parse error: ' + err);
//     } else {
//       console.log('parse files: ' + filesTmp);
//       var inputFile = files.inputFile[0];
//       var uploadedPath = inputFile.path;
//       var dstPath = './public/files/' + inputFile.originalFilename;
//       console.log('inputFile:');
//       console.log(inputFile);
//       //ÖØÃüÃûÎªÕæÊµÎÄ¼þÃû
//       fs.rename(uploadedPath, dstPath, function(err) {
//         if(err){
//           console.log('rename error: ' + err);
//         } else {
//           console.log('rename ok');
//         }
//       });
//     }

//     res.writeHead(200, {'content-type': 'text/plain;charset=utf-8'});
//     res.write('received upload:\n\n');
//     res.end(util.inspect({fields: fields, files: filesTmp}));
//  });
// });