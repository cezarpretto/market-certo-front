'use strict';

describe('Controller: AppctrlCtrl', function () {

  // load the controller's module
  beforeEach(module('marketingCertoApp'));

  var AppctrlCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    AppctrlCtrl = $controller('AppctrlCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(AppctrlCtrl.awesomeThings.length).toBe(3);
  });
});
