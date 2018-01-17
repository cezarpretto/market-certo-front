'use strict';

/**
 * @ngdoc directive
 * @name marketingCertoApp.directive:mcHeader
 * @description
 * # mcHeader
 */
angular.module('marketingCertoApp')
  .directive('otHeader', function () {
    return {
      templateUrl: 'views/mc-header-view.html',
      restrict: 'E',
      scope:{
        otTitulo: '@',
        otIcone: '@'
      },
      link: function postLink(scope, element, attrs) {

      }
    };
  });
