'use strict';

describe('Directive: EditableComponent', function () {

  // load the directive's module
  beforeEach(module('marketingCertoApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<-editable-component></-editable-component>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the EditableComponent directive');
  }));
});
