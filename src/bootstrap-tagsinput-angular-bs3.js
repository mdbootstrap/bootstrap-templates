/**
 * @ngdoc directive
 * @name bootstrap-tagsinput.directive:bootstrapTagsinput
 * @element ANY
 * @restrict EA
 * @prefix data-
 * @param {array} ngModel angular model that contains the tags that have been added
 * @param {string} placeholder placeholder text for the add tag input field
 * @param {string} typeaheadSource name of function in parent scope that returns the typeahead query function
 * @param {string} tagclass name of function in parent scope that returns the classes for a tag (or a string of classes to statically add)
 * @param {string} itemvalue (default: value) name of function in parent scope that returns the value of an item (or the property that contains the value)
 * @param {string} itemtext (defaults to value of itemvalue) name of function in parent scope that returns the display text of an item (or the property that contains the text)
 * @description
 * Creates a bootstrap-tagsinput UI element
 */
angular.module('bootstrap-tagsinput', [])
	.directive('bootstrapTagsinput', [function() {

		//this function will create the getter function for itemValue and itemText
		function getItemProperty(scope, property) {
			if (!property)
				return undefined;

			if (angular.isFunction(scope.$parent[property]))
				return scope.$parent[property];

			return function(item) {
				return (angular.isObject(item) && item.hasOwnProperty(property)) ? item[property] : item;
			};
		}

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
					var itemValue;
					var options = {
						tagClass : angular.isFunction(scope.$parent[attrs.tagclass]) ? scope.$parent[attrs.tagclass] : function(item) { return attrs.tagclass; }
					};
					if (angular.isDefined(attrs.itemvalue)) {
						itemValue = attrs.itemvalue;
						options.itemValue = getItemProperty(scope, attrs.itemvalue);
					} else {
						itemValue = 'value';
					}
					if (angular.isDefined(attrs.itemtext)) {
						options.itemText = getItemProperty(scope, attrs.itemtext);
					}
					if (angular.isFunction(scope.$parent[attrs.typeaheadSource])) {
						options.confirmKeys = [];
					}

					select.tagsinput(options);

					if (angular.isFunction(scope.$parent[attrs.typeaheadSource])) {

						var addTag = $.proxy(function (obj, datum) {
							var item ;
							if (typeof(datum) != 'undefined' && options.itemValue(datum)) {
								//added by typeahead
								item = datum;
							} else {
								//added by input
								item = this.tagsinput('input').typeahead('val');
							}
							this.tagsinput('add', item);
							this.tagsinput('input').typeahead('val', '');
						}, select);
						select.tagsinput('input').typeahead(null, {
							source: scope.$parent[attrs.typeaheadSource],
							displayKey: options.itemText || itemValue
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
						if (scope.model.indexOf(event.item) === -1) {
							scope.model.push(event.item);
							scope.$apply();
						}
					});

					select.on('itemRemoved', function(event) {
						var idx = scope.model.indexOf(event.item);
						if (idx !== -1) {
							scope.model.splice(idx, 1);
							scope.$apply();
						}
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