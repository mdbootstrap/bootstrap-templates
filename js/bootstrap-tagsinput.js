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

	TagsInput.prototype = {
		constructor: TagsInput,

		add: function(item) {
			var $tag = $(tagTemplate);
			$(".text", $tag).text(item);
			$tag.data('item', item);

			$('input', this.$container).before($tag);
		},

		remove: function(item) {
			$('.tag', this.$container).filter(function(index) {
				return $(this).data('item') === item;
			}).remove();
		},

		build: function() {
			this.$container.on('keypress', 'input', $.proxy(function(event) {
				var $input = $(event.target);
				if(event.which == '13') {
					this.add($input.val());
					$input.val('');
				}

				$input.attr('size', $input.val().length);
			}, this));

			// Remove icon clicked
			this.$container.on('click', '[data-role=remove]', $.proxy(function(event) {
				var $tag = $(event.target).closest('.tag');
				this.remove($tag.data('item'));
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
	$.fn.tagsinput = function(option, parameter) {
		return this.each(function() {
			var data = $(this).data('tagsinput'),
				options = typeof option == 'object' && option;

			// Initialize the tagsinput.
			if (!data) {
				$(this).data('tagsinput', ( data = new TagsInput(this, options)));
			}

			// Call tagsinput method.
			if ( typeof option == 'string') {
				data[option](parameter);
			}
		});
	};

	$.fn.tagsinput.Constructor = TagsInput;

	$(function() {
		$("input[data-role=tagsinput]").tagsinput();
	});
})(window.jQuery);