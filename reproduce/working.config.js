var glob = require('../index.js');

module.exports = function(config) {
  config.set({
    basePath: '',
    frameworks: [
        'jasmine',
    ],
    files: glob([
        'app/scripts/abc/**/*.js',
        'app/**/*.js',
        'test/spec.js',
    ]),
    exclude: [],
    port: 8080,
    logLevel: config.LOG_DEBUG,
    browsers: ['Chrome'],
    plugins: [
        'karma-chrome-launcher',
        'karma-jasmine',
    ],
    singleRun: false,
  });
};
