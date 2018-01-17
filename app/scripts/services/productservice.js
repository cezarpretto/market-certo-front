'use strict';

/**
 * @ngdoc service
 * @name marketingCertoApp.ProductService
 * @description
 * # ProductService
 * Service in the marketingCertoApp.
 */
angular.module('marketingCertoApp')
  .service('ProductService', ['$http', 'AuthService', function ($http, authService) {
    var ip = authService.ip;
    this.searchProduct = function(search){
      return $http.post(ip + 'produtos/pesquisa', search);
    };

    this.getProducts = function(search){
      return $http.post(ip + 'produtos/listAll', search);
    };

    this.getSizes = function(idEmpresa){
      return $http.get(ip + 'produtos/tamanhos/' + idEmpresa);
    };

    this.getGroups = function(groupId){
      if(groupId === null || groupId === undefined) {
        return $http.get(ip + 'grupos');
      } else {
        return $http.get(ip + 'grupos/' + groupId);
      }
    };

    this.getSubGroups = function(subGroupId){
      if(subGroupId === null || subGroupId === undefined) {
        return $http.get(ip + 'subgrupos');
      } else {
        return $http.get(ip + 'subgrupos/' + subGroupId);
      }
    };

    this.insertProduct = function(product){
      return $http.post(ip + 'produtos', product);
    };

    this.updateProduct = function(product){
      return $http.put(ip + 'produtos', product);
    };

    this.insertSize = function(size){
      return $http.post(ip + 'produtos/tamanhos', size);
    };
  }]);
