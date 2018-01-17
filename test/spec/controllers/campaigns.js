'use strict';

describe('Controller: CampaignsCtrl', function () {

  // load the controller's module
  beforeEach(module('marketingCertoApp'));

  var CampaignsCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    CampaignsCtrl = $controller('CampaignsCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(CampaignsCtrl.awesomeThings.length).toBe(3);
  });
});
