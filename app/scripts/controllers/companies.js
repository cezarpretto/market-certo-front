'use strict';

/**
 * @ngdoc function
 * @name marketingCertoApp.controller:CompaniesCtrl
 * @description
 * # CompaniesCtrl
 * Controller of the marketingCertoApp
 */
angular.module('marketingCertoApp')
  .controller('CompaniesCtrl', ['$scope', 'AuthService', 'growl', 'CompanyService', 'CompanyModel', 'ModalService', 'StateService', function($scope, authService, growl, companyService, companyModel, modalService, stateService) {
    authService.isLoggedIn();
    $scope.loggedUser = authService.loggedUser;
    var selectedCompany = authService.selectedCompany;
    $scope.companies = [];
    $scope.companiesAux = $scope.companies;
    $scope.states = [];
    $scope.cities = [];
    $scope.isCnpj = 'true';
    // modalService.show('dlgCompany');
    $scope.company = new companyModel.Company();
    $scope.base64Logo = undefined;
    $scope.isEditing = false;

    // (function(){
    //   stateService.getStates().then(function(data){
    //     console.log(data.data);
    //     $scope.states = data.data;
    //   }).catch(function(err){
    //     console.error(err);
    //   })
    // }())

    $scope.clickImg = function() {
      setTimeout(function() {
        document.getElementById('inputFile').click()
      }, 0);
    };

    function getCompanies() {
      companyService.getCompanies($scope.loggedUser.id).then(function(data) {
        for (var i = 0; i < data.data.length; i++) {
          data.data[i].show = false;
        }
        $scope.companies = data.data;
        $scope.companiesAux = $scope.companies;
      }).catch(function(err) {
        console.error(err);
      });
    };
    getCompanies();

    $scope.new = function() {
      $scope.isEditing = false;
      $scope.user = new companyModel.Company();
      $scope.company = new companyModel.Company();
      modalService.show('dlgCompany');
    };

    $scope.closeModal = function() {
      $scope.company = new companyModel.Company();
      modalService.hide('dlgCompany');
      $scope.frmCompany.$setPristine();
    };

    $scope.findCep = function() {
      if ($scope.company.endereco.cep) {
        stateService.findCep($scope.company.endereco.cep).then(function(data) {
          if (data.data.erro) {
            growl.warning('Atenção! CEP Inválido.');
            $scope.company.endereco.cep = undefined;
          } else {
            $scope.company.endereco.bairro = data.data.bairro;
            $scope.company.endereco.municipio.municipio = data.data.localidade;
            $scope.company.endereco.municipio.id = data.data.ibge;
            $scope.company.endereco.municipio.estado.uf = data.data.uf;
            $scope.company.endereco.municipio.estado.id = data.data.ibge.substring(0, 2);
            $scope.company.endereco.logradouro = data.data.logradouro;
          }
        }).catch(function(err) {
          console.error(err);
        });
      }
    };

    $scope.$watch('base64Logo', function(newValue) {
      if (newValue !== undefined) {
        $scope.company.logo = 'data:' + newValue.filetype + ';base64,' + newValue.base64;
      }
    });

    $scope.save = function() {
      $scope.company.status = $scope.loggedUser.id;
      if ($scope.isEditing) {
        companyService.updateCompany($scope.company).then(function() {
          growl.success('Empresa atualizada com sucesso!', {
            ttl: 4000
          });
          modalService.hide('dlgCompany');
          getCompanies();
        }).catch(function(err) {
          growl.error('Não foi possível atualizar a empresa. Contate o suporte!');
          console.error(err);
        })
      } else {
        companyService.insertCompany($scope.company).then(function() {
          growl.success('Empresa cadastrada com sucesso!', {
            ttl: 4000
          });
          modalService.hide('dlgCompany');
          getCompanies();
        }).catch(function(err) {
          growl.error('Não foi possível cadastrar a empresa. Contate o suporte!');
          console.error(err);
        });
      }
    };

    $scope.selectCompany = function(company) {
      if($scope.loggedUser.tipo.id === 5 || $scope.loggedUser.tipo.id === 1) {
        $scope.isEditing = true;
        $scope.company = company;
        modalService.show('dlgCompany');
      }
    };

    $scope.enableDisableCompany = function(company) {
      var word = '';
      company.inativa ? word = 'reativar' : word = 'inativar';
      company.inativa ? company.inativa = false : company.inativa = true;
      companyService.updateCompany(company).then(function(data) {
        getCompanies();
        growl.success('Empresa inativada com sucesso!', {
          ttl: 4000
        });
      }).catch(function(err) {
        growl.error('Não foi possível inativar a empresa. Contate o suporte.');
        console.error(err);
      });
      // if (window.confirm('Deseja realmente ' + word + ' a empresa ' + company.nomeFantasia + '?')) {
      //
      // }
    };

    $scope.cancelOpChangeComp = function() {
      growl.info('Operação abortada!', {
        ttl: 2000
      });
    };
  }]);
