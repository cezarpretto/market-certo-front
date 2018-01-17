'use strict';

/**
 * @ngdoc directive
 * @name marketingCertoApp.directive:convertToNumber
 * @description
 * # convertToNumber
 */
angular.module('marketingCertoApp')
  .directive('convertToNumber', function() {
    return {
      require: 'ngModel',
      link: function(scope, element, attrs, ngModel) {
        ngModel.$parsers.push(function(val) {
          return parseInt(val, 10);
        });
        ngModel.$formatters.push(function(val) {
          return '' + val;
        });
      }
    };
  });
