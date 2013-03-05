(function (window, $) {

	'use strict';

	window.IG = window.IG || {};

	window.IG.Utils = {

		parseURLtoObj: function parseURLtoObj(url) {
			var p = {};

			url = url.replace(/^\?/, '').split(/&/);
	        
	        $.each(url, function (i, e) {
				var r = e.split('=');
	            p[window.decodeURIComponent(r[0])] = window.decodeURIComponent(r[1]);
	        });

	        return p;
		},

		getImageCreditHTML: function getImageCreditHTML(credit) {
			return credit ? '&copy;' + credit : '';
		}

	};

})(this, jQuery);