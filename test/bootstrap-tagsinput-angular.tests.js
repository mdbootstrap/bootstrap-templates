describe('bootstrap-tagsinput', function() {

  // Load the myApp module, which contains the directive
  beforeEach(module('bootstrap-tagsinput'));
  
  describe("with strings as items" , function() {
    describe("compile with 2 tags in model" , function() {
      var $scope,
          $element;
  
      beforeEach(inject(function($compile, $rootScope){
        $scope = $rootScope;
        $scope.tags = ['Amsterdam', 'New York'];
        $element = $compile(angular.element('<bootstrap-tagsinput ng-model="tags" />'))($scope);
        $scope.$digest();
      }));
      
      it('should hide the element', function() {
        expect($element.is(":visible")).toBe(false);
      });

      it('should have 2 tags', function() {
        expect($('.tag', $element).length).toBe(2);
      });
    });
  });

  describe("with objects as items" , function() {
    describe("compile with 2 tags in model" , function() {
      var $scope,
          $element;
  
      beforeEach(inject(function($compile, $rootScope){
        $scope = $rootScope;
        $scope.tags = [{ value: 1, text: 'Amsterdam'}, { value: 2, text: 'New York'} ];
        $element = $compile(angular.element('<bootstrap-tagsinput ng-model="tags" itemvalue="value" itemtext="text"/>'))($scope);
        $scope.$digest();
      }));
      
      it('should hide the element', function() {
        expect($element.is(":visible")).toBe(false);
      });

      it('should have 2 tags', function() {
        expect($('.tag', $element).length).toBe(2);
      });
      describe("changing a tag's text" , function() {
        beforeEach(function() {
          $scope.tags[0].text = 'Paris';
          $scope.$digest();
        });
        it("should update tag's text", function() {
          expect($('.tag', $element).first().text()).toBe('Paris');
        });
      });

      describe("adding an item to the model" , function() {
        beforeEach(function() {
          $scope.tags.push({ value: 3, text: 'Beijing'});
          $scope.$digest();
        });
        it("should add a tag", function() {
          expect($('.tag', $element).length).toBe(3);
        });
      });

      describe("BACKSPACE", function() {
        beforeEach(function() {
          $element.tagsinput('focus');
        });

        it('after last tag, should remove item from model', function() {
          $('input', $element).trigger($.Event('keydown', { which: 8 }));
          $scope.$digest();
          expect($scope.tags.length).toBe(1);
        });
      });
    });
  });
});