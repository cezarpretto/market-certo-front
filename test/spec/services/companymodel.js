'use strict';

describe('Service: CompanyModel', function () {

  // load the service's module
  beforeEach(module('marketingCertoApp'));

  // instantiate service
  var CompanyModel;
  beforeEach(inject(function (_CompanyModel_) {
    CompanyModel = _CompanyModel_;
  }));

  it('should do something', function () {
    expect(!!CompanyModel).toBe(true);
  });

});
