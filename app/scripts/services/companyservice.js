'use strict';

/**
 * @ngdoc service
 * @name marketingCertoApp.CompanyService
 * @description
 * # CompanyService
 * Service in the marketingCertoApp.
 */
angular.module('marketingCertoApp')
  .service('CompanyService', ['$http', 'AuthService', function ($http, authService) {
    var ip = authService.ip;

    this.getCompanies = function(userId){
      return $http.get(ip + 'empresas/r/' + userId);
    };

    this.getCompaniesHasParticipante = function(userId){
      return $http.get(ip + 'empresas/h/' + userId);
    };

    this.insertCompany = function(company){
      return $http.post(ip + 'empresas', company);
    }

    this.updateCompany = function(company){
      return $http.put(ip + 'empresas', company);
    };

    this.deleteCompany = function(companyId){
      return $http.delete(ip + 'empresas/' + companyId);
    };
  }]);
