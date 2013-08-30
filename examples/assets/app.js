prettyPrint();

$(function() {
  $('input, select').on('change', function(event) {
    var $element = $(event.target),
      $container = $element.closest('.example');

    if (!$element.data('tagsinput'))
      return;

    var val = $element.val();
    if (val === null)
      val = "null";
    $('pre.val', $container).html( ($.isArray(val) ? JSON.stringify(val) : "\"" + val.replace('"', '\\"') + "\"") );
    $('pre.items', $container).html(JSON.stringify($element.tagsinput('items')));
  }).trigger('change');
});