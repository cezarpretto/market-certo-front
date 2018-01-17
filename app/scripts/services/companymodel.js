'use strict';

/**
 * @ngdoc service
 * @name marketingCertoApp.CompanyModel
 * @description
 * # CompanyModel
 * Service in the marketingCertoApp.
 */
angular.module('marketingCertoApp')
  .service('CompanyModel', function () {
    this.Company = function(){
      this.cpfCnpj = undefined;
      this.nomeFantasia = undefined;
      this.razaoSocial = undefined;
      this.endereco = {
        logradouro: undefined,
        numero: undefined,
        complemento: undefined,
        bairro: undefined,
        cep: undefined,
        municipio: {
          id: undefined,
          municipio: undefined,
          estado: {
            estado: undefined,
            id: undefined,
            uf: undefined,
            status: undefined
          }
        }
      };
      this.logo = undefined;
      this.slogan = undefined;
      this.inativa = false;
      this.tipo = {
        id: undefined
      };
    };
  });
