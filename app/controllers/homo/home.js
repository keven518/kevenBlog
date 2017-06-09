var express = require('express'),
  router = express.Router(),
  db = require('../../../config/db'),
  Article = require('../../models/article'),
  multiparty = require('multiparty'),
  user_controller = require('../../../util/userCtrl'),
  article_controller = require('../../../util/articleCtrl'),
  util = require('util'),
  fs = require('fs'),
  nodemailer = require('nodemailer');

module.exports = function (app) {
  app.use('/home', router);
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

router.get('/show/:id', function (req, res, next) {
  // res.send('kv')
  db.query("select * from kvblog_article WHERE id=?", [req.params.id], function (err, rows) {
    if (err) {
      res.end('新增失败：' + err);
    } else {      
      // res.send('req.params');
      // res.send(rows[0]);
      res.render('home/show', {
        title: 'Generator-Express MVC',
        jsArr: [],
        cssArr: ['private/show.css'],
        data: rows[0]
      })


    }
  })
})

router.get('/sh/:id', function (req, res, next) {
  db.query("select * from kvblog_article WHERE id=?", [req.params.id], function (err, rows) {
    if (err) {
      res.end('新增失败：' + err);
    } else {      
      // res.send(req.params);
      res.send(rows[0]['content']);


    }
  })
})



/**
 * 新增页面跳转
 */
// router.get('/add', function(req, res, next) {
//     db.query("insert into kvblog_article(title,click) values('柯文万岁', 1000)", function (err, rows) {
//         if (err) {
//             res.end('新增失败：' + err);
//         } else {
//             res.send('ok');
//         }
//     })
//     // res.send('add');
  
// })

// /*  */
// router.get('/upload', function(req, res, next) {
//   res.render('upload', { title: 'Express' });
// });

// /* 上传*/
// router.post('/file/uploading', function(req, res, next){
//   //生成multiparty对象，并配置上传目标路径
//   var form = new multiparty.Form({uploadDir: './public/files/'});
//   //上传完成后处理
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
//       //重命名为真实文件名
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



router.get('/addUser', function(req, res, next) {
 user_controller.add(req, res, next);
});

/**
 * 查询列表页
 */
router.get('/kv', function (req, res, next) {
    article_controller.find(req, res, next);
});



/**/
router.get('/mail', function (req, res, next) {
  
  var transporter = nodemailer.createTransport({  
    service: 'qq',  
    port: 465, // SMTP 端口
    secureConnection: true, // 使用 SSL
    auth: {  
      user: '48655423@qq.com',  
      pass: 'vhveevmecddycahd' //授权码,通过QQ获取  
    
    }  
    });  
    var mailOptions = {  
      from: '48655423@qq.com', // 发送者  
      to: '957314724@qq.com,1967126223@qq.com,3121477827@qq.com,342077890@qq.com', // 接受者,可以同时发送多个,以逗号隔开  
      subject: '柯文邮件发送', // 标题  
      //text: 'Hello world', // 文本  
      html: `<h2>nodemailer基本使用:</h2><h3>  
      <a href="http://blog.csdn.net/zzwwjjdj1/article/details/51878392">  
      http://blog.csdn.net/zzwwjjdj1/article/details/51878392</a>
      <br/>
      祝早日收到offer 第三次发邮件了 0609。</h3>`   
    };  
    
    transporter.sendMail(mailOptions, function (err, info) {  
      if (err) {  
        console.log(err);  
        return;  
      }  
    ''
      console.log('发送成功'); 
      console.log(info); 
      res.send('发送成功: ' + JSON.stringify(info));
    });  
})

router.get('/yzm', function(req, res, next) {
    var ary = ccap.get();

    var txt = ary[0];

    var buf = ary[1];

    res.end(buf);

    console.log(txt);
})