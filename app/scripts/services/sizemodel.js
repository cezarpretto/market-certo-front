'use strict';

/**
 * @ngdoc service
 * @name marketingCertoApp.SizeModel
 * @description
 * # SizeModel
 * Service in the marketingCertoApp.
 */
angular.module('marketingCertoApp')
  .service('SizeModel',[ function () {
    this.Size = function(){
      this.id = undefined;
      this.operacao = 0;
      this.descricao = undefined;
      this.quantidade = undefined;
    };
  }]);
