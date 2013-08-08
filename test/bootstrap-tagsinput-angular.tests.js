describe('Unit testing great quotes', function() {
    var $compile;
    var $rootScope;
 
    // Load the myApp module, which contains the directive
    beforeEach(module('bootstrap-tagsinput'));
 
    // Store references to $rootScope and $compile
    // so they are available to all tests in this describe block
    beforeEach(inject(function(_$compile_, _$rootScope_){
      // The injector unwraps the underscores (_) from around the parameter names when matching
      $compile = _$compile_;
      $rootScope = _$rootScope_;
    }));
    
    it('Replaces the element with the appropriate content', function() {
        var element = $compile("<bootstrap-tagsinput />")($rootScope);
        expect(element.html()).toBe('<select multiple="" style="display: none;"></select><div class="bootstrap-tagsinput"><input size="1" type="text"></div>');
    });
});