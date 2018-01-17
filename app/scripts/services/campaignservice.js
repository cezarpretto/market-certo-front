'use strict';

/**
 * @ngdoc service
 * @name marketingCertoApp.CampaignService
 * @description
 * # CampaignService
 * Service in the marketingCertoApp.
 */
angular.module('marketingCertoApp')
  .service('CampaignService', ['$http', 'AuthService', function ($http, authService) {
    var ip = authService.ip;

    this.getCampaigns = function(campaign){
      return $http.post(ip + 'campanhas/list', campaign);
    };

    this.deleteCampaign = function(campaignId){
      return $http.delete(ip + 'campanhas/' + campaignId);
    };

    this.insertCampaign = function(campaign){
      return $http.post(ip + 'campanhas', campaign);
    };

    this.updateCampaign = function(campaign){
      return $http.put(ip + 'campanhas', campaign);
    };

    this.getCampaignsUser = function(type, userId){
      return $http.get(ip + 'campanhas/' + type + '/' + userId);
    };
  }]);
