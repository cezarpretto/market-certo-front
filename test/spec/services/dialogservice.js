'use strict';

describe('Service: DialogService', function () {

  // load the service's module
  beforeEach(module('marketingCertoApp'));

  // instantiate service
  var DialogService;
  beforeEach(inject(function (_DialogService_) {
    DialogService = _DialogService_;
  }));

  it('should do something', function () {
    expect(!!DialogService).toBe(true);
  });

});
