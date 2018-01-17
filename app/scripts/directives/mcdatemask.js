'use strict';

/**
 * @ngdoc directive
 * @name marketingCertoApp.directive:mcDateMask
 * @description
 * # mcDateMask
 */
angular.module('marketingCertoApp')
  .directive('mcDateMask', ['$filter', function ($filter) {
    return {
  		require: "ngModel",
  		link: function (scope, element, attrs, ngModel) {
        ngModel.$parsers.push(function(val) {
          return $filter("date")(val, "yyyy-MM-dd");
        });
        ngModel.$formatters.push(function(val) {
          var ret = undefined;
          if(val !== undefined && val !== null) {
            var regex = RegExp('([0-9]{4})-([0-9]{2})-([0-9]{2})');
            if(regex.test(val)) {
              var match = val.match(regex);
              ret = new Date(Number(match[1]), (Number(match[2])=== 1?Number(match[2]):Number(match[2]) - 1), Number(match[3]));
            } else {
              ret = new Date(val);
            }
          }
          return ret;
        });
  		}
  	};
  }]);
