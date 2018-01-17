'use strict';

/**
 * @ngdoc service
 * @name marketingCertoApp.CampaignModel
 * @description
 * # CampaignModel
 * Service in the marketingCertoApp.
 */
angular.module('marketingCertoApp')
  .service('CampaignModel', function () {
    this.Campaign = function(){
      this.nome = undefined;
      this.dtIni = undefined;
      this.dtFin = undefined;
      this.dtCriacao = undefined;
      this.obs = undefined;
      this.id = undefined;
      this.operacao = 0;
      this.offset = undefined;
      this.status = undefined;
      this.empresa = {};
      this.criador = {};
      this.participantes = [];
      this.produtos = [];
    };
  });
