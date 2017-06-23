var article = {
insert:'insert into kvblog_article(title, content) values(?,?)',
update:'update kvblog_article set name=? where id=?',
delete: 'update kvblog_article set isdel=1 where id=?',
select: 'select * from kvblog_article where isdel=0',
truncate: 'truncate table kvblog_article'
};

module.exports = article;