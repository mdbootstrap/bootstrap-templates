var $sandbox = $('<div />').appendTo($('body'));

beforeEach(function() {
});

afterEach(function() {
	$sandbox.empty();
});

describe('invoke tagsinput() on', function() {
	describe('<input type="text" />', function() {

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

		it("add same item twice, should not add tag second time", function() {
			$element.tagsinput('add', 'some_tag');
			$element.tagsinput('add', 'some_tag');
			expect($element.val()).toBe('some_tag');
		});

		it("add empty string, should not add tag", function() {
			$element.tagsinput('add', '');
			expect($element.tagsinput('items').length).toBe(0);
		});

		it("add whitespace string, should not add tag", function() {
			$element.tagsinput('add', ' ');
			expect($element.tagsinput('items').length).toBe(0);
		});

		it("add undefined, should not add tag", function() {
			$element.tagsinput('add', undefined);
			expect($element.tagsinput('items').length).toBe(0);
		});

		it("add null, should not add tag", function() {
			$element.tagsinput('add', null);
			expect($element.tagsinput('items').length).toBe(0);
		});

		it("add false, should add tag", function() {
			$element.tagsinput('add', false);
			expect($element.tagsinput('items').length).toBe(1);
		});

		describe("when added 1 item", function() {

			beforeEach(function() {
				$element.tagsinput('add', 'some_tag');
			});

			it("val() should return 'some_tag'", function() {
				expect($element.val()).toBe('some_tag');
			});

			describe("invoking 'remove'", function() {

				beforeEach(function() {
					$element.tagsinput('remove', 'some_tag');
				});

				it("val() should should return null", function() {
					expect($element.val()).toBe('');
				});
			});
		});

		describe("containing a comma", function() {

			beforeEach(function() {
				$element.tagsinput('add', 'before,after');
			});

			it("val() should return 'before,after'", function() {
				expect($element.val()).toBe('before,after');
			});
		});

		describe("invoke val()", function() {
			describe("with 'some_tag'", function() {
				beforeEach(function() {
					$element.val('some_tag');
				});

				it("val() should return 'some_tag'", function() {
					expect($element.val()).toBe('some_tag');
				});

				it("'items' should return 1 item", function() {
					expect($element.tagsinput('items').length).toBe(1);
				});
			});

			describe("with a string containing a comma", function() {
				beforeEach(function() {
					$element.val('before,after');
				});

				it("val() should return same string", function() {
					expect($element.val()).toBe('before,after');
				});

				it("'items' should return 2 item", function() {
					expect($element.tagsinput('items').length).toBe(2);
				});
			});
		});
	});

	describe('<input type="text" value="some,tags" />', function() {
		beforeEach(function() {
			$element = $('<input type="text" value="some,tags" />').appendTo($sandbox);
			$element.tagsinput();
		});

		it('should have tags', function() {
			expect($element.tagsinput('items').length).toBe(2);
		});
	});

	describe('<select multiple="multiple"/>', function() {

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

			it("val() should return array containing 1 item", function() {
				expect($element.val()[0]).toBe('some_tag');
			});

			describe("invoking 'remove'", function() {

				beforeEach(function() {
					$element.tagsinput('remove', 'some_tag');
				});

				it("val() should should return null", function() {
					expect($element.val()).toBeNull();
				});
			});
		});

		describe("when added item containing a comma", function() {

			beforeEach(function() {
				$element.tagsinput('add', 'before,after');
			});

			it("val() should return array containing 1 item", function() {
				expect($element.val()[0]).toBe('before,after');
			});
		});

		describe("invoke val()", function() {
			describe("with 'some_tag'", function() {
				beforeEach(function() {
					$element.val('some_tag');
				});

				it("val() should return an array containing 'some_tag'", function() {
					expect($element.val()[0]).toBe('some_tag');
				});

				it("'items' should return 1 item", function() {
					expect($element.tagsinput('items').length).toBe(1);
				});
			});

			describe("with a string containing a comma", function() {
				beforeEach(function() {
					$element.val('before,after');
				});

				it("val() should return an array containing 1 value", function() {
					expect($element.val().length).toBe(1);
				});

				it("'items' should return 1 item", function() {
					expect($element.tagsinput('items').length).toBe(1);
				});
			});
		});
	});
});