module.exports = function(config) {

  config.set({
    basePath: '',
    frameworks: ['jasmine'],
    files: [
      'test/lib/jquery/dist/jquery.min.js',
      'test/lib/angular/angular.min.js',
      'src/bootstrap-tagsinput.js',
      'src/bootstrap-tagsinput-angular.js',
      'test/helpers.js',
      { pattern: 'test/bootstrap-tagsinput/*.tests.js' }
    ],
    reporters: ['progress'],
    port: 9876,
    logLevel: config.LOG_DEBUG,
    captureTimeout: 60000
  });

};
