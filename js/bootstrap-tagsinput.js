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
			this.$container.on('keypress', 'input', $.proxy(function(event) {
				var $input = $(event.target);
				if(event.which == '13') {
					this.addItem($input.val());
					$input.val('');
				}

				$input.attr('size', $input.val().length);
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

	// Register as a JQuery plugin
	$.fn.tagsinput = function(option, arg) {
		var results = [];

		this.each(function() {
			var tagsinput = $(this).data('tagsinput'),
				options = typeof option == 'object' && option;

			// Initialize a new tags input
			if (!tagsinput) {
				$(this).data('tagsinput', ( tagsinput = new TagsInput(this, options)));
				results.push(tagsinput);
				return;
			}

			// Invoke function on existing tags input
			var retVal;
			switch (option) {
				case 'add':
					retVal = tagsinput.addItem(arg);
					break;
				case 'remove':
					retVal = tagsinput.removeItem(arg);
					break;
				case 'destroy':
					retVal = tagsinput.destroy();
					break;
				case 'value':
					if (arg)
						retVal = tagsinput.setValue(arg);
					else
						retVal = tagsinput.getValueFromElement();
					break;
				case 'items':
					retVal = tagsinput.getItems();
					break;
				default:
					break;
			}

			if (retVal !== undefined)
				results.push(retVal);
		});

		if ( typeof option == 'string') {
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