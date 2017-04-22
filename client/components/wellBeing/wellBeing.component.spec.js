'use strict';

describe('Component: wellBeing', function() {
  // load the component's module
  beforeEach(module('phiExperimentApp.wellBeing'));

  var wellBeingComponent;

  // Initialize the component and a mock scope
  beforeEach(inject(function($componentController) {
    wellBeingComponent = $componentController('wellBeing', {});
  }));

  it('should ...', function() {
    expect(1).to.equal(1);
  });
});
