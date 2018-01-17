'use strict';

describe('Controller: CampaignCtrl', function () {

  // load the controller's module
  beforeEach(module('marketingCertoApp'));

  var CampaignCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    CampaignCtrl = $controller('CampaignCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(CampaignCtrl.awesomeThings.length).toBe(3);
  });
});
