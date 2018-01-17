'use strict';

/**
 * @ngdoc function
 * @name marketingCertoApp.controller:SettingsCtrl
 * @description
 * # SettingsCtrl
 * Controller of the marketingCertoApp
 */
angular.module('marketingCertoApp')
  .controller('SettingsCtrl', ['$scope', 'AuthService', 'growl', 'UserService', 'UserModel', 'StateService', function($scope, authService, growl, userService, userModel, statesService) {
    authService.isLoggedIn();
    var loggedUser = authService.loggedUser;
    var selectedCompany = authService.selectedCompany;
    $scope.states = [];
    $scope.cities = [];
    $scope.user = new userModel.User();

    (function() {
      statesService.getStates().then(function(data) {
        $scope.states = data.data;
      }).catch(function(err) {
        console.error(err);
        growl.error(err.data);
      });

      userService.getUser(selectedCompany.id, loggedUser.cpf).then(function(data) {
        $scope.user = data.data[0];
        $scope.getCities($scope.user.municipio.estado.id);
      }).catch(function(err) {
        console.error(err);
      })
    }());

    $scope.getCities = function(stateId) {
      statesService.getCities(stateId).then(function(data) {
        $scope.cities = data.data;
      }).catch(function(err) {
        console.error(err);
        growl.error(err.data);
      });
    }

    $scope.save = function() {
      var emp = {
        'id': selectedCompany.id
      };
      $scope.user.empresas = [emp];
      userService.updateUser($scope.user).then(function(data) {
        var backEmp = angular.copy(authService.loggedUser.empresas);
        $scope.user.empresas = backEmp;
        authService.updateUser($scope.user);
        growl.success('Perfil atualizado com sucesso!', {
          ttl: 4000
        });
      }).catch(function(err) {
        growl.error('Não foi possível atualizar o perfil. Contate o suporte.');
        console.error(err);
      });
    };

  }]);
