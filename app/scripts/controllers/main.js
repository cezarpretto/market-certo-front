'use strict';

/**
 * @ngdoc function
 * @name marketingCertoApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the marketingCertoApp
 */
angular.module('marketingCertoApp')
  .controller('MainCtrl', ['$scope', 'AuthService', 'UserModel', function($scope, authService) {
    authService.isLoggedIn();
    $scope.countValue = 0;

    $scope.vue = new Vue({
      el: 'simple-counter',
      methods: {
        updateAngularScopeProperty: function(value) {
          $scope.$apply(function() {
            $scope.countValue = value;
          });
        }
      }
    })
  }]);
