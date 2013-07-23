(function ($) {
	"use strict";

	var defaultOptions = {
		tagClass: 'badge badge-info',
		itemValue: function(item) {
			return item ? item.toString() : item;
		},
		itemText: function(item) {
			return this.itemValue(item);
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

			// Ignore items allready added
			if ($.inArray(item, self.getItems()) !== -1)
				return;

			var $tag = $('<span class="tag ' + htmlEncode(self.options.tagClass) + '"><span class="text"></span><i class="icon-white icon-remove" data-role="remove"></i></span>');
			$(".text", $tag).text(self.options.itemText(item));
			$tag.data('item', item);

			$('input', self.$container).before($tag);

			if (self.$element[0].tagName === 'SELECT') {
				self.$element.append($('<option value="' + htmlEncode(self.options.itemValue(item)) + '" selected>' + htmlEncode(item) + '</option>'));
			}

			self.$element.val(self.getValueFromTags(), true);
		},

		removeItem: function(item) {
			var self = this;

			$('.tag', self.$container).filter(function(index) {
				return $(this).data('item') === item;
			}).remove();

			self.$element.val(self.getValueFromTags(), true);
		},

		// Returns the values from the items
		getValueFromTags: function() {
			var self = this;
			return $.map(self.getItems(), function(item) { return self.options.itemValue(item); });
		},

		// Returns the items added as tags
		getItems: function() {
			var self = this;
			return $.map($('.tag', self.$container), function(tag) { return $(tag).data('item'); });
		},

		build: function(options) {
			var self = this;

			self.options = $.extend({}, defaultOptions, options);

			makeOptionItemFunction(self.options, 'itemValue');
			makeOptionItemFunction(self.options, 'itemText');
			makeOptionFunction(self.options, 'source');
			if (self.options.source) {
				$('input', self.$container).typeahead({
					source: function (query, process) {
						this.map = {};

						var data = self.options.source(),
							texts = [],
							map = this.map;

						$.each(data, function (i, item) {
							var text = self.options.itemText(item);
							map[text] = item;
							texts.push(text);
						});

						process(texts);
					},
					updater: function (item) {
						self.addItem(this.map[item]);
					},
					matcher: function (item) {
						return (item.toLowerCase().indexOf(this.query.trim().toLowerCase()) !== -1);
					},
					sorter: function (items) {
						return items.sort();
					},
					highlighter: function (item) {
						var regex = new RegExp( '(' + this.query + ')', 'gi' );
						return item.replace( regex, "<strong>$1</strong>" );
					}
				});
			}

			self.$container.on('click', $.proxy(function(event) {
				$('input', self.$container).focus();
			}, self));

			self.$container.on('keydown', 'input', $.proxy(function(event) {
				var $input = $(event.target);
				switch (event.which) {
					// BACKSPACE
					case 8:
						if (doGetCaretPosition($input[0]) === 0) {
							var items = self.getItems();
							if (items[0])
								self.removeItem(items[items.length-1]);
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
						self.addItem($input.val());
						$input.val('');
						break;

				}

				$input.attr('size', Math.max(1, $input.val().length));
			}, self));

			// Remove icon clicked
			self.$container.on('click', '[data-role=remove]', $.proxy(function(event) {
				var $tag = $(event.target).closest('.tag');
				self.removeItem($tag.data('item'));
			}, self));
		},

		destroy: function() {
			var self = this;

			// Unbind events
			self.$container.off('keypress', 'input');
			self.$container.off('click', '[data-role=remove]');

			self.$container.remove();
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
	function makeOptionItemFunction(options, key, fn) {
		if (typeof options[key] !== 'function') {
			var value = options[key];
			options[key] = function(item) { return item[value]; };
		}
	}
	function makeOptionFunction(options, key, fn) {
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
		$("input[data-role=tagsinput], select[data-role=tagsinput]").tagsinput();
	});
})(window.jQuery);