'use strict';

/**
 * @ngdoc service
 * @name marketingCertoApp.ProductModel
 * @description
 * # ProductModel
 * Service in the marketingCertoApp.
 */
angular.module('marketingCertoApp')
  .service('ProductModel', ['AuthService', function(authService) {
    var selectedCompany = authService.selectedCompany;
    this.Search = function() {
      this.empresa = {
        'id': undefined
      };
      this.grupo = {
        'id': undefined,
        'descricao': undefined
      };
      this.mestre = true;
      this.obs = undefined;
      this.nome = 1;
      this.limit = null;
      this.offset = null;
      this.typeOrder = undefined;
      this.fieldOrder = undefined;
      this.foto = undefined;
    };

    this.Product = function(){
      this.id = undefined;
      this.codigo = undefined;
      this.codigoBarra = undefined;
      this.nome = undefined;
      this.tamanhos = [];
      this.grupo = {
        'id': undefined,
        'grupoSub': {
          'id': undefined
        }
      };
      this.vlAtacadoOrig = 0;
      this.vlAtacadoPromo = 0;
      this.vlVarejoOrig = 0;
      this.vlVarejoPromo = 0;
      this.qtdMinAtacado = 0;
      this.obs = undefined;
      this.obsCampanha = undefined;
      this.idMestre = undefined;
      this.mestre = true;
      this.foto = undefined;
      this.empresa = {
        'id': selectedCompany.id
      };
      this.similares = [];
    };
  }]);
