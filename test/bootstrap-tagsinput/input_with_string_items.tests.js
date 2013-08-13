describe("bootstrap-tagsinput", function() {

  describe("with strings as items", function() {

    testTagsInput('<input type="text" />', function() {
      it("should hide input", function() {
        expect(this.$element.css('display')).toBe('none');
      });

      describe("should not add tag", function() {
        it("when adding same item twice", function() {
          this.$element.tagsinput('add', 'some_tag');
          this.$element.tagsinput('add', 'some_tag');
          expect(this.$element.val()).toBe('some_tag');
        });

        it("when adding empty string", function() {
          this.$element.tagsinput('add', '');
          expect(this.$element.tagsinput('items').length).toBe(0);
        });

        it("when adding whitespace string", function() {
          this.$element.tagsinput('add', ' ');
          expect(this.$element.tagsinput('items').length).toBe(0);
        });

        it("when adding undefined", function() {
          this.$element.tagsinput('add', undefined);
          expect(this.$element.tagsinput('items').length).toBe(0);
        });

        it("when adding null", function() {
          this.$element.tagsinput('add', null);
          expect(this.$element.tagsinput('items').length).toBe(0);
        });
      });

      describe("should add tag", function() {
        it("when adding boolean false", function() {
          this.$element.tagsinput('add', false);
          expect(this.$element.tagsinput('items').length).toBe(1);
        });

        it("when adding boolean true", function() {
          this.$element.tagsinput('add', false);
          expect(this.$element.tagsinput('items').length).toBe(1);
        });
      });

      describe("invoke 'add' with a string", function() {
        beforeEach(function() {
          this.$element.tagsinput('add', 'some_tag');
        });

        it("val() should return 'some_tag'", function() {
          expect(this.$element.val()).toBe('some_tag');
        });

        it("'items' should return 1 item", function() {
          expect(this.$element.tagsinput('items').length).toBe(1);
        });

        describe("invoking 'remove'", function() {

          beforeEach(function() {
            this.$element.tagsinput('remove', 'some_tag');
          });

          it("val() should should return null", function() {
            expect(this.$element.val()).toBe('');
          });
        });
      });

      describe("invoke 'add' with a string containing a comma", function() {
        beforeEach(function() {
          this.$element.tagsinput('add', 'before,after');
        });

        it("val() should return 'before,after'", function() {
          expect(this.$element.val()).toBe('before,after');
        });

        it("'items' should return 2 items", function() {
          expect(this.$element.tagsinput('items').length).toBe(2);
        });
      });

      it("'focus' should place focus in input", function() {
        this.$element.tagsinput('focus');
        expect(hasFocus(this.$tagsinput_input)).toBe(true);
      });
    });

    testTagsInput('<input type="text" value="some,tags" />', function() {
      it('should have 2 tags', function() {
        expect(this.$element.tagsinput('items').length).toBe(2);
      });


      describe("invoke 'removeAll'", function() {
        beforeEach(function() {
          this.$element.tagsinput('removeAll');
        });

        it("should remove both tags", function() {
          expect(this.$element.tagsinput('items').length).toBe(0);
        });

        it("val() should return ''", function() {
          expect(this.$element.val()).toBe('');
        });
      });

      describe("BACKSPACE", function() {
        beforeEach(function() {
          this.$element.tagsinput('focus');
        });

        it('after last tag, should remove the last tag', function() {
          this.$tagsinput_input.trigger($.Event('keydown', { which: 8 }));
          expect(this.$element.tagsinput('items')[0]).toBe('some');
        });

        it('after last tag, should remove the last tag', function() {
          this.$tagsinput_input.trigger($.Event('keydown', { which: 8 }));
          expect(this.$element.tagsinput('items').length).toBe(1);
        });

        it('after first tag, should remove the first tag', function() {
          this.$tagsinput_input.trigger($.Event('keydown', { which: 37 }));
          this.$tagsinput_input.trigger($.Event('keydown', { which: 8 }));
          expect(this.$element.tagsinput('items')[0]).toBe('tags');
        });
      });

      describe("DELETE", function() {
        beforeEach(function() {
          this.$element.tagsinput('focus');
          // move cursor before last tag
          this.$tagsinput_input.trigger($.Event('keydown', { which: 37 }));
        });

        it('before last tag, should remove the last tag', function() {
          this.$tagsinput_input.trigger($.Event('keydown', { which: 46 }));
          expect(this.$element.tagsinput('items')[0]).toBe('some');
        });

        it('before last tag, should remove the last tag', function() {
          this.$tagsinput_input.trigger($.Event('keydown', { which: 46 }));
          expect(this.$element.tagsinput('items').length).toBe(1);
        });

        it('before first tag, should remove the first tag', function() {
          this.$tagsinput_input.trigger($.Event('keydown', { which: 37 }));
            this.$tagsinput_input.trigger($.Event('keydown', { which: 46 }));
          expect(this.$element.tagsinput('items')[0]).toBe('tags');
        });
      });
    });
  });
});