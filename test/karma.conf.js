// Karma configuration
// http://karma-runner.github.io/0.12/config/configuration-file.html
// Generated on 2016-07-25 using
// generator-karma 1.0.1

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
      "jasmine"
    ],

    // list of files / patterns to load in the browser
    files: [
      // bower:js
      'bower_components/jquery/dist/jquery.js',
      'bower_components/angular/angular.js',
      'bower_components/bootstrap/dist/js/bootstrap.js',
      'bower_components/angular-animate/angular-animate.js',
      'bower_components/angular-cookies/angular-cookies.js',
      'bower_components/angular-resource/angular-resource.js',
      'bower_components/angular-route/angular-route.js',
      'bower_components/angular-sanitize/angular-sanitize.js',
      'bower_components/angular-touch/angular-touch.js',
      'bower_components/bootstrap-slider/bootstrap-slider.js',
      'bower_components/chart.js/Chart.js',
      'bower_components/ckeditor/ckeditor.js',
      'bower_components/bootstrap-colorpicker/dist/js/bootstrap-colorpicker.js',
      'bower_components/datatables.net/js/jquery.dataTables.js',
      'bower_components/datatables.net-bs/js/dataTables.bootstrap.js',
      'bower_components/bootstrap-datepicker/dist/js/bootstrap-datepicker.js',
      'bower_components/moment/moment.js',
      'bower_components/bootstrap-daterangepicker/daterangepicker.js',
      'bower_components/fastclick/lib/fastclick.js',
      'bower_components/Flot/jquery.flot.js',
      'bower_components/fullcalendar/dist/fullcalendar.js',
      'bower_components/inputmask/dist/inputmask/inputmask.js',
      'bower_components/inputmask/dist/inputmask/inputmask.extensions.js',
      'bower_components/inputmask/dist/inputmask/inputmask.date.extensions.js',
      'bower_components/inputmask/dist/inputmask/inputmask.numeric.extensions.js',
      'bower_components/inputmask/dist/inputmask/inputmask.phone.extensions.js',
      'bower_components/inputmask/dist/inputmask/jquery.inputmask.js',
      'bower_components/inputmask/dist/inputmask/global/document.js',
      'bower_components/inputmask/dist/inputmask/global/window.js',
      'bower_components/inputmask/dist/inputmask/phone-codes/phone.js',
      'bower_components/inputmask/dist/inputmask/phone-codes/phone-be.js',
      'bower_components/inputmask/dist/inputmask/phone-codes/phone-nl.js',
      'bower_components/inputmask/dist/inputmask/phone-codes/phone-ru.js',
      'bower_components/inputmask/dist/inputmask/phone-codes/phone-uk.js',
      'bower_components/inputmask/dist/inputmask/dependencyLibs/inputmask.dependencyLib.jqlite.js',
      'bower_components/inputmask/dist/inputmask/dependencyLibs/inputmask.dependencyLib.jquery.js',
      'bower_components/inputmask/dist/inputmask/dependencyLibs/inputmask.dependencyLib.js',
      'bower_components/inputmask/dist/inputmask/bindings/inputmask.binding.js',
      'bower_components/ion.rangeSlider/js/ion.rangeSlider.js',
      'bower_components/jquery-knob/js/jquery.knob.js',
      'bower_components/eve-raphael/eve.js',
      'bower_components/raphael/raphael.min.js',
      'bower_components/mocha/mocha.js',
      'bower_components/morris.js/morris.js',
      'bower_components/PACE/pace.js',
      'bower_components/select2/select2.js',
      'bower_components/jquery-slimscroll/jquery.slimscroll.js',
      'bower_components/jquery-slimscroll/jquery.slimscroll.min.js',
      'bower_components/bootstrap-timepicker/js/bootstrap-timepicker.js',
      'bower_components/jquery-sparkline/dist/jquery.sparkline.js',
      'bower_components/jquery-ui/jquery-ui.js',
      'bower_components/angular-input-masks/angular-input-masks-standalone.js',
      'bower_components/angular-growl-v2/build/angular-growl.js',
      'bower_components/angular-loading-bar/build/loading-bar.js',
      'bower_components/angular-smart-table/dist/smart-table.js',
      'bower_components/angular-base64-upload/src/angular-base64-upload.js',
      'bower_components/angular-paginate-anything/dist/paginate-anything-tpls.js',
      'bower_components/angular-i18n/angular-locale_pt-br.js',
      'bower_components/angular-select2/dist/angular-select2.js',
      'bower_components/cp-functions/main.js',
      'bower_components/angular-xeditable/dist/js/xeditable.js',
      'bower_components/angular-bootstrap-confirm/dist/angular-bootstrap-confirm.js',
      'bower_components/angular-bootstrap/ui-bootstrap-tpls.js',
      'bower_components/angular-mocks/angular-mocks.js',
      // endbower
      "app/scripts/**/*.js",
      "test/mock/**/*.js",
      "test/spec/**/*.js"
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
      "PhantomJS"
    ],

    // Which plugins to enable
    plugins: [
      "karma-phantomjs-launcher",
      "karma-jasmine"
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
