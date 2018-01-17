'use strict';

describe('Service: CampaignService', function () {

  // load the service's module
  beforeEach(module('marketingCertoApp'));

  // instantiate service
  var CampaignService;
  beforeEach(inject(function (_CampaignService_) {
    CampaignService = _CampaignService_;
  }));

  it('should do something', function () {
    expect(!!CampaignService).toBe(true);
  });

});
