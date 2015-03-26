describe("bootstrap-tagsinput", function() {

  describe("events", function() {
    testTagsInput('<input type="text" />', function() {
      it("beforeItemAdd canceled", function() {
        this.$element.on('beforeItemAdd', function(event) {
          event.cancel = true;
        });
        this.$element.tagsinput('add', 'some');
        expect(this.$element.tagsinput('items').length).toBe(0);
      });
    });

    testTagsInput('<input type="text" value="1" />', function() {
      it("beforeItemRemove canceled", function() {
        this.$element.on('beforeItemRemove', function(event) {
          event.cancel = true;
        });
        this.$element.tagsinput('remove', '1');
        expect(this.$element.tagsinput('items').length).toBe(1);
      });
    });
  });
});
