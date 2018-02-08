module.exports = config => {
  config.set({
    basePath: './',
    frameworks: ['mocha', 'dirty-chai', 'sinon-chai'],
    files: [
      'node_modules/es6-shim/es6-shim.js',
      './src/mower.spec.js',
    ],
    preprocessors: {
      './src/mower.spec.js': ['webpack'],
    },
    webpack: require('./webpack.conf.js'),
    webpackMiddleware: {
      noInfo: true,
    },
    autoWatch: false,
    singleRun: true,
    reporters: ['spec'],
    browsers: ['PhantomJS'],
    plugins: [
      require('karma-webpack'),
      require('karma-mocha'),
      require('karma-chai'),
      require('karma-sinon'),
      require('karma-sinon-chai'),
      require('karma-chai-as-promised'),
      require('karma-phantomjs-launcher'),
      require('karma-dirty-chai'),
      require('karma-spec-reporter'),
    ],
  });
};
