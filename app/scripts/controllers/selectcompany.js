'use strict';

/**
 * @ngdoc function
 * @name marketingCertoApp.controller:SelectcompanyCtrl
 * @description
 * # SelectcompanyCtrl
 * Controller of the marketingCertoApp
 */
angular.module('marketingCertoApp')
  .controller('SelectcompanyCtrl', ['$scope', 'AuthService', 'growl', 'ModalService', 'CompanyService', function ($scope, authService, growl, modalService, companyService) {
    authService.isLoggedIn();
    var loggedUser = authService.loggedUser;
    $scope.companies = [];

    (function(){
      companyService.getCompanies(loggedUser.id).then(function(data){
        $scope.companies = data.data;
        if(data.data.length > 1){
          modalService.show('dlgSelectCompany');
        }else{
          authService.setCompany(data.data[0]);
        }
      }).catch(function(err){
        console.error(err);
      })
    }());

    $scope.select = function(company){
      modalService.hide('dlgSelectCompany');
      authService.setCompany(company);
    };
  }]);
