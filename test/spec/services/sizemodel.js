'use strict';

describe('Service: SizeModel', function () {

  // load the service's module
  beforeEach(module('marketingCertoApp'));

  // instantiate service
  var SizeModel;
  beforeEach(inject(function (_SizeModel_) {
    SizeModel = _SizeModel_;
  }));

  it('should do something', function () {
    expect(!!SizeModel).toBe(true);
  });

});
