(function ($) {
	"use strict";

	var tagTemplate = '<span class="tag label"><span class="text"></span><i class="icon-white icon-remove" data-role="remove"></i></span>';

	function TagsInput(element, options) {

		this.options = {};

		this.$element = $(element);

		this.$container = $('<div class="bootstrap-tagsinput"><input type="text" /></div>');
		this.$element.hide();
		this.$element.after(this.$container);

		this.build();
	}

	var htmlEncodeContainer = $('<div />');
	function htmlEncode (value) {
		if (value) {
			return htmlEncodeContainer.text(value).html();
		} else {
			return '';
		}
	}

	// Source: http://flightschool.acylt.com/devnotes/caret-position-woes/
	function doGetCaretPosition (oField) {
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

	TagsInput.prototype = {
		constructor: TagsInput,

		addItem: function(item) {
			var $tag = $(tagTemplate);
			$(".text", $tag).text(item);
			$tag.data('item', item);

			$('input', this.$container).before($tag);

			if (this.$element[0].tagName === 'SELECT') {
				this.$element.append($('<option value="' + htmlEncode(item) + '" selected>' + htmlEncode(item) + '</option>'));
			}

			this.$element.val(this.getValueFromTags());
		},

		removeItem: function(item) {
			$('.tag', this.$container).filter(function(index) {
				return $(this).data('item') === item;
			}).remove();

			this.$element.val(this.getValueFromTags());
		},

		// Returns the value's from the items
		getValueFromTags: function() {
			return $.map($('.tag', this.$container), function(tag) { return $(tag).data('item'); });
		},

		// Returns the original elements's val()
		getValueFromElement: function() {
			return this.$element.val();
		},

		// Returns the items added as tags
		getItems: function() {
			return $.map($('.tag', this.$container), function(tag) { return $(tag).data('item'); });
		},

		setValue: function(value) {
			var tagsinput = this;
			$.each(value.split(','), function(index, item) {
				tagsinput.addItem(item);
			});
		},

		build: function() {
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
			// Bnbind events
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
				$(this).data('tagsinput', ( tagsinput = new TagsInput(this, arg1)));
				results.push(tagsinput);
				return;
			}

			// Invoke function on existing tags input
			var retVal;
			switch (arg1) {
				case 'add'    : retVal = tagsinput.addItem(arg2); break;
				case 'remove' : retVal = tagsinput.removeItem(arg2); break;
				case 'destroy': retVal = tagsinput.destroy(); break;
				case 'value'  : retVal = (arg2 ? tagsinput.setValue(arg2) : tagsinput.getValueFromElement()); break;
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

	$(function() {
		$("input[data-role=tagsinput]").tagsinput();
	});
})(window.jQuery);