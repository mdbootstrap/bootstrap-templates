angular.module('bootstrap-tagsinput-directives', [])
	.directive('bootstrapTagsinput', function() {
		return {
			restrict: 'EA',
			require:'?ngModel',
			compile: function(element, attrs, transclude) {
				var template = attrs['multiple'] ? '<select />'	: '<input />';

				$input = $(template);

				$(element).replaceWith($input);

				return function postLink(scope,element,attrs) {
					$(element).tagsinput();
				};
			}
		};
	});