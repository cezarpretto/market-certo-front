'use strict';

/**
 * @ngdoc service
 * @name marketingCertoApp.UserService
 * @description
 * # UserService
 * Service in the marketingCertoApp.
 */
angular.module('marketingCertoApp')
  .service('UserService', ['$http', 'AuthService', function ($http, authService) {
    var ip = authService.ip;

    this.login = function(user) {
      return $http.post(ip + 'login', user);
    };

    this.getAllUsers = function(){
      return $http.get(ip + 'participantes/a');
    };

    this.getUsers = function(companyId){
      return $http.get(ip + 'participantes/e/' + companyId);
    };

    this.getUser = function(companyId, userCpf){
      return $http.get(ip + 'participantes/g/' + companyId + '/' + userCpf);
    };

    this.getTypes = function(typeId){
      return $http.get(ip + 'participantes/t/' + typeId);
    };

    this.getAllTypes = function(companyId){
      return $http.get(ip + 'participantes/tipos/' + companyId);
    };

    this.getUsersPerOp = function(user){
      return $http.post(ip + 'participantes/c', user);
    };

    this.insertUser = function(user){
      return $http.post(ip + 'participantes', user);
    };

    this.joinUserToCompany = function(user){
      return $http.patch(ip + 'participantes/' + user.id + '/' + user.empresa.id + '/' + user.tipo.id);
    };

    this.updateUser = function(user){
      return $http.put(ip + 'participantes', user);
    };

    this.deleteUser = function(userId){
      return $http.post(ip + 'participantes/' + userId);
    };

    this.changeCompanyWithUser = function(companies){
      return $http.post(ip + 'participantes/h/', companies);
    };
  }]);
