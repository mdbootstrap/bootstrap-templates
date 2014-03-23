angular.module('bootstrap-tagsinput', [])
.directive('bootstrapTagsinput', [function() {
  "use strict";
  function getItemProperty(scope, property) {
    if (!property)
      return undefined;

    if (angular.isFunction(scope.$parent[property]))
      return scope.$parent[property];

    return function(item) {
      return item[property];
    };
  }
  var tagsInputController = ['$scope', function($scope){
    this.getInput = function getInput(){
        return $scope.select.tagsinput('input');
    }
  }];

  return {
    restrict: 'EA',
    controller: tagsInputController,
    scope: {
      model: '=ngModel'
    },
    template: '<select multiple></select>',
    replace: false,
    link: function(scope, element, attrs) {
      $(function() {
        if (!angular.isArray(scope.model))
          scope.model = [];

        // create a shallow copy of model's current state, needed to determine
        // diff when model changes
        var prev = scope.model.slice();

        scope.select = $('select', element);

        scope.select.tagsinput({
          itemValue: getItemProperty(scope, attrs.itemvalue),
          itemText : getItemProperty(scope, attrs.itemtext),
          tagClass : angular.isFunction(scope.$parent[attrs.tagclass]) ? scope.$parent[attrs.tagclass] : function(item) { return attrs.tagclass; }
        });

        for (var i = 0; i < scope.model.length; i++) {
          scope.select.tagsinput('add', scope.model[i]);
        }

        scope.select.on('itemAdded', function(event) {
          scope.$apply( function(){
            if (scope.model.indexOf(event.item) === -1){
              scope.model.push(event.item);
              //element already removed from the typeahead control stop the model watcher from updating
              prev = scope.model.slice();
            }
          });
        });

        scope.select.on('itemRemoved', function(event) {
          scope.$apply( function(){
            var idx = scope.model.indexOf(event.item);
            if (idx !== -1){
              scope.model.splice(idx, 1);
              //element already removed from the typeahead control stop the model watcher from updating
              prev = scope.model.slice();
            }
          });
        });

        scope.$watch("model", function() {
          var added = scope.model.filter(function(i) {return prev.indexOf(i) === -1;}),
              removed = prev.filter(function(i) {return scope.model.indexOf(i) === -1;}),
              i;

          prev = scope.model.slice();

          // Remove tags no longer in binded model
          for (i = 0; i < removed.length; i++) {
            scope.select.tagsinput('remove', removed[i]);
          }

          // Refresh remaining tags
          scope.select.tagsinput('refresh');

          // Add new items in model as tags
          for (i = 0; i < added.length; i++) {
            scope.select.tagsinput('add', added[i]);
          }
        }, true);
      });
    }
  };
}]);
