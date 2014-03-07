/* Angular directive for use with bootstrap-tagsinput
 * ties bootstrap-tagsinput functionality in with an
 * angular project and twitter typeahead (0.10.1)
 *
 */

angular.module('bootstrap-tagsinput', [])
.directive('bootstrapTagsinput', [function() {

  function getItemProperty(scope, property) {
    if (!property)
      return undefined;

    if (angular.isFunction(scope.$parent[property]))
      return scope.$parent[property];

    return function(item) {
      return item[property];
    };
  }

  return {
    restrict: 'EA',
    scope: {
      model: '=ngModel',
      tagclass: "&"
    },
    template: '<select multiple placeholder="{{placeholder}}"></select>',
    replace: false,
    link: function(scope, elem, attrs) {
      $(function() {
        if (!angular.isArray(scope.model)) { scope.model = []; }
        var select = $('select', elem);

        var getTagClass = function(city) {
          return scope.tagclass({city:city});
        };
        // initialize tagsinput
        select.tagsinput({
          itemValue: getItemProperty(scope, attrs.itemvalue),
          itemText : getItemProperty(scope, attrs.itemtext),
          tagClass : getTagClass
        });
        // initialize typeahead
        select.tagsinput('input').typeahead({
          valueKey: attrs.itemtext,
          prefetch: attrs.typeaheadSource,
          template: '<p>{{text}}</p>',
          engine: Hogan
        }).bind('typeahead:selected', function (obj, datum) {
          // add tag and clear input when suggestion is selected
          select.tagsinput('add', datum);
          select.tagsinput('input').typeahead('setQuery', '');
        });
        // Keypress events for tag control
        // Seperated out to directive to allow better flexibility in actions taken
        select.tagsinput('input').keydown(function(e) {
          var keycode = (e.keyCode ? e.keyCode : e.which);
          // add tag when tab (9), enter (13) or comma (188) is pressed
          if (keycode === 9 || keycode === 13 || keycode === 188) {
            e.preventDefault();
            e.stopPropagation();
            var tagInput = $(this).val();
            // but only if there is data to add
            if ( tagInput ) {
              $(this).typeahead('val', '');
              select.tagsinput('add', { tag: tagInput });
            }
          }
        });

        for (var i = 0; i < scope.model.length; i++) {
          select.tagsinput('add', scope.model[i]);
        }

        select.on('itemAdded', function(event) {
          if (scope.model.indexOf(event.item) === -1)
            scope.model.push(event.item);
        });

        select.on('itemRemoved', function(event) {
          var idx = scope.model.indexOf(event.item);
          if (idx !== -1)
            scope.model.splice(idx, 1);
        });

        // create a shallow copy of model's current state, needed to determine
        // diff when model changes
        var prev = scope.model.slice();
        scope.$watch("tags", function() {
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