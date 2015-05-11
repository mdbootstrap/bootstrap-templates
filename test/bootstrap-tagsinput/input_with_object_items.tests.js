describe("bootstrap-tagsinput", function() {
  describe("with objects as items", function() {

    testTagsInput('<input type="text" />', function() {
      it("Adding an item without itemValue option set should throw an exception", function() {
        var element = this.$element;
        expect(function() { element.tagsinput('add', {}); }).toThrow("Can't add objects when itemValue option is not set");
      });
    });

    testTagsInput('<input type="text" />', { itemValue: 'value' }, function() {
      describe("Adding an item", function() { //, indicating object's property name in itemValue
        var item;
        beforeEach(function() {
          item = { value: 1 };
          this.$element.tagsinput('add', item);
        });
        it("'items' should return the item", function() {
          expect(this.$element.tagsinput('items')[0]).toBe(item);
        });
        it("'items' should returns exactly 1 item", function() {
          expect(this.$element.tagsinput('items').length).toBe(1);
        });
        it("val() should return the item's value", function() {
          expect(this.$element.val()).toBe("1");
        });
        it("tag's text should be the item's value", function() {
          expect($('.tag', this.$sandbox).text()).toBe("1");
        });
      });
    });

    testTagsInput('<input type="text" />', { itemValue: function(item) { return item.id; } }, function() {
      describe("Adding an item using a function as itemValue", function() {
        var item;
        beforeEach(function() {
          item = { id: 1 };
          this.$element.tagsinput('add', item);
        });
        it("val() should return the item's value", function() {
          expect(this.$element.val()).toBe("1");
        });
      });
    });

    testTagsInput('<input type="text" />', { itemValue: 'value', itemText: 'text' }, function() {
      describe("Adding an item including a tag text using itemText option as object's property name", function() {

        var item = { value: 1, text: 'some' };
        beforeEach(function() {
          this.$element.tagsinput('add', item);
        });

        it("tag's text should be the item's text", function() {
          expect($('.tag', this.$sandbox).text()).toBe("some");
        });
      });
    });

    testTagsInput('<input type="text" />', { itemValue: 'value', itemText: function(item) { return item.name; } }, function() {
      describe("Adding an item including a tag text using itemText option as function", function() {

        var item = { value: 1, name: 'Mr, Doe' };
        beforeEach(function() {
          this.$element.tagsinput('add', item);
        });

        it("tag's text should be the item's text", function() {
          expect($('.tag', this.$sandbox).text()).toBe("Mr, Doe");
        });
      });
    });

    testTagsInput('<input type="text" />', { itemValue: 'value', itemTitle: function(item) { return item.title; } }, function() {
      describe("Adding an item with a title", function() {
        var item;

        beforeEach(function() {
          item = { value: 1, text: 'one', title: 'number one' };
          this.$element.tagsinput('add', item);
        });

        it("tag's title should be the item's title", function() {
          expect($('.tag', this.$sandbox).attr('title')).toBe("number one");
        });
      });
    });

    testTagsInput('<input type="text" />', { itemValue: 'value', itemText: 'text' }, function() {
      describe("Change item and invoke refresh to apply changes" , function() {

        var item = { value: 1, text: 'some' };
        beforeEach(function() {
          this.$element.tagsinput('add', item);
          item.text = 'changed';
          this.$element.tagsinput('refresh');
        });

        it("should update tags's text", function() {
          expect($('.tag', this.$sandbox).text()).toBe('changed');
        });
        it("tag should still have remove button", function() {
          expect($('[data-role=remove]', this.$sandbox)[0]).not.toBeUndefined();
        });
      });
    });

  });
});
