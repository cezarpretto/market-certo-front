'use strict';

/**
 * @ngdoc function
 * @name marketingCertoApp.controller:CampaignCtrl
 * @description
 * # CampaignCtrl
 * Controller of the marketingCertoApp
 */
angular.module('marketingCertoApp')
  .controller('CampaignCtrl', ['$scope', '$routeParams', 'AuthService', 'growl', 'UserModel', 'UserService', 'CampaignService', function($scope, $routeParams, authService, growl, userModel, userService, campaignService) {
    authService.isLoggedIn();
    $scope.user = new userModel.User();
    $scope.campaigns = [];
    $scope.campaignsAux = $scope.campaigns;
    $scope.campaignsOld = [];
    $scope.campaignsOldAux = $scope.campaignsOld;

    var logar = function() {
      var login = {
        'cpf': $routeParams.cpf,
        'senha': $routeParams.tokenId
      };
      userService.login(login).then(function(data) {
        $scope.user = data.data;
        authService.loggedUser = $scope.user;
        $scope.getCampaigns();
        $scope.getCampaignsOld();
      }).catch(function(err) {
        if (err.status === 401) {
          growl.error('Dados do link fornecido estão incorretos!', {
            ttl: 4000
          });
        }
        $scope.user = new userModel.User();
        authService.loggedUser = $scope.user;
      });
    };
    logar();

    $scope.getCampaigns = function() {
      if ($scope.user.id !== undefined && $scope.user.id !== null) {
        campaignService.getCampaignsUser(1, $scope.user.id).then(function(data) {
          if (data.data.length === 0) {
            growl.info('Não retornou nenhuma campanha!', {
              ttl: 3000
            });
          }
          $scope.campaigns = data.data;
          console.log(data.data);
          $scope.campaignsAux = $scope.campaigns;
        }).catch(function(err) {
          console.error(err);
          growl.error('Não foi possível realizar a busca de campanhas! </br> ' + err.data.message);
          $scope.campaigns = [];
          $scope.campaignsAux = $scope.campaigns;
        });
      }
    };

    $scope.getCampaignsOld = function() {
      if ($scope.user.id !== undefined && $scope.user.id !== null) {
        campaignService.getCampaignsUser(2, $scope.user.id).then(function(data) {
          if (data.data.length === 0) {
            growl.info('Não retornou nenhuma campanha encerrada!', {
              ttl: 3000
            });
          }
          $scope.campaignsOld = data.data;
          $scope.campaignsOldAux = $scope.campaignsOld;
        }).catch(function(err) {
          console.error(err);
          growl.error('Não foi possível realizar a busca de campanhas encerradas! </br> ' + err.data.message);
          $scope.campaignsOld = [];
          $scope.campaignsOldAux = $scope.campaignsOld;
        });
      }
    };
  }]);
