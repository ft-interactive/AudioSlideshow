(function (window, $) {

	'use strict';

	var Utils = IG.Utils;

	var errorMessages = [];

	var isAbsoluteUrl = /^http(s?)\:\/\//;

	
	var NoHands = window.IG.NoHands = {


		init: function init(options) {

			$.holdReady(true);
			
				// Pull the query window's query string from `window.location.search`.
			var params = Utils.parseURLtoObj(window.location.search.substr(1)),

				// set bertha request options
				dataOpts = {
					sheets: ['slides', 'options', 'credits'],
					processOptionsSheet: true
				};

			// overlay query params onto the request options object
			dataOpts = $.extend(true, dataOpts, options.bertha || {}, params);

			try {
				// Request the data from Bertha
				Bertha.getSpreadsheet(dataOpts)
						.done(options.onData)
						.done(function () {
							$.holdReady(false);
						})
						.done(IG.Furniture.render)
						.fail(function () {
							NoHands.addError('Error getting data from Server');
						})
						.fail(options.onFail);
			} catch (err) {
				NoHands.addError(err.message);
				NoHands.renderErrors();
			}

			$(function () {
				//NoHands.renderErrors();
			});

			if (options.ready) {
				$(options.ready);
			}

		},

		addError: function addError(message) {
			errorMessages.push(message);
		},

		renderErrors: function renderErrors() {
			if (errorMessages.length) {
				$('#error-msg').removeClass('hidden').html('<ul><li>' + errorMessages.join('</li><li>') + '</li></ul>');
			}
		},

		getImageUrl: function getImageUrl(url, model, optionsSheetName) {
			optionsSheetName = optionsSheetName || 'options';
			return isAbsoluteUrl.test(url) ? url : (model[optionsSheetName]['media.baseURL'] || model[optionsSheetName]['image.baseURL']) + (url || '');
		},

		getAudioUrl: function getAudioUrl(audioType, model, optionsSheetName) {
			optionsSheetName = optionsSheetName || 'options';
			var val = model[optionsSheetName]['audio.' + audioType];
			return isAbsoluteUrl.test(val) ? val : (model[optionsSheetName]['media.baseURL'] || model[optionsSheetName]['audio.baseURL']) + (val || '');
		}


	};

})(this, jQuery);