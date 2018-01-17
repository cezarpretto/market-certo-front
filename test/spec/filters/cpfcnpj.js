'use strict';

describe('Filter: cpfCnpj', function () {

  // load the filter's module
  beforeEach(module('marketingCertoApp'));

  // initialize a new instance of the filter before each test
  var cpfCnpj;
  beforeEach(inject(function ($filter) {
    cpfCnpj = $filter('cpfCnpj');
  }));

  it('should return the input prefixed with "cpfCnpj filter:"', function () {
    var text = 'angularjs';
    expect(cpfCnpj(text)).toBe('cpfCnpj filter: ' + text);
  });

});
