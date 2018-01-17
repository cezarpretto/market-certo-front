'use strict';

/**
 * @ngdoc function
 * @name marketingCertoApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the marketingCertoApp
 */
angular.module('marketingCertoApp')
  .controller('LoginCtrl', ['$scope', 'AuthService', 'growl', function ($scope, authService, growl) {
    $scope.userLogin = {
      celular: undefined,
      senha: undefined
    }

    $scope.logar = function(){
      authService.logar($scope.userLogin).then(function(data){
        // console.log(data);
      }).catch(function(err){
        console.error(err);
        if(err.status !== 401){
          growl.error(err.data.message);
        }
      })
    };
  }]);
