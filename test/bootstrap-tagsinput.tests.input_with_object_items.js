describe("bootstrap-tagsinput", function() {

	describe("with objects as items", function() {
		testTagsInput('<input type="text" />', function() {
			it("adding a item should throw an exception", function() {
				var element = this.$element;
				expect(function() { element.tagsinput('add', {}); }).toThrow("Can't add objects when itemId option is not set");
			});
		});

		testTagsInput('<input type="text" />', { itemId: function(item) { return item.id; } }, function() {
			describe("adding an item", function() {
				var item = { id: 1 };
				beforeEach(function() {
					this.$element.tagsinput('add', item);
				});
				it("'items' should return the item", function() {
					expect(this.$element.tagsinput('items')[0]).toBe(item);
				});
				it("val() should return the item's id", function() {
					expect(this.$element.val()).toBe("1");
				});
				it("tag's label should be the item's id", function() {
					expect($('.tag', this.$sandbox).text()).toBe("1");
				});
			});
		});

		testTagsInput('<input type="text" />', { itemId: 'id' }, function() {
			describe("adding an item", function() {
				var item = { id: 1 };
				beforeEach(function() {
					this.$element.tagsinput('add', item);
				});
				it("'items' should return the item", function() {
					expect(this.$element.tagsinput('items')[0]).toBe(item);
				});
				it("val() should return the item's id", function() {
					expect(this.$element.val()).toBe("1");
				});
				it("tag's label should be the item's id", function() {
					expect($('.tag', this.$sandbox).text()).toBe("1");
				});
			});
		});

		testTagsInput('<input type="text" />', { itemId: function(item) { return item.id; }, itemLabel: function(item) { return item.label; } }, function() {
			describe("adding an item", function() {
				var item = { id: 1, label: 'some' };
				beforeEach(function() {
					this.$element.tagsinput('add', item);
				});
				it("'items' should return the item", function() {
					expect(this.$element.tagsinput('items')[0]).toBe(item);
				});
				it("val() should return the item's id", function() {
					expect(this.$element.val()).toBe("1");
				});
				it("tag's label should be the item's label", function() {
					expect($('.tag', this.$sandbox).text()).toBe("some");
				});
			});
		});
	});
});