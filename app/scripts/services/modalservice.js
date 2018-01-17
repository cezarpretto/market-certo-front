'use strict';

/**
 * @ngdoc service
 * @name marketingCertoApp.DialogService
 * @description
 * # DialogService
 * Service in the marketingCertoApp.
 */
angular.module('marketingCertoApp')
  .service('ModalService', function () {
    this.show = function(modalId){
      $('#' + modalId).modal('show');
    };

    this.hide = function(modalId){
      $('#' + modalId).modal('hide');
    };
  });
