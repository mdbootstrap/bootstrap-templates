(function ($) {
	"use strict";

	var defaultOptions = {
		tagClass: 'badge badge-info',
		itemId: function(item) {
			return item ? item.toString() : item;
		},
		itemLabel: function(item) {
			return this.itemId(item);
		}
	};

	function TagsInput(element, options) {
		this.$element = $(element);
		this.multiple = (element.tagName === 'SELECT' && element.getAttribute('multiple'));

		this.$container = $('<div class="bootstrap-tagsinput"><input size="1" type="text" /></div>');
		this.$element.hide();
		this.$element.after(this.$container);

		this.build(options);
	}

	TagsInput.prototype = {
		constructor: TagsInput,

		addItem: function(item) {
			// Ignore falsey values, except false
			if (item !== false && !item)
				return;

			// Throw an error when trying to add an object while the itemId option was not set
			if (typeof item === "object" && this.options.itemId === defaultOptions.itemId)
				throw("Can't add objects when itemId option is not set");

			// Ignore strings only containg whitespace
			if (item.toString().match(/^\s*$/))
				return;

			// Ignore items allready added
			if ($.inArray(item, this.getItems()) !== -1)
				return;

			var $tag = $('<span class="tag ' + htmlEncode(this.options.tagClass) + '"><span class="text"></span><i class="icon-white icon-remove" data-role="remove"></i></span>');
			$(".text", $tag).text(this.options.itemLabel(item));
			$tag.data('item', item);

			$('input', this.$container).before($tag);

			if (this.$element[0].tagName === 'SELECT') {
				this.$element.append($('<option value="' + htmlEncode(this.options.itemId(item)) + '" selected>' + htmlEncode(item) + '</option>'));
			}

			this.$element.val(this.getValueFromTags(), true);
		},

		removeItem: function(item) {
			$('.tag', this.$container).filter(function(index) {
				return $(this).data('item') === item;
			}).remove();

			this.$element.val(this.getValueFromTags(), true);
		},

		// Returns the values from the items
		getValueFromTags: function() {
			var options = this.options;
			return $.map(this.getItems(), function(item) { return options.itemId(item); });
		},

		// Returns the items added as tags
		getItems: function() {
			return $.map($('.tag', this.$container), function(tag) { return $(tag).data('item'); });
		},

		build: function(options) {
			this.options = $.extend({}, defaultOptions, options);

			makeFunctionOption(this.options, 'itemId');
			makeFunctionOption(this.options, 'itemLabel');

			this.$container.on('click', $.proxy(function(event) {
				$('input', this.$container).focus();
			}, this));

			this.$container.on('keydown', 'input', $.proxy(function(event) {
				var $input = $(event.target);
				switch (event.which) {
					// BACKSPACE
					case 8:
						if (doGetCaretPosition($input[0]) === 0) {
							var items = this.getItems();
							if (items[0])
								this.removeItem(items[items.length-1]);
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
						this.addItem($input.val());
						$input.val('');
						break;

				}

				$input.attr('size', Math.max(1, $input.val().length));
			}, this));

			// Remove icon clicked
			this.$container.on('click', '[data-role=remove]', $.proxy(function(event) {
				var $tag = $(event.target).closest('.tag');
				this.removeItem($tag.data('item'));
			}, this));
		},

		destroy: function() {
			// Unbind events
			this.$container.off('keypress', 'input');
			this.$container.off('click', '[data-role=remove]');

			this.$container.remove();
			this.$element.show();
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
				// Init tags from $(this).val()
				$(this).val($(this).val());
				return;
			}

			// Invoke function on existing tags input
			var retVal;
			switch (arg1) {
				case 'add'    : retVal = tagsinput.addItem(arg2); break;
				case 'remove' : retVal = tagsinput.removeItem(arg2); break;
				case 'destroy': retVal = tagsinput.destroy(); break;
				case 'items'  : retVal = tagsinput.getItems(); break;
				default: break;
			}

			if (retVal !== undefined)
				results.push(retVal);
		});

		if ( typeof arg1 == 'string') {
			// Return the results from the invoked function calls
			return results.length > 1 ? results : results[0];
		} else {
			return results;
		}
	};

	$.fn.tagsinput.Constructor = TagsInput;

	// HACK: Intercept global JQuery's val(): when a <select multiple /> is
	// used as tags input element, we need to add an <option /> element to
	// it when setting value's not present yet.
	var $val = $.fn.val;
	$.fn.val = function(value, dontUpdateTagsInput) {
		if (!arguments.length)
			return $val.call(this);

		if (!dontUpdateTagsInput) {
			this.each(function() {
				var tagsinput = $(this).data('tagsinput'),
					val = value;
				if (tagsinput) {
					if (typeof val === "string" && !this.multiple)
						val = val.split(',');
					$.each($.makeArray(val), function(index, item) {
						tagsinput.addItem(item);
					});
				}
			});
		}

		return $val.call(this, value);
	};

	// Most options support both a string or number as well as a function as 
	// option value. This function makes sure that the option with the given
	// key in the given options is wrapped in a function
	function makeFunctionOption(options, key) {
		if (typeof options[key] !== 'function') {
			var propertyName = options[key];
			options[key] = function(item) { return item[propertyName]; };
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
		$("input[data-role=tagsinput], select[data-role=tagsinput]").tagsinput();
	});
})(window.jQuery);