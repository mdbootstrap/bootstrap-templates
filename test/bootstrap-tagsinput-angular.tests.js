describe('bootstrap-tagsinput', function() {
  var $scope,
      $element;
  
  // Load the myApp module, which contains the directive
  beforeEach(module('bootstrap-tagsinput'));
  
  beforeEach(inject(function($compile, $rootScope){
    $scope = $rootScope;
    $element = $compile(angular.element('<bootstrap-tagsinput ng-model="someModel" />'))($scope);
    $scope.$digest();
  }));
  
  it('Replaces the element with the appropriate content', function() {
    expect($element.is(":visible")).toBe(false);
  });
});