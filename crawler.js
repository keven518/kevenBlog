var http = require('http'),
cheerio = require('cheerio'),
url = 'http://www.imooc.com/learn/348';

function filterChapters(html) {
  var $ = cheerio.load(html),
  chapters = $('.mod-chapters'),
  courseData = [];
  chapters.each(function(item) {
    var chapter = $(this),
        chapterTitle = chapter.find('strong').text(),
        videos = chapter.find('.video').children('li'),
        chapterData = {
        chapterTitle: chapterTitle,
        videos: []
        };
    videos.each(function(item) {
      var video = $(this).find('.J-media-item'),
          videoTitle = video.text(),
          id = video.attr('href').split('video/')[1];
      chapterData.videos.push({
        title: videoTitle,
        id: id
      })
    })

    courseData.push(chapterData)
  })

  return courseData
}

function printCourseInfo(courseData) {
  courseData.forEach(function(item) {
    var chapterTitle = item.chapterTitle;
    console.log(chapterTitle + '\n');
    item.videos.forEach(function(video) {
      console.log(' [' + video.id + ']' + video.title + '\n')
    })
  })
}

http.get(url, function(res) {
  var html = '';
  res.on('data', function(data) {
    html += data;
  });

  res.on('end', function() {
    // console.log(html);
    var courseData = filterChapters(html);
    printCourseInfo(courseData)
  })
}).on('error', function() {
  console.log('错误');
})