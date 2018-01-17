'use strict';

describe('Service: StateService', function () {

  // load the service's module
  beforeEach(module('marketingCertoApp'));

  // instantiate service
  var StateService;
  beforeEach(inject(function (_StateService_) {
    StateService = _StateService_;
  }));

  it('should do something', function () {
    expect(!!StateService).toBe(true);
  });

});
