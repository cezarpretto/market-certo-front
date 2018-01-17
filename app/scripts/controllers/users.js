'use strict';

/**
 * @ngdoc function
 * @name marketingCertoApp.controller:UsersCtrl
 * @description
 * # UsersCtrl
 * Controller of the marketingCertoApp
 */
angular.module('marketingCertoApp')
  .controller('UsersCtrl', ['$scope', 'AuthService', 'growl', 'UserService', 'UserModel', 'ModalService', 'StateService', 'CompanyService', function($scope, authService, growl, userService, userModel, modalservice, statesService, companyService) {
    authService.isLoggedIn();
    var loggedUser = authService.loggedUser;
    var selectedCompany = authService.selectedCompany;
    $scope.loggedUser = loggedUser;
    $scope.selectedCompany = selectedCompany;
    $scope.user = {};
    $scope.users = [];
    $scope.states = [];
    $scope.cities = [];
    $scope.types = [];
    $scope.usersAux = $scope.users;
    $scope.isEditing = false;
    $scope.isRegistered = false;
    $scope.row = 0;
    $scope.allUsers = [];
    $scope.allUsersAux = $scope.allUsers;
    $scope.companies = [];
    $scope.companiesAux = $scope.companies;
    $scope.idUserRef = undefined;
    var companiesBack = [];
    $scope.companiesUpdate = [];

    (function() {
      statesService.getStates().then(function(data) {
        $scope.states = data.data;
      }).catch(function(err) {
        console.error(err);
        growl.error(err.data);
      });

      userService.getTypes(loggedUser.tipo.id).then(function(data) {
        $scope.types = data.data;
      }).catch(function(err) {
        console.error(err);
        growl.error(err.data);
      });
    }());

    var getTypes = function(typeId) {
      userService.getTypes(typeId).then(function(data) {
        $scope.types = data.data;
      }).catch(function(err) {
        console.error(err);
        growl.error(err.data);
      });
    };

    $scope.getUsers = function() {
      userService.getUsers(selectedCompany.id).then(function(data) {
        console.log(data.data);
        $scope.users = data.data;
        $scope.usersAux = $scope.users;
      }).catch(function(err) {
        console.error(err);
        growl.error(err.data.message);
      });
    };
    $scope.getUsers();

    $scope.getCities = function(stateId) {
      statesService.getCities(stateId).then(function(data) {
        $scope.cities = data.data;
      }).catch(function(err) {
        console.error(err);
        growl.error(err.data);
      });
    }

    $scope.new = function() {
      $scope.cities = [];
      $scope.isEditing = false;
      $scope.isRegistered = false;
      $scope.user = new userModel.User();
      modalservice.show('dlgUser');
    };

    $scope.selectUser = function(user) {
      if ($scope.isAllowedToEdit(user)) {
        var emp = {
          'id': selectedCompany.id
        };
        user.empresas = [emp];
        $scope.isEditing = true;
        $scope.isRegistered = false;
        $scope.user = user;
        modalservice.show('dlgUser');
        $scope.getCities($scope.user.municipio.estado.id);
      }
    };

    $scope.isAllowedToEdit = function(user) {
      var ret = false;
      if (user.tipo.id === 5 && (loggedUser.tipo.id === 5 || loggedUser.tipo.id === 1)) {
        ret = true;
      } else if (user.tipo.id !== 5 && user.tipo.id !== 1 && (loggedUser.tipo.id === 2 || loggedUser.tipo.id === 5 || loggedUser.tipo.id === 1)) {
        ret = true;
      } else {
        ret = false;
      }
      return ret;
    };

    $scope.save = function() {
      var emp = {
        'id': selectedCompany.id
      };
      $scope.user.empresas = [emp];
      if ($scope.isEditing) {
        userService.updateUser($scope.user).then(function(data) {
          $scope.getUsers();
          modalservice.hide('dlgUser');
          growl.success('Usuário atualizado com sucesso!', {
            ttl: 4000
          });
        }).catch(function(err) {
          growl.error('Não foi possível atualizar o usuário. Contate o suporte.');
          console.error(err);
        });
      } else {
        if ($scope.isRegistered) {
          userService.joinUserToCompany($scope.user).then(function(data) {
            $scope.getUsers();
            modalservice.hide('dlgUser');
            growl.success('Usuário cadastrado com sucesso!', {
              ttl: 4000
            });
          }).catch(function(err) {
            growl.error('Não foi possível cadastrar o usuário. Contate o suporte.');
            console.error(err);
          });
        } else {
          userService.insertUser($scope.user).then(function(data) {
            $scope.getUsers();
            modalservice.hide('dlgUser');
            growl.success('Usuário cadastrado com sucesso!', {
              ttl: 4000
            });
          }).catch(function(err) {
            growl.error('Não foi possível cadastrar o usuário. Contate o suporte.');
            console.error(err);
          });
        }
      }
    };

    $scope.getUser = function() {
      if ($scope.user.cpf !== undefined) {
        $scope.isRegistered = false;
        userService.getUser(selectedCompany.id, $scope.user.cpf).then(function(data) {
          if (data.data.length > 0) {
            if (data.data[0].status === 1 || data.data[0].tipo.id === 1) {
              window.alert('Esse usuário já está cadastrado!');
              modalservice.hide('dlgUser');
            } else if (data.data[0].status === 0) {
              $scope.isRegistered = true;
              $scope.user = data.data[0];
              var emp = {
                'id': selectedCompany.id
              };
              $scope.user.empresas = [emp];
              $scope.getCities($scope.user.municipio.estado.id);
              window.alert('Este usuário já está cadastrado em nossa base de dados. Os dados serão importados para o cadastro.');
            }
          }
        }).catch(function(err) {
          console.error(err);
        })
      }
    };

    $scope.enableDisableUser = function(user) {
      var word = '';
      user.inativo ? word = 'reativar' : word = 'inativar';
      user.inativo ? user.inativo = false : user.inativo = true;
      userService.updateUser(user).then(function(data) {
        $scope.getUsers();
        growl.success('Usuário inativado com sucesso!', {
          ttl: 4000
        });
      }).catch(function(err) {
        growl.error('Não foi possível inativar o usuário. Contate o suporte.');
        console.error(err);
      });
      // if (window.confirm('Deseja realmente ' + word + ' o usuário ' + user.nome + '?')) {
      //
      // }
    };

    $scope.cancelOpChangeUser = function() {
      growl.info('Operação abortada!', {
        ttl: 2000
      });
    };

    $scope.setRow = function(row) {
      $scope.row = row;
      if (row === 0) {
        $scope.getUsers();
        getTypes(loggedUser.tipo.id);
      } else {
        $scope.getAllUsers();
        getTypes(5);
      }
    };

    $scope.getAllUsers = function() {
      userService.getAllUsers().then(function(data) {
        $scope.allUsers = data.data;
        $scope.allUsersAux = $scope.allUsers;
        console.log($scope.allUsersAux);
      }).catch(function(err) {
        console.error(err);
        growl.error(err.data.message);
      });
    };

    $scope.getAllCompanies = function(userId) {
      companyService.getCompaniesHasParticipante(userId).then(function(data) {
        $scope.companiesUpdate = [];
        $scope.idUserRef = userId;
        $scope.companies = data.data;
        $scope.companiesAux = $scope.companies;
        companiesBack = angular.copy($scope.companiesAux);
        console.log($scope.companiesAux);
      }).catch(function(err) {
        console.error(err);
        growl.error(err.data.message);
      });
    };

    $scope.changeObject = function(company) {
      var idxBack = companiesBack.map(function(e) {
          return e.id;
      }).indexOf(company.id);
      if (idxBack !== -1) {
        var companyBack = companiesBack[idxBack];
        var idxUpdate = $scope.companiesUpdate.map(function(e) {
            return e.id;
        }).indexOf(company.id);
        if (angular.equals(companyBack, company) && idxUpdate !== -1) {
          $scope.companiesUpdate.splice(idxUpdate, 1);
        } else {
          if (companyBack.status !== company.status) {
            if (company.status === 0 && idxUpdate === -1) {
              $scope.companiesUpdate.push(company);
            } else {
              if (company.tipo.id !== null && company.tipo.id !== undefined && idxUpdate === -1) {
                $scope.companiesUpdate.push(company);
              }
            }
          } else {
            if (company.status !== 0) {
              if (companyBack.tipo.id !== company.tipo.id) {
                if (idxUpdate === -1) {
                  $scope.companiesUpdate.push(company);
                }
              }
            } else {
              company.tipo.id = null;
              var idxUpdate = $scope.companiesUpdate.map(function(e) {
                  return e.id;
              }).indexOf(company.id);
              if (angular.equals(companyBack, company) && idxUpdate !== -1) {
                $scope.companiesUpdate.splice(idxUpdate, 1);
              }
            }
          }
        }
      }
    };

    $scope.saveRef = function() {
      userService.changeCompanyWithUser($scope.companiesUpdate).then(function(data) {
        $scope.getAllCompanies($scope.idUserRef);
        growl.success(data.data?'Modificações efetuadas com sucesso!':'Não foi possível efetuar alteração. Contate o suporte.', {
          ttl: 4000
        });
      }).catch(function(err) {
        console.error(err);
        growl.error(err.data.message);
      });
    };

    $scope.closeModal = function() {
      $scope.user = new userModel.User();
      modalservice.hide('dlgUser');
    };
  }]);
