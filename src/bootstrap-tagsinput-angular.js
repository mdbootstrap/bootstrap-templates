angular.module('bootstrap.tagsinput', [])
.directive('bootstrapTagsinput', ['$parse', function($parse) {
  return {
    restrict: 'EA',
    scope: {
      model: '=ngModel'
    },
    template: '<select multiple></select>',
    replace: false,
    link: function(scope, element, attrs) {
      $(function() {
        if (!angular.isArray(scope.model))
          scope.model = [];

        var select = $('select', element);

        select.tagsinput({
          source: angular.isFunction(scope.$parent[attrs.source]) ? scope.$parent[attrs.source] : null,
          itemValue: angular.isFunction(scope.$parent[attrs.itemvalue]) ? scope.$parent[attrs.itemvalue] : function(item) { return item[attrs.itemvalue]; },
          itemText: angular.isFunction(scope.$parent[attrs.itemtext]) ? scope.$parent[attrs.itemtext] : function(item) { return item[attrs.itemtext]; },
          tagClass: angular.isFunction(scope.$parent[attrs.tagclass]) ? scope.$parent[attrs.tagclass] : function(item) { return attrs.tagclass; },
          items : scope.model
        });

        for (var i = 0; i < scope.model.length; i++) {
          select.tagsinput('add', scope.model[i]);
        }

        var prev = scope.model.slice();
        scope.$watch("model", function() {
          var added = scope.model.filter(function(i) {return prev.indexOf(i) === -1;}),
              removed = prev.filter(function(i) {return scope.model.indexOf(i) === -1;}),
              same = scope.model.filter(function(i) {return prev.indexOf(i) > -1;}),
              i;
          prev = scope.model.slice();

          for (i = 0; i < removed.length; i++) {
            select.tagsinput('remove', removed[i]);
          }

          select.tagsinput('refresh');

          for (i = 0; i < added.length; i++) {
            select.tagsinput('add', added[i]);
          }
        }, true);
      });
    }
  };
}]);