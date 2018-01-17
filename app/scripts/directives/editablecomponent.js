'use strict';

/**
 * @ngdoc directive
 * @name marketingCertoApp.directive:EditableComponent
 * @description
 * # EditableComponent
 */
function easyEditableController($scope, $element) {
  var ctrl = this;
  $scope.editing = false;
  $scope.click = function() {
    $scope.editing = !$scope.editing;
    if ($scope.editing) {
      var input = $element[0].querySelector('input');
      setTimeout(function() {
        input.focus();
        input.select();
      }, 0);
    }
  };

  $scope.save = function() {
    $scope.editing = false;
    ctrl.esAfterSave();
  };
};

angular.module('marketingCertoApp')
  .component('easyEditable', {
    template: '<a role="button" ng-click="click()" ng-show="!editing" style="border-bottom:1px dashed blue;">{{$ctrl.esType === \'currency\'?($ctrl.esModel || 0 | currency):($ctrl.esModel || $ctrl.esDefault)}}</a>' +
      '<form ng-submit="save()" novalidate>' +
      '<div class="input-group" ng-show="editing">' +
      '<input type="{{$ctrl.esType === \'currency\'?\'number\':$ctrl.esType}}" class="form-control input-sm"  ng-model="$ctrl.esModel">' +
      '<span class="input-group-btn">' +
      '<button type="submit" class="btn btn-primary btn-sm"><span class="glyphicon glyphicon-ok"></span></button>' +
      '</span>' +
      '</div>' +
      '</form>',
    controller: easyEditableController,
    bindings: {
      esModel: '=',
      esType: '@',
      esDefault: '@',
      esAfterSave: '&'
    }
  });
