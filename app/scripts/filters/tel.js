'use strict';

/**
 * @ngdoc filter
 * @name marketingCertoApp.filter:tel
 * @function
 * @description
 * # tel
 * Filter in the marketingCertoApp.
 */
angular.module('marketingCertoApp')
  .filter('tel', function() {
    return function(input) {
      var prefixo = input.substring(0, 2);
      var primeiro = '';
      var segundo = '';
      if (input.length === 11) {
        primeiro = input.substring(2, 7);
        segundo = input.substring(7, input.length);
      } else {
        primeiro = input.substring(2, 6);
        segundo = input.substring(6, input.length);
      }
      var resultado = '(' + prefixo + ') ' + primeiro + '-' + segundo
      return resultado;
    };
  });
