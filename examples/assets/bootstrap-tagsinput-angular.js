angular.module('bootstrap.tagsinput', [])
.directive('bootstrapTagsinput', [function() {
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
          source   : angular.isFunction(scope.$parent[attrs.source])    ? scope.$parent[attrs.source]    : null,
          itemValue: angular.isFunction(scope.$parent[attrs.itemvalue]) ? scope.$parent[attrs.itemvalue] : function(item) { return item[attrs.itemvalue]; },
          itemText : angular.isFunction(scope.$parent[attrs.itemtext])  ? scope.$parent[attrs.itemtext]  : function(item) { return item[attrs.itemtext]; },
          tagClass : angular.isFunction(scope.$parent[attrs.tagclass])  ? scope.$parent[attrs.tagclass]  : function(item) { return attrs.tagclass; }
        });

        for (var i = 0; i < scope.model.length; i++) {
          select.tagsinput('add', scope.model[i]);
        }

        // create a shallow copy of model's current state, needed to determine
        // diff when model changes
        var prev = scope.model.slice();
        scope.$watch("model", function() {
          var added = scope.model.filter(function(i) {return prev.indexOf(i) === -1;}),
              removed = prev.filter(function(i) {return scope.model.indexOf(i) === -1;}),
              i;

          prev = scope.model.slice();

          // Remove tags no longer in binded model
          for (i = 0; i < removed.length; i++) {
            select.tagsinput('remove', removed[i]);
          }

          // Refresh remaining tags
          select.tagsinput('refresh');

          // Add new items in model as tags
          for (i = 0; i < added.length; i++) {
            select.tagsinput('add', added[i]);
          }
        }, true);
      });
    }
  };
}]);