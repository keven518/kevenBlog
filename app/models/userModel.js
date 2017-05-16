var mod = {
  user:{
    insert:'INSERT INTO user(id, name, age) VALUES(0,?,?)',
    update:'update user set name=?, age=? where id=?',
    delete: 'delete from user where id=?',
    queryById: 'select * from user where id=?',
    queryAll: 'select * from user'
  },
  article:{
    insert:'INSERT INTO kvblog_article(id, name, age) VALUES(0,?,?)',
    update:'update kvblog_article set name=?, age=? where id=?',
    delete: 'delete from kvblog_article where id=?',
    queryById: 'select * from kvblog_article where id=?',
    queryAll: 'select * from kvblog_article'
  }
};

module.exports = mod;