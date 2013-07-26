// Creates a new element from the given elementHtml in a sandbox before each
// tests defined in the tests function. It initializes it as a tags input with
// the given options.
function testTagsInput(elementHtml, options, tests) {
  if (typeof options === 'function') {
    tests = options;
    options = undefined;
  }

  describe(elementHtml + ' (options: ' + JSON.stringify(options, function(name, value) { return (typeof value === "function") ? value.toString() : value; }) + ')', function() {
    var $sandbox;

    beforeEach(function() {
      $sandbox = $('<div />').appendTo($('body'));
      this.$element = $(elementHtml).appendTo($sandbox);
      this.$element.tagsinput(options);
    });

    afterEach(function() {
      this.$element.tagsinput('destroy');
      $sandbox.remove();
    });

    tests();
  });
}