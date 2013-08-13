describe("bootstrap-tagsinput", function() {

  describe("with objects as items", function() {
    
    testTagsInput('<select multiple />', { itemValue: function(item) { return item.value; }, itemText: function(item) { return item.text; } }, function() {
      describe("adding an item", function() {
        var item;
        beforeEach(function() {
          item = { value: 1, text: 'some' };
          this.$element.tagsinput('add', item);
        });
        it("'items' should return the item", function() {
          expect(this.$element.tagsinput('items')[0]).toBe(item);
        });
        it("val() should return the item's value", function() {
          expect(this.$element.val()[0]).toBe("1");
        });
        it("tag's text should be the item's text", function() {
          expect($('.tag', this.$sandbox).text()).toBe("some");
        });

        describe("change item's value and text and invoke 'refesh'", function() {
          beforeEach(function() {
            item.value = 2;
            item.text = 'changed';
            this.$element.tagsinput('refresh');
          });

          it("should update tags's text", function() {
            expect($('.tag', this.$sandbox).text()).toBe('changed');
          });
          it("val() should return item's new value", function() {
            expect(this.$element.val()[0]).toBe("2");
          });
        });
      });
    });
  });
});