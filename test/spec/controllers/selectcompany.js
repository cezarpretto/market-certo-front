'use strict';

describe('Controller: SelectcompanyCtrl', function () {

  // load the controller's module
  beforeEach(module('marketingCertoApp'));

  var SelectcompanyCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    SelectcompanyCtrl = $controller('SelectcompanyCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(SelectcompanyCtrl.awesomeThings.length).toBe(3);
  });
});
