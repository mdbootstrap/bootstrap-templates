describe("bootstrap-tagsinput", function() {

  describe("Reproduced bugs", function() {

    describe("#1: Demo error", function() {

      testTagsInput('<input type="text" value="some_tag" />', function() {
        it("clicking remove button should remove item", function() {
          $('[data-role=remove]', this.$sandbox).trigger('click');
          expect(this.$element.tagsinput('items').length).toBe(0);
        });
        it("clicking remove button should remove tag element", function() {
          $('[data-role=remove]', this.$sandbox).trigger('click');
          expect($('.tag', this.$sandbox).length).toBe(0);
        });
      });
    });

    describe("#11: Cannot remove an item by programming", function() {
      testTagsInput('<input type="text" />', { itemValue: function(item) { return item.value; } }, function() {
        describe("add two different objects with same value", function() {
          var item1 = { value: 1 },
              item2 = { value: 1 };

          beforeEach(function() {
            this.$element.tagsinput('add', item1);
            this.$element.tagsinput('add', item2);
          });
          it("'items' should return the first added item", function() {
            expect(this.$element.tagsinput('items')[0]).toBe(item1);
          });
          it("'items' should return exactly 1 item", function() {
            expect(this.$element.tagsinput('items').length).toBe(1);
          });
          it("should have exactly 1 tag", function() {
            expect($('.tag', this.$sandbox).length).toBe(1);
          });
        });

        describe("remove item", function() {
          beforeEach(function() {
            this.$element.tagsinput('add', { value: 1 });
          });
          it("by value, should remove then item", function() {
            this.$element.tagsinput('remove', 1);
            expect(this.$element.tagsinput('items').length).toBe(0);
          });
          it("by value, should remove then tag", function() {
            this.$element.tagsinput('remove', 1);
            expect($('.tag', this.$sandbox).length).toBe(0);
          });
          it("by different instance, should remove then tag", function() {
            this.$element.tagsinput('remove', { value: 1 });
            expect($('.tag', this.$sandbox).length).toBe(0);
          });
          it("should remove items when none of the items have a matching value", function() {
            this.$element.tagsinput('add', { value: 1 });
            this.$element.tagsinput('remove', 2);
            expect(this.$element.tagsinput('items').length).toBe(1);
          });
        });
      });

      testTagsInput('<select />', { itemValue: function(item) { return item.value; } }, function() {
        describe("add two objects", function() {
          var item1 = { value: 1 },
              item2 = { value: 2 };

          beforeEach(function() {
            this.$element.tagsinput('add', item1);
            this.$element.tagsinput('add', item2);
          });
          it("'items' should return the last added item", function() {
            expect(this.$element.tagsinput('items')[0]).toBe(item2);
          });
          it("'items' should return exactly 1 item", function() {
            expect(this.$element.tagsinput('items').length).toBe(1);
          });
          it("should have exactly 1 tag", function() {
            expect($('.tag', this.$sandbox).length).toBe(1);
          });
          it("val() should return first item's value", function() {
            expect(this.$element.val()).toBe("2");
          });
        });
      });

    });
  });
});