'use strict';

/**
 * @ngdoc filter
 * @name marketingCertoApp.filter:cpfCnpj
 * @function
 * @description
 * # cpfCnpj
 * Filter in the marketingCertoApp.
 */
angular.module('marketingCertoApp')
  .filter('cpfCnpj', function() {
    return function(input) {
      if (input) {
        if (input.length === 14) {
          var primeiro = input.substring(0, 2);
          var segundo = input.substring(2, 5);
          var terceiro = input.substring(5, 8);
          var quarto = input.substring(8, 12);
          var quinto = input.substring(12, 14);
          var resultado = primeiro + '.' + segundo + '.' + terceiro + '/' + quarto + '.' + quinto;
          return resultado;
        } else if (input.length === 11) {
          var primeiro = input.substring(0, 3);
          var segundo = input.substring(3, 6);
          var terceiro = input.substring(6, 9);
          var quarto = input.substring(9, 11);
          var resultado = primeiro + '.' + segundo + '.' + terceiro + '-' + quarto;
          return resultado;
        }
      }
    };
  });
