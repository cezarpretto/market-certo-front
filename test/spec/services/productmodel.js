'use strict';

describe('Service: ProductModel', function () {

  // load the service's module
  beforeEach(module('marketingCertoApp'));

  // instantiate service
  var ProductModel;
  beforeEach(inject(function (_ProductModel_) {
    ProductModel = _ProductModel_;
  }));

  it('should do something', function () {
    expect(!!ProductModel).toBe(true);
  });

});
