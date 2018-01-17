'use strict';

/**
 * @ngdoc service
 * @name marketingCertoApp.AuthService
 * @description
 * # AuthService
 * Service in the marketingCertoApp.
 */
angular.module('marketingCertoApp')
  .service('AuthService', ['$location', '$http', '$q', '$routeParams', '$rootScope', 'growl', function ($location, $http, $q, $routeParams, $rootScope, growl) {
    var self = this;
    this.loggedUser = null;
    this.selectedCompany = null;
    $rootScope.isRootOrAdmin = false;
    // this.ip = 'http://dalcinandre.ddns.net:8085/mkt/';
    this.ip = 'http://planosassessoria.no-ip.biz:8383/';
    //this.ip = 'http://192.168.0.112:80/~operador/mkt/';

    this.isLoggedIn = function(isOtherMenu){
      if($location.path().includes('/campaign/')) {
        console.log("Outro MENU");
      } else {
        self.loggedUser = JSON.parse(window.localStorage.getItem('loggedUser'));
        self.selectedCompany = JSON.parse(window.localStorage.getItem('selectedCompany'));
        console.log(self.loggedUser);
        if(self.loggedUser ===  null){
          $location.path('/login');
        } else {
          if(self.selectedCompany === null) {
            $location.path('/selectCompany');
          } else {
            if(angular.isDefined(self.selectedCompany.tipo) && self.selectedCompany.tipo !== null) {
              //$location.path().includes('users') retirado
              if(($location.path().includes('companies')) && !(self.selectedCompany.tipo.id === 1 || self.selectedCompany.tipo.id === 5)) {
                $location.path('/');
              }
            }
          }
        }
        getCompany();
      }
    };

    function getCompany(){
      if(self.selectedCompany !== null && self.selectedCompany.tipo !== undefined && self.selectedCompany.tipo !== null) {
          if(self.selectedCompany.tipo.id === 1 || self.selectedCompany.tipo.id === 5) {
            $rootScope.isRootOrAdmin = true;
          } else {
            $rootScope.isRootOrAdmin = false;
          }
      } else {
        $rootScope.isRootOrAdmin = false;
      }
    };

    this.logar = function(userLogin){
      return $q(function(resolve, reject){
        $http.post(self.ip + 'login', userLogin).then(function(data){
          if (data.data.empresas.length < 1) {
            growl.error('Usuário não possui uma empresa!', {ttl: 4000});
            self.loggedUser = null;
            self.selectedCompany = null;
          } else {
            self.loggedUser = data.data;
            if(self.loggedUser.empresas.length > 1) {
              $location.path('/selectCompany');
            } else {
              self.setCompany(self.loggedUser.empresas[0]);
              $location.path('/main');
            }
            window.localStorage.setItem('loggedUser', JSON.stringify(self.loggedUser));
            resolve(data);
          }
        }).catch(function(err){
          if(err.status === 401){
            growl.error('Usuário ou senha incorretos!', {ttl: 4000});
          }
          reject(err);
        });
      });
    };

    this.updateUser = function(user) {
      this.loggedUser = user;
      window.localStorage.setItem('loggedUser', JSON.stringify(user));
      $location.path('/main');
    };

    this.setCompany = function(company){
      this.selectedCompany = company;
      this.loggedUser.tipo = company.tipo;
      this.updateUser(this.loggedUser);
      window.localStorage.setItem('selectedCompany', JSON.stringify(company));
      $location.path('/main');
    };

    this.logout = function(){
      this.loggedUser = null;
      this.selectedCompany = null;
      window.localStorage.setItem('loggedUser', JSON.stringify(null));
      window.localStorage.setItem('selectedCompany', JSON.stringify(null));
      $location.path('/login');
    };

    this.goProduct = function() {
      $location.path('/products');
    };
  }]);
