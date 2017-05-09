var path = require('path'),
    rootPath = path.normalize(__dirname + '/..'),
    env = process.env.NODE_ENV || 'development';

var config = {
  development: {
    root: rootPath,
    app: {
      name: 'demo'
    },
    port: process.env.PORT || 3010,
  },

  test: {
    root: rootPath,
    app: {
      name: 'demo'
    },
    port: process.env.PORT || 3010,
  },

  production: {
    root: rootPath,
    app: {
      name: 'demo'
    },
    port: process.env.PORT || 3010,
  }
};

module.exports = config[env];
