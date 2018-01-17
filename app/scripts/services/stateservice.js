'use strict';

/**
 * @ngdoc service
 * @name marketingCertoApp.StateService
 * @description
 * # StateService
 * Service in the marketingCertoApp.
 */
angular.module('marketingCertoApp')
  .service('StateService', ['$http', 'AuthService', function ($http, authService) {
    var ip = authService.ip;
    this.getStates = function(){
      return $http.get(ip + 'estados');
    };

    this.getCities = function(stateId){
      return $http.get(ip + 'estados/' + stateId + '/municipios');
    };

    this.findCep = function(cep){
      return $http.get('https://viacep.com.br/ws/' + cep + '/json/');
    };
  }]);
