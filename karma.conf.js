// Karma configuration
// Generated on Fri Jan 31 2014 23:22:38 GMT+0000 (GMT)

module.exports = function(config) {
  config.set({

    basePath: '',

    frameworks: ['jasmine'],

    files: [
      'app/scripts/vendor/jquery-1.9.1.min.js',
      'app/scripts/vendor/angular.js',
      'app/scripts/vendor/angular-extensions/*.js',
      'app/scripts/**/*.js',
      'test/spec/**/*.spec.coffee'
    ],

    exclude: [
      'app/scripts/vendor/jquery-plugins/*.js',
      'app/scripts/vendor/jquery-plugins/jquery.*.js',
      'test/spec/compiled/*.*'
    ],

    preprocessors: {
      '**/*.coffee': ['coffee']
    },

    coffeePreprocessor: {
      options: {
        bare: true
      },
      transformPath: function(path) {
        return path.replace(/\.coffee$/, '.js');
      }
    },

    reporters: ['progress'],
    // possible values: 'dots', 'progress', 'junit', 'growl', 'coverage'

    port: 9876,

    colors: true,

    logLevel: config.LOG_INFO,
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG

    autoWatch: true,

    browsers: ['Chrome', 'PhantomJS'],


    captureTimeout: 60000,

    singleRun: false
  });
};
