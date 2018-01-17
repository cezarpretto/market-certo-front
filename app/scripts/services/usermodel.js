'use strict';

/**
 * @ngdoc service
 * @name marketingCertoApp.UserModel
 * @description
 * # UserModel
 * Service in the marketingCertoApp.
 */
angular.module('marketingCertoApp')
  .service('UserModel', function () {
    var self = this;
    this.User = function(){
      this.id = undefined;
      this.cpf = undefined;
      this.celular = undefined;
      this.email = undefined;
      this.senha = undefined;
      this.root = undefined;
      this.inativo = undefined;
      this.limit = undefined;
      this.offset = undefined;
      this.municipio = {
        id: undefined
      },
      this.tipo = {
        id: 10
      },
      this.empresas = []
    };

    this.types = function(){
      return [
        {id: 1, nome: 'Administrador', status: undefined},
        {id: 2, nome: 'Usuário', status: undefined},
        {id: 3, nome: 'Cliente', status: undefined}
      ];
    };
  });
