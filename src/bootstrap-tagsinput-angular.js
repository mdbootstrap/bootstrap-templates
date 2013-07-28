angular.module('bootstrap.tagsinput', [])
.directive('bootstrapTagsinput', ['$parse', function($parse) {
  return {
    restrict: 'EA',
    scope: {
      model: '=ngModel'
    },
    template: '<select multiple></select>',
    replace: true,
    link: function(scope, element, attrs) {
      $(function() {
        element.tagsinput({
          source: angular.isFunction(scope.$parent[attrs.source]) ? scope.$parent[attrs.source] : null,
          itemValue: angular.isFunction(scope.$parent[attrs.itemvalue]) ? scope.$parent[attrs.itemvalue] : function(item) { return item[attrs.itemvalue]; },
          itemText: angular.isFunction(scope.$parent[attrs.itemtext]) ? scope.$parent[attrs.itemtext] : function(item) { return item[attrs.itemtext]; },
          tagClass: angular.isFunction(scope.$parent[attrs.tagclass]) ? scope.$parent[attrs.tagclass] : function(item) { return attrs.tagclass; }
        });

        element.val(scope.model);
      });
    }
  };
}]);