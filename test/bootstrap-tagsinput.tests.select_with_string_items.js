describe("bootstrap-tagsinput", function() {

  describe("with strings as items", function() {

    testTagsInput("<select multiple />", function() {

      describe("when added 1 item", function() {
        beforeEach(function() {
          this.$element.tagsinput('add', 'some_tag');
        });

        it("val() should return array containing 1 item", function() {
          expect(this.$element.val()[0]).toBe('some_tag');
        });

        describe("invoking 'remove'", function() {
          beforeEach(function() {
            this.$element.tagsinput('remove', 'some_tag');
          });

          it("val() should should return null", function() {
            expect(this.$element.val()).toBeNull();
          });

          it("there should be no <option /> elements", function() {
            expect($("option", this.$sandbox).length).toBe(0);
          });
        });
      });

      describe("when added item containing a comma", function() {
        beforeEach(function() {
          this.$element.tagsinput('add', 'before,after');
        });

        it("val() should return array containing 1 item", function() {
          expect(this.$element.val()[0]).toBe('before,after');
        });
      });
    });

    testTagsInput('<select multiple><option value="some">some</option></select>', function() {
      it('should have one tag', function() {
        expect(this.$element.tagsinput('items')[0]).toBe('some');
      });
    });
  });
});