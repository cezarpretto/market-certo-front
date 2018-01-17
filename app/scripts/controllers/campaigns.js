'use strict';

/**
 * @ngdoc function
 * @name marketingCertoApp.controller:CampaignsCtrl
 * @description
 * # CampaignsCtrl
 * Controller of the marketingCertoApp
 */
angular.module('marketingCertoApp')
  .controller('CampaignsCtrl', ['$scope', 'AuthService', 'growl', 'ModalService', 'StateService', 'CampaignService', 'CampaignModel', 'ProductModel', 'ProductService', 'UserService', 'UserModel', function($scope, authService, growl, modalService, stateService, campaignService, campaignModel, productModel, productService, userService, userModel) {
    authService.isLoggedIn();
    var loggedUser = authService.loggedUser;
    var selectedCompany = authService.selectedCompany;
    $scope.types = [{
      'id': 0,
      'description': 'Todas'
    }, {
      'id': 1,
      'description': 'Data de Criação'
    }, {
      'id': 2,
      'description': 'Intervalo de Datas'
    }, {
      'id': 3,
      'description': 'Usuário'
    }];
    $scope.filter = new campaignModel.Campaign();
    $scope.filter.offset = 0;
    $scope.users = [];
    $scope.usersAux = $scope.users;
    $scope.campaigns = [];
    $scope.campaignsAux = $scope.campaigns;

    $scope.typesProd = [{
      'id': 0,
      'description': 'Nome'
    }, {
      'id': 1,
      'description': 'Código'
    }, {
      'id': 2,
      'description': 'Código de Barras'
    }];
    $scope.campaign = new campaignModel.Campaign();
    $scope.cProducts = $scope.campaign.produtos;
    $scope.cParticipants = $scope.campaign.participantes;
    $scope.campaigns = [];
    $scope.filterProd = new productModel.Product();
    $scope.filterProd.offset = 0;
    $scope.products = [];
    $scope.productsAux = $scope.products;
    var backupProducts = [];

    $scope.row = 0;
    $scope.typeSearchUser = [{
      'id': 0,
      'description': 'Tipo'
    }, {
      'id': 1,
      'description': 'Pesquisa'
    }];
    $scope.typeFilterUser = [{
      'id': 0,
      'description': 'Nome'
    }, {
      'id': 1,
      'description': 'Celular'
    }, {
      'id': 2,
      'description': 'CPF'
    }];
    $scope.filterUser = new userModel.User();
    $scope.filterUser.offset = 0;
    $scope.filterUser.rows = 0;
    $scope.typesUser = [];
    $scope.typesUserAux = $scope.typesUser;
    $scope.usersFromFilter = [];
    $scope.usersFromFilterAux = $scope.usersFromFilter;

    $scope.setRow = function(row) {
      $scope.row = row;
    };

    $scope.getUsers = function() {
      userService.getUsers(selectedCompany.id).then(function(data) {
        $scope.users = data.data;
        $scope.usersAux = $scope.users;
      }).catch(function(err) {
        console.error(err);
        growl.error(err.data.message);
      });
    };
    $scope.getUsers();

    $scope.changeType = function() {
      var type = $scope.filter.offset;
      $scope.filter = new campaignModel.Campaign();
      $scope.filter.offset = type;
    };

    $scope.submitSearch = function() {
      $scope.filter.empresa.id = selectedCompany.id;
      campaignService.getCampaigns($scope.filter).then(function(data) {
        if (data.data.length === 0) {
          growl.info('A pesquisa não retornou nenhuma campanha!', {
            ttl: 3000
          });
        }
        $scope.campaigns = data.data;
        $scope.campaignsAux = $scope.campaigns;
      }).catch(function(err) {
        console.error(err);
        growl.error('Não foi possível realizar a busca de campanhas! </br> ' + err.data.message);
        $scope.campaigns = [];
        $scope.campaignsAux = $scope.campaigns;
      });
    };

    $scope.new = function() {
      $scope.row = 0;
      $scope.changeType();
      $scope.resetFilterProd();
      $scope.campaign = new campaignModel.Campaign();
      $scope.cProducts = $scope.campaign.produtos;
      $scope.cParticipants = $scope.campaign.participantes;
      $scope.products = [];
      $scope.productsAux = $scope.products;
      modalService.show('dlgCampaign');
    };

    $scope.closeModal = function() {
      $scope.row = 0;
      $scope.changeType();
      $scope.resetFilterProd();
      $scope.campaign = new campaignModel.Campaign();
      $scope.cProducts = $scope.campaign.produtos;
      $scope.cParticipants = $scope.campaign.participantes;
      $scope.products = [];
      $scope.productsAux = $scope.products;
      modalService.hide('dlgCampaign');
    };

    $scope.goRegisterProduct = function() {
      modalService.hide('dlgProdutos');
      modalService.hide('dlgCampaign');
      setTimeout(function() {
        authService.goProduct();
        $scope.$apply();
      }, 500);
    };

    $scope.resetFilterProd = function() {
      var type = $scope.filterProd.offset;
      $scope.filterProd = new productModel.Product();
      $scope.filterProd.offset = type;
    };

    $scope.openModalProducts = function() {
      backupProducts = angular.copy($scope.campaign.produtos);
      modalService.show('dlgProdutos');
    };

    $scope.cancelAddProducts = function() {
      $scope.campaign.produtos = angular.copy(backupProducts);
      $scope.cProducts = $scope.campaign.produtos;
      modalService.hide('dlgProdutos');
    };

    $scope.searchProduct = function() {
      $scope.filterProd.empresa.id = selectedCompany.id;
      console.log($scope.filterProd);
      productService.searchProduct($scope.filterProd).then(function(data) {
        if (data.data.length === 0) {
          growl.info('A pesquisa não retornou nenhum produto!', {
            ttl: 3000
          });
        }
        console.log(data.data);
        $scope.products = data.data;
        $scope.productsAux = $scope.products;
      }).catch(function(err) {
        console.error(err);
        growl.error('Não foi possível realizar a busca de produtos! </br> ' + err.data.message);
        $scope.products = [];
        $scope.productsAux = $scope.products;
      });
    };

    $scope.changeProductInCampaign = function(p) {
      var idx = $scope.campaign.produtos.map(function(e) {
        return e.id;
      }).indexOf(p.id);
      if (p.status === 1) {
        if (idx === -1) {
          $scope.campaign.produtos.push(p);
          $scope.cProducts = $scope.campaign.produtos;
        }
      } else {
        if (idx !== -1) {
          $scope.campaign.produtos.splice(idx, 1);
          $scope.cProducts = $scope.campaign.produtos;
        }
      }
    };

    $scope.replicateCampaign = function(campaign) {
      $scope.campaign = angular.copy(campaign);
      $scope.campaign.operacao = 0;
      modalService.show('dlgCampaign');
    };

    $scope.editCampaign = function(campaign) {
      $scope.campaign = angular.copy(campaign);
      $scope.campaign.operacao = 1;
      modalService.show('dlgCampaign');
    };

    $scope.removeCampaign = function(campaignId) {
      campaignService.deleteCampaign(campaignId).then(function(data) {
        growl.success('Campanha removida com sucesso!', {
          ttl: 4000
        });
        $scope.submitSearch();
      }).catch(function(err) {
        console.error(err);
        growl.error('Não foi possível remover a campanha. Contate o suporte!');
      });
    };

    $scope.cancelOpRmCamp = function() {
      growl.info('Operação abortada!', {
        ttl: 2000
      });
    };

    $scope.saveCampaign = function() {
      $scope.campaign.empresa.id = selectedCompany.id;
      $scope.campaign.criador.id = loggedUser.id;
      console.log($scope.campaign);
      if ($scope.campaign.operacao === 0) {
        campaignService.insertCampaign($scope.campaign).then(function(data) {
          growl.success('Campanha cadastrada com sucesso!', {
            ttl: 4000
          });
          $scope.submitSearch();
          $scope.closeModal();
        }).catch(function(err) {
          console.error(err);
          growl.error('Não foi possível cadastrar a campanha. Contate o suporte!' + '<br>' + err.data.message);
        });
      } else {
        campaignService.updateCampaign($scope.campaign).then(function(data) {
          growl.success('Campanha atualizada com sucesso!', {
            ttl: 4000
          });
          $scope.submitSearch();
          $scope.closeModal();
        }).catch(function(err) {
          console.error(err);
          growl.error('Não foi possível atualizar a campanha. Contate o suporte!' + '<br>' + err.data.message);
        });
      }
    };

    $scope.getTypesAndUsers = function() {
      userService.getAllTypes(selectedCompany.id).then(function(data) {
        $scope.typesUser = data.data;
        $scope.typesUserAux = $scope.typesUser;
      }).catch(function(err) {
        console.error(err);
        growl.error(err.data.message);
        $scope.typesUser = [];
        $scope.typesUserAux = $scope.typesUser;
      });
    };
    $scope.getTypesAndUsers();

    $scope.getUsersPerOp = function() {
      $scope.filterUser.empresas = [{
        'id': selectedCompany.id
      }];
      userService.getUsersPerOp($scope.filterUser).then(function(data) {
        if (data.data.length === 0) {
          growl.info('A pesquisa não retornou nenhum usuário!', {
            ttl: 3000
          });
        }
        $scope.usersFromFilter = data.data;
        $scope.usersFromFilterAux = $scope.usersFromFilter;
      }).catch(function(err) {
        console.error(err);
        growl.error(err.data.message);
        $scope.usersFromFilter = [];
        $scope.usersFromFilterAux = $scope.usersFromFilter;
      });
    };

    $scope.setTypeWithUserOrUser = function(type, value) {
      if (type === 0) {
        angular.forEach(value.participantes, function(user) {
          var idx = $scope.campaign.participantes.map(function(e) {
            return e.id;
          }).indexOf(user.id);
          if (idx === -1) {
            $scope.campaign.participantes.push(user);
            $scope.cParticipants = $scope.campaign.participantes;
          }
        });
      } else {
        var idx = $scope.campaign.participantes.map(function(e) {
          return e.id;
        }).indexOf(value.id);
        if (idx === -1) {
          $scope.campaign.participantes.push(value);
          $scope.cParticipants = $scope.campaign.participantes;
        }
      }
    };

    $scope.isOnTheList = function(type, value) {
      var ret = false;
      if (type === 0) {
        if (value.participantes.length !== 0) {
          var aux = 0;
          angular.forEach(value.participantes, function(user) {
            var idx = $scope.campaign.participantes.map(function(e) {
              return e.id;
            }).indexOf(user.id);
            if (idx !== -1) {
              aux = aux + 1;
            }
          });
          if (value.participantes.length === aux) {
            ret = true;
          }
        }
      } else {
        var idx = $scope.campaign.participantes.map(function(e) {
          return e.id;
        }).indexOf(value.id);
        if (idx !== -1) {
          ret = true;
        }
      }
      return ret;
    };

    $scope.spliceUser = function(value) {
      var idx = $scope.campaign.participantes.map(function(e) {
        return e.id;
      }).indexOf(value.id);
      if (idx !== -1) {
        $scope.campaign.participantes.splice(idx, 1);
        $scope.cParticipants = $scope.campaign.participantes;
      }
    };

    $scope.changeTypeUser = function() {
      var type = $scope.filterUser.offset;
      $scope.filterUser = new userModel.User();
      $scope.filterUser.offset = type;
      $scope.filterUser.rows = 0;
    };

    $scope.changeFilterUser = function() {
      var type = $scope.filterUser.offset;
      var filter = $scope.filterUser.rows;
      $scope.filterUser = new userModel.User();
      $scope.filterUser.offset = type;
      $scope.filterUser.rows = filter;
    };

    $scope.isValidLists = function() {
      var ret = true;
      if ($scope.campaign.produtos.length > 0 && $scope.campaign.participantes.length > 0) {
        ret = false;
      }
      return ret;
    };

    $scope.afterEditSave = function(p) {
      if(p.similares.length > 0) {
        angular.forEach(p.similares, function(similar) {
          similar.vlAtacadoOrig = p.vlAtacadoOrig;
          similar.vlAtacadoPromo = p.vlAtacadoPromo;
          similar.vlVarejoOrig = p.vlVarejoOrig;
          similar.vlVarejoPromo = p.vlVarejoPromo;
          similar.qtdMinAtacado = p.qtdMinAtacado;
        });
      }
    };
  }]);
