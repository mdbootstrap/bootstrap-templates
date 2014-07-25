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

    describe("#34: Error in ReloadPage", function() {
      describe("init tagsinput with objects as items, but with value set on element", function() {
        testTagsInput('<input type="text" value="1" />', { itemValue: function(item) { return item.value; } }, function() {
          it("should have no tags", function() {
            expect(this.$element.tagsinput('items').length).toBe(0);
          });
        });

        testTagsInput('<select><option value="1" /></select>', { itemValue: function(item) { return item.value; } }, function() {
          it("should have no tags", function() {
            expect(this.$element.tagsinput('items').length).toBe(0);
          });
        });
      });
    });

    describe("#90: Error in reinitialization (arg1 and arg2 are undefined)", function() {
      describe("init tagsinput twice", function() {
        testTagsInput('<input type="text" value="1" />', { itemValue: function(item) { return item.value; } }, function() {
          it("should not fail if an element is reinitialized", function () {
            this.$element.tagsinput();
          });
          it("should return the original instance if already initialized", function () {
            return this.$element.tagsinput() === this;
          });
        });
      });
    });
    
    describe("#142: Initialization of Null Values for Multi Select field", function() {
      testTagsInput('<select multiple data-role="tagsinput"></select>', function() {
        it("Initializing an empty select shouldn't throw an error.", function() {
            $("select[multiple][data-role=tagsinput]").tagsinput();
        });
      });
    });

    describe("#128: Custom classes for tags don't work if entered as strings", function() {
      testTagsInput('<input type="text" value="1" />', { tagClass: 'big' }, function() {
        it("should have a tag with class 'big' when using tagClass option as string", function() {
            expect($(".big", this.$tagsinput).length).toBe(1);
        });
      });

      testTagsInput('<input type="text" value="1" />', { tagClass: function() { return 'big'; } }, function() {
        it("should have a tag with class 'big' when using tagClass option as function", function() {
            expect($(".big", this.$tagsinput).length).toBe(1);
        });
      });
    });

    describe("#107: Fixed bug when removing items", function() {
      testTagsInput('<input type="text" value="yes,no" />', function() {
        it("should not remove items when remove a non-existing item", function() {
            this.$element.tagsinput('remove', 'maybe');
            expect(this.$element.tagsinput('items').length).toBe(2);
        });
      });
    });
  });
});