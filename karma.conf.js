module.exports = function(config) {

  config.set({
    basePath: '',
    frameworks: ['jasmine'],
    files: [
      'lib/jquery/jquery.js',
      'lib/angular/angular.js',
      'dist/bootstrap-tagsinput.min.js',
      'dist/bootstrap-tagsinput-angular.min.js',
      'test/helpers.js',
      { pattern: 'test/bootstrap-tagsinput/*.tests.js' }
    ],
    reporters: ['progress'],
    port: 9876,
    logLevel: config.LOG_DEBUG,
    captureTimeout: 60000
  });

};
