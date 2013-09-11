angular.module('bsTagsInput', [])
/**
 * @ngdoc directive
 * @name bsTagsInput
 * @restrict A
 *
 * @description
 * Sets up an input field for tag inputs, using the bootstrap-tagsinput jQuery plugin.  Optionally
 * uses typeahead.js for autocompletion.
 *
 * @element INPUT or SELECT
 * @param {Object} options passed to the bootstrap-tagsinput plugin at initialization.
 *    The typeahead option, if specified, will instead be passed to the typeahead.js plugin.
 *
 * @example
    <doc:example>
      <doc:source>
        <script>
          function Ctrl($scope) {
            $scope.tags = ['Amsterdam', 'Washington'];
            $scope.tagsOptions = {
              typeahead: {
                local: ['Sydney', 'Beijing', 'Cairo']
              }
            }
          }
        </script>
        <form ng-controller="Ctrl">
          <input type="text" ng-model="tags" bs-tags-input="tagsOptions">
          <pre>{{tags}}</pre>
        </form>
      </doc:source>
    </doc:example>
 */
.directive('bsTagsInput', function() {
  // reference to underscorejs/lodash difference method
  var difference;
  if (typeof(_) !== 'undefined') {
    difference = _.difference;
  } else {
    // fallback to a naive implementation
    difference = function(array, other) {
      var results = [];
      angular.forEach(array, function(value) {
        if (other.indexOf(value) === -1) {
          results.push(value);
        }
      });
      return results;
    };
  }

  return {
    require: 'ngModel',
    link: function(scope, element, attrs, ngModelCtrl) {
      // parse options
      var options = {};
      if (attrs.bsTagsInput) {
        options = scope.$eval(attrs.bsTagsInput);
      }
      var typeaheadOpts = options.typeahead;
      delete options.typeahead;
      if (jQuery.fn.typeahead === undefined) {
        typeaheadOpts = undefined;
      }

      // initialize tagsinput
      element.tagsinput(options);

      // handle changes from the underlying model
      ngModelCtrl.$render = function() {
        var oldVal = element.tagsinput('items'),
            newVal = ngModelCtrl.$viewValue;
        difference(oldVal, newVal).forEach(function(item) {
          element.tagsinput('remove', item, true);
        });
        difference(newVal, oldVal).forEach(function(item) {
          element.tagsinput('add', item, true);
        });
      };

      // handle changes from the UI
      element.on('change', function() {
        var items = element.tagsinput('items');
        ngModelCtrl.$setViewValue(items);
      });

      // handle cleanup
      scope.$on('$destroy', function() {
        element.tagsinput('destroy');
      });

      // setup typeahead, if desired
      if (typeaheadOpts !== undefined) {
        element.tagsinput('input')
            .typeahead(typeaheadOpts)
            .bind('typeahead:selected', function(obj, datum) {
          element.tagsinput('add', datum.value);
          element.tagsinput('input').typeahead('setQuery', '');
        });
      }
    }
  };
});
