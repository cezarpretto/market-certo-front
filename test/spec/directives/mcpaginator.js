'use strict';

describe('Directive: mcPaginator', function () {

  // load the directive's module
  beforeEach(module('marketingCertoApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<mc-paginator></mc-paginator>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the mcPaginator directive');
  }));
});
