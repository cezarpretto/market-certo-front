'use strict';

/**
 * @ngdoc function
 * @name marketingCertoApp.controller:AppctrlCtrl
 * @description
 * # AppctrlCtrl
 * Controller of the marketingCertoApp
 */
angular.module('marketingCertoApp')
  .controller('AppCtrl', ['$scope', '$rootScope', 'AuthService', function ($scope, $rootScope, authService) {
    authService.isLoggedIn();
    $scope.showMenu = false;
    $scope.year = new Date().getFullYear();
    $scope.loggedUser = authService.loggedUser;
    $scope.selectedCompany = authService.selectedCompany;
    $scope.auth = authService;

    $scope.$watch('auth.loggedUser', function(newV){
      if(newV !== null){
        $scope.loggedUser = newV;
        $scope.showMenu = true;
      }else {
        $scope.loggedUser = newV;
        $scope.showMenu = false;
      }
    });

    $scope.logout = function(){
      authService.logout();
    };

    $scope.$watch('auth.selectedCompany', function(newV){
      if(newV !== null){
        $scope.selectedCompany = newV;
      } else {
        $scope.selectedCompany = newV;
      }
    });
  }]);
