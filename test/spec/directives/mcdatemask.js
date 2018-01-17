'use strict';

describe('Directive: mcDateMask', function () {

  // load the directive's module
  beforeEach(module('marketingCertoApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<mc-date-mask></mc-date-mask>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the mcDateMask directive');
  }));
});
