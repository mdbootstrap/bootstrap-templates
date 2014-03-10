angular.module('bootstrap-tagsinput', [])
	.directive('bootstrapTagsinput', [function() {
		return {
			restrict: 'EA',
			scope: {
				model: '=ngModel',
				placeholder: '@'
			},
			template: '<select multiple placeholder="{{placeholder}}"></select>',
			replace: false,
			link: function(scope, element, attrs) {
				$(function() {
					if (!angular.isArray(scope.model))
						scope.model = [];

					var select = $('select', element);
					var options = {
						itemValue: attrs.itemvalue || 'value',
						itemText : attrs.itemtext || 'display',
						tagClass : angular.isFunction(scope.$parent[attrs.tagclass]) ? scope.$parent[attrs.tagclass] : function(item) { return attrs.tagclass; }
					};
					if (angular.isFunction(scope.$parent[attrs.typeaheadSource])) {
						options.confirmKeys = [];
					}

					select.tagsinput(options);

					if (angular.isFunction(scope.$parent[attrs.typeaheadSource])) {

						var addTag = $.proxy(function (obj, datum) {
							var value;
							if (typeof(datum) != 'undefined' && datum.hasOwnProperty('value')) {
								//added by typeahead
								value = datum.value;
							} else {
								//added by input
								value = this.tagsinput('input').typeahead('val');
							}
							this.tagsinput('add', value);
							this.tagsinput('input').typeahead('val', '');
						}, select);
						select.tagsinput('input').typeahead(null, {
							source: scope.$parent[attrs.typeaheadSource],
							displayKey: options.itemText
						}).on('typeahead:selected', addTag).on('keydown', function (e) {
							if (e.which === 13) { //enter
								addTag();
							}
						});
					}

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