(function ($) {
  "use strict";

  var defaultOptions = {
    tagClass: function(item) {
      return 'label label-info';
    },
    itemValue: function(item) {
      return item ? item.toString() : item;
    },
    itemText: function(item) {
      return this.itemValue(item);
    },
    typeahead: {
      source: null,
      matcher: function(item) {
        return true;
      }
    }
  };

  function TagsInput(element, options) {
    this.itemsArray = [];
    this.itemsMap = {};

    this.$element = $(element);
    this.$element.hide();

    this.multiple = (element.tagName === 'SELECT' && element.getAttribute('multiple'));

    this.$container = $('<div class="bootstrap-tagsinput"></div>');
    this.$input = $('<input size="1" type="text" />').appendTo(this.$container);

    this.$element.after(this.$container);

    this.build(options);
  }

  TagsInput.prototype = {
    constructor: TagsInput,

    add: function(item, dontPushVal) {
      var self = this;

      // Ignore falsey values, except false
      if (item !== false && !item)
        return;

      // Throw an error when trying to add an object while the itemValue option was not set
      if (typeof item === "object" && self.options.itemValue === defaultOptions.itemValue)
        throw("Can't add objects when itemValue option is not set");

      // Ignore strings only containg whitespace
      if (item.toString().match(/^\s*$/))
        return;

      if (typeof item === "string" && this.$element[0].tagName === 'INPUT') {
        var items = item.split(',');
        if (items.length > 1) {
          for (var i = 0; i < items.length; i++) {
            this.add(items[i], true);
          }

          if (!dontPushVal)
            self.pushVal();
          return;
        }
      }

      // Ignore items allready added
      var itemValue = self.options.itemValue(item),
          itemText = self.options.itemText(item),
          tagClass = self.options.tagClass(item);

      if (self.itemsMap[itemValue.toString()] !== undefined)
        return;

      // register item in internal array and map
      self.itemsArray.push(item);
      self.itemsMap[itemValue] = item;

      // add a tag element
      var $tag = $('<span class="tag ' + htmlEncode(tagClass) + '">' + htmlEncode(itemText) + '<span data-role="remove"></span></span>');
      $tag.attr('data-value', itemValue);
      self.$input.before($tag);

      // add <option /> if item represents a value not present in one of the <select />'s options
      if (self.$element[0].tagName === 'SELECT' && !$('option[value="' + escape(itemValue) + '"]')[0]) {
        var $option = $('<option selected>' + htmlEncode(itemText) + '</option>');
        $option.attr('value', itemValue);
        self.$element.append($option);
      }

     if (!dontPushVal)
        self.pushVal();
    },

    remove: function(item, dontPushVal) {
      var self = this,
          itemValue = self.options.itemValue(item);

      $('.tag', self.$container).filter(function() { return $(this).data('value') === itemValue; }).remove();
      $('option', self.$element).filter(function() { return $(this).attr('value') === itemValue; }).remove();

       // unregister item in internal array and map
      self.itemsArray.splice(self.itemsArray.indexOf(item), 1);
      delete self.itemsMap[itemValue];

      if (!dontPushVal)
        self.pushVal();
    },

    removeAll: function() {
      var self = this;

      $('.tag', self.$container).remove();
      $('option', self.$element).remove();

      while(self.itemsArray.length > 0)
        self.itemsArray.pop();
      for (var prop in self.itemsMap)
        delete self.itemsMap[prop];

      self.pushVal();
    },

    refresh: function() {
      //    $tag = $('.tag', self.$container),
    },

    // Returns the items added as tags
    items: function() {
      return this.itemsArray;
    },

    // Assembly value by retrieving the value of each item, and set it on the element. 
    pushVal: function() {
      var self = this,
          val = $.map(self.items(), function(item) { return self.options.itemValue(item).toString(); });

      self.$element.val(val, true).trigger('change');
    },

    build: function(options) {
      var self = this;

      self.options = $.extend({}, defaultOptions, options);

      makeOptionItemFunction(self.options, 'itemValue');
      makeOptionItemFunction(self.options, 'itemText');
      makeOptionItemFunction(self.options, 'tagClass');

      if (self.options.source && $.fn.typeahead) {
        makeOptionFunction(self.options, 'source');

        self.$input.typeahead({
          source: function (query, process) {
            function processItems(items) {
              var texts = [];

              for (var i = 0; i < items.length; i++) {
                var text = self.options.itemText(items[i]);
                map[text] = items[i];
                texts.push(text);
              }
              process(texts);
            }

            this.map = {};
            var map = this.map,
                data = self.options.source(query);

            if ($.isFunction(data.success)) {
              // support for Angular promises
              data.success(processItems);
            } else {
              // support for functions and jquery promises
              $.when(data)
               .then(processItems);
            }
          },
          updater: function (text) {
            self.add(this.map[text]);
          },
          matcher: function (text) {
            return (text.toLowerCase().indexOf(this.query.trim().toLowerCase()) !== -1);
          },
          sorter: function (texts) {
            return texts.sort();
          },
          highlighter: function (text) {
            var regex = new RegExp( '(' + this.query + ')', 'gi' );
            return text.replace( regex, "<strong>$1</strong>" );
          }
        });
      }

      self.$container.on('click', $.proxy(function(event) {
        self.$input.focus();
      }, self));

      self.$container.on('keydown', 'input', $.proxy(function(event) {
        var $input = $(event.target);
        switch (event.which) {
          // BACKSPACE
          case 8:
            if (doGetCaretPosition($input[0]) === 0) {
              var prev = $input.prev();
              if (prev) {
                self.remove(self.itemsMap[prev.data('value')]);
              }
            }
            break;

          // DELETE
          case 46:
            if (doGetCaretPosition($input[0]) === 0) {
              var next = $input.next();
              if (next) {
                self.remove(self.itemsMap[next.data('value')]);
              }
            }
            break;

          // LEFT ARROW
          case 37:
            // Try to move the input before the previous tag
            var $prevTag = $input.prev();
            if ($input.val().length === 0 && $prevTag[0]) {
              $prevTag.before($input);
              $input.focus();
            }
            break;
          // LEFT ARROW
          case 39:
            // Try to move the input before the previous tag
            var $nextTag = $input.next();
            if ($input.val().length === 0 && $nextTag[0]) {
              $nextTag.after($input);
              $input.focus();
            }
            break;
          // ENTER
          case 13:
            if (!self.options.source) {
              self.add($input.val());
              $input.val('');
            }
            break;

        }

        $input.attr('size', Math.max(1, $input.val().length));
      }, self));

      // Remove icon clicked
      self.$container.on('click', '[data-role=remove]', $.proxy(function(event) {
        var value = $(event.target).closest('.tag').attr('data-value');
        self.remove(self.itemsMap[value]);
      }, self));

      if (self.$element[0].tagName === 'INPUT') {
        self.add(self.$element.val());
      } else {
        $('option', self.$element).each(function() {
          self.add($(this).attr('value'), true);
        });
      }
    },

    destroy: function() {
      var self = this;

      // Unbind events
      self.$container.off('keypress', 'input');
      self.$container.off('click', '[data-role=remove]');

      self.$container.remove();
      self.$element.removeData('tagsinput');
      self.$element.show();
    }
  };

  // Register JQuery plugin
  $.fn.tagsinput = function(arg1, arg2) {
    var results = [];

    this.each(function() {
      var tagsinput = $(this).data('tagsinput');

      // Initialize a new tags input
      if (!tagsinput) {
        tagsinput = new TagsInput(this, arg1);
        $(this).data('tagsinput', tagsinput);
        results.push(tagsinput);

        if (this.tagName === 'SELECT') {
          $('option', $(this)).attr('selected', 'selected');
        }

        // Init tags from $(this).val()
        $(this).val($(this).val());
      } else {
        // Invoke function on existing tags input
        var retVal = tagsinput[arg1](arg2);
        if (retVal !== undefined)
          results.push(retVal);
      }
    });

    if ( typeof arg1 == 'string') {
      // Return the results from the invoked function calls
      return results.length > 1 ? results : results[0];
    } else {
      return results;
    }
  };

  $.fn.tagsinput.Constructor = TagsInput;

  // Most options support both a string or number as well as a function as 
  // option value. This function makes sure that the option with the given
  // key in the given options is wrapped in a function
  function makeOptionItemFunction(options, key) {
    if (typeof options[key] !== 'function') {
      var value = options[key];
      options[key] = function(item) { return item[value]; };
    }
  }
  function makeOptionFunction(options, key) {
    if (typeof options[key] !== 'function') {
      var value = options[key];
      options[key] = function() { return value; };
    }
  }
  // HtmlEncodes the given value
  var htmlEncodeContainer = $('<div />');
  function htmlEncode(value) {
    if (value) {
      return htmlEncodeContainer.text(value).html();
    } else {
      return '';
    }
  }

  // Returns the position of the caret in the given input field
  // http://flightschool.acylt.com/devnotes/caret-position-woes/
  function doGetCaretPosition(oField) {
    var iCaretPos = 0;
    if (document.selection) {
      oField.focus ();
      var oSel = document.selection.createRange();
      oSel.moveStart ('character', -oField.value.length);
      iCaretPos = oSel.text.length;
    } else if (oField.selectionStart || oField.selectionStart == '0') {
      iCaretPos = oField.selectionStart;
    }
    return (iCaretPos);
  }

  $(function() {
    $("input[data-role=tagsinput], select[multiple][data-role=tagsinput]").tagsinput();
  });
})(window.jQuery);