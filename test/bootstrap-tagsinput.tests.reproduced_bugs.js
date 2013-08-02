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
  });
});