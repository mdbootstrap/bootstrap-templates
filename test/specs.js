var $sandbox = $('<div />').appendTo($('body'));

beforeEach(function() {
});

afterEach(function() {
	$sandbox.empty();
});

describe('invoking tagsinput() on <input type="text" />', function() {

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

	describe("when added 1 item", function() {

		beforeEach(function() {
			$element.tagsinput('add', 'some_tag');
		});

		it("'value', should return array containing 1 item", function() {
			expect($element.tagsinput('value')).toBe('some_tag');
		});

		it("val() should return array containing 1 item", function() {
			expect($element.val()).toBe('some_tag');
		});

		describe("invoking 'remove'", function() {

			beforeEach(function() {
				$element.tagsinput('remove', 'some_tag');
			});

			it("'value', should return null", function() {
				expect($element.tagsinput('value')).toBe('');
			});

			it("val() should should return null", function() {
				expect($element.val()).toBe('');
			});
		});
	});
});

describe('invoking tagsinput() on <select multiple="multiple"/>', function() {

	beforeEach(function() {
		$element = $('<select multiple="multiple" />').appendTo($sandbox);
		$element.tagsinput();
	});

	afterEach(function() {
		$element.tagsinput('destroy');
	});

	describe("when added 1 item", function() {

		beforeEach(function() {
			$element.tagsinput('add', 'some_tag');
		});

		it("'value', should return array containing 1 item", function() {
			expect($element.tagsinput('value')[0]).toBe('some_tag');
		});

		it("val() should return array containing 1 item", function() {
			expect($element.val()[0]).toBe('some_tag');
		});

		describe("invoking 'remove'", function() {

			beforeEach(function() {
				$element.tagsinput('remove', 'some_tag');
			});

			it("'value', should return null", function() {
				expect($element.tagsinput('value')).toBeNull();
			});

			it("val() should should return null", function() {
				expect($element.val()).toBeNull();
			});
		});
	});
});