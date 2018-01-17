'use strict';

describe('Service: CampaignModel', function () {

  // load the service's module
  beforeEach(module('marketingCertoApp'));

  // instantiate service
  var CampaignModel;
  beforeEach(inject(function (_CampaignModel_) {
    CampaignModel = _CampaignModel_;
  }));

  it('should do something', function () {
    expect(!!CampaignModel).toBe(true);
  });

});
