// Karma configuration
// Generated on 2017-01-12

module.exports = function(config) {
  'use strict';

  config.set({
    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,

    // base path, that will be used to resolve files and exclude
    basePath: '../',

    // testing framework to use (jasmine/mocha/qunit/...)
    // as well as any additional frameworks (requirejs/chai/sinon/...)
    frameworks: [
      'jasmine'
    ],

    // list of files / patterns to load in the browser
    files: [
      // bower:js
      'bower_components/jquery/dist/jquery.js',
      'bower_components/angular/angular.js',
      'bower_components/bootstrap/dist/js/bootstrap.js',
      'bower_components/angular-animate/angular-animate.js',
      'bower_components/angular-ui-router/release/angular-ui-router.js',
      'bower_components/angular-bootstrap/ui-bootstrap-tpls.js',
      'bower_components/angular-loading-bar/build/loading-bar.js',
      'bower_components/ng-notify/src/scripts/ng-notify.js',
      'bower_components/angular-block-ui/dist/angular-block-ui.js',
      'bower_components/ngstorage/ngStorage.js',
      'bower_components/angularUtils-pagination/dirPagination.js',
      'bower_components/pnotify/dist/pnotify.js',
      'bower_components/pnotify/dist/pnotify.animate.js',
      'bower_components/pnotify/dist/pnotify.buttons.js',
      'bower_components/pnotify/dist/pnotify.callbacks.js',
      'bower_components/pnotify/dist/pnotify.confirm.js',
      'bower_components/pnotify/dist/pnotify.desktop.js',
      'bower_components/pnotify/dist/pnotify.history.js',
      'bower_components/pnotify/dist/pnotify.mobile.js',
      'bower_components/pnotify/dist/pnotify.nonblock.js',
      'bower_components/nodep-date-input-polyfill/nodep-date-input-polyfill.dist.js',
      'bower_components/angular-permission/dist/angular-permission.js',
      'bower_components/angular-permission/dist/angular-permission-ui.js',
      'bower_components/angular-permission/dist/angular-permission-ng.js',
      'bower_components/tg-angular-validator/dist/angular-validator.js',
      'bower_components/angular-ui-mask/dist/mask.js',
      'bower_components/angular-drag-and-drop-lists/angular-drag-and-drop-lists.js',
      'bower_components/angular-smart-table/dist/smart-table.js',
      'bower_components/angular-sanitize/angular-sanitize.js',
      'bower_components/ng-csv/build/ng-csv.min.js',
      'bower_components/jspdf/dist/jspdf.debug.js',
      'bower_components/jspdf-autotable/dist/jspdf.plugin.autotable.js',
      'bower_components/angular-mocks/angular-mocks.js',
      // endbower
      'app/scripts/**/*.js',
      'test/mock/**/*.js',
      'test/spec/**/*.js'
    ],

    // list of files / patterns to exclude
    exclude: [
    ],

    // web server port
    port: 8080,

    // Start these browsers, currently available:
    // - Chrome
    // - ChromeCanary
    // - Firefox
    // - Opera
    // - Safari (only Mac)
    // - PhantomJS
    // - IE (only Windows)
    browsers: [
      'PhantomJS'
    ],

    // Which plugins to enable
    plugins: [
      'karma-phantomjs-launcher',
      'karma-jasmine'
    ],

    // Continuous Integration mode
    // if true, it capture browsers, run tests and exit
    singleRun: false,

    colors: true,

    // level of logging
    // possible values: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
    logLevel: config.LOG_INFO,

    // Uncomment the following lines if you are using grunt's server to run the tests
    // proxies: {
    //   '/': 'http://localhost:9000/'
    // },
    // URL root prevent conflicts with the site root
    // urlRoot: '_karma_'
  });
};
