// Creates a new element from the given elementHtml in a sandbox before each
// tests defined in the tests function. It initializes it as a tags input with
// the given options.
function testTagsInput(elementHtml, options, tests) {
  if (typeof options === 'function') {
    tests = options;
    options = undefined;
  }

  describe(elementHtml + ' (options: ' + JSON.stringify(options, function(name, value) { return (typeof value === "function") ? value.toString() : value; }) + ')', function() {
   beforeEach(function() {
      this.$sandbox = $('<div />').appendTo($('body'));
      this.$element = $(elementHtml).appendTo(this.$sandbox);
      this.$element.tagsinput(options);
      this.$tagsinput = $('.bootstrap-tagsinput', this.$sandbox);
      this.$tagsinput_input = $('input', this.$tagsinput);
    });

    afterEach(function() {

      this.$element.tagsinput('destroy');
      this.$sandbox.remove();

      delete this.$tagsinput_input;
      delete this.$tagsinput;
      delete this.$sandbox;
      delete this.$element;
    });

    tests();
  });
}

function hasFocus($elt) {
  return $elt.get(0) === document.activeElement;
}