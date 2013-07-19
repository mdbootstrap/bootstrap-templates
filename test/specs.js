var $sandbox = $('<div />').appendTo($('body'));

beforeEach(function() {
});

afterEach(function() {
	$sandbox.empty();
});

describe("invoking tagsinput() on <input type=\"text\" />", function() {

	beforeEach(function() {
		$element = $('<input type="text" />').appendTo($sandbox);
		$element.tagsinput();
	});

	afterEach(function() {
		$element.tagsinput('destroy');
	});

	it("should hide input", function() {
		expect($element.css('display')).toBe('none');
	});
});