(function (window, $) {

	'use strict';

	window.IG = window.IG || {};

	var mapCredits = function mapCredits(source) {
		return source && source.name ? '<span class="credit">' + (source.link ? '<a href="' + source.link + '">' + source.name + '</a>' : source.name) + '</span>' : '';
	};

	var printList = function printList(prefix, list, suffix, separator) {
		return (prefix ? '<span class="prefix">' + prefix + '</span>' : '') + $.map(list, mapCredits).join(separator || ', ') + (suffix ?  '<span class="suffix">' + suffix + '</span>' : '');
	};

	window.IG.Furniture = {

		render: function render(data) {
			var dom = [],
				lists = {
					source: [],
					credit: []
				};

			if (data && data.credits && data.credits) {
				$.each(data.credits, function (i, n) {
					if (n && n.type && lists.hasOwnProperty(n.type)) {
						lists[n.type].push(n);
					}
				});
			}

			if (lists.source.length) {
				dom.push('<span class="furniture-sources">' + printList('Source' + (lists.source.length > 1 ? 's' : '') + ': ', lists.source) + '.</span>');
			}


			if (lists.credit.length) {
				dom.push('<span class="furniture-credits">' + printList('Interactive graphic by ', lists.credit) + '.</span>');
			}

			if (dom.length) {
				$('footer.furniture').removeClass('hidden').html('<div>' + dom.join(' ') + '</div>');
			}
		},

	};

})(this, jQuery);