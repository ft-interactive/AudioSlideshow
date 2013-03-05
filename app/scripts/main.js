/*global AudioBar */

(function (window, $) {

	'use strict';

	var Utils = IG.Utils;
	var NoHands = IG.NoHands;

	var Slideshow,
		halfLength,
		length,
		second = 1000,
		minute = second * 60,
		cachedIndex = 0,
		//aspectRatio = 1.5,
		currentAudioTime = 0,
		currentSlide;


	var onData = function onData(data) {
		
		Slideshow = data;
		
		var missingImageURLs = 0, missingStartTimes = 0;
		
		$.each(Slideshow.slides, function (i, n) {
			n.caption.text = (n.caption.text || '').replace(/\ +/g, ' ').replace(/^\ /, '').replace(/\ $/, '');

			if (n.start === undefined || n.start === null) {
				missingStartTimes += 1;
				console.error('Missing start time at row ' + (i + 2));
				n.ms = Infinity;
				return;
			}

			if (!n.image.filename) {
				missingImageURLs += 1;
				console.error('Missing image at row ' + (i + 2));
			} else {
				// preload images and check they are ok
				setTimeout(function () {
					var src = NoHands.getImageUrl(n.image.filename, Slideshow),
						img = new Image(1, 1);
					img.onerror = function () {
						console.error('Error loading image at ' + src);
					};
					img.src = src;
				}, 400 * (i + 1));
			}

			var t = n.start.toString().split(':');

			if (t.length === 0) {
				t = ['0', '0', '0'];
			} else if (t.length === 1) {
				t = ['0', t[0] || '0', '0'];
			} else if (t.length === 2) {
				t.push('0');
			}

			n.ms = (Number(t[0]) * minute) + (Number(t[1]) * second) + (Number(t[2]) * 101);
		});
		
		Slideshow.slides.sort(function (a, b) {
			return a.ms > b.ms ? 1 : -1;
		});

		length = Slideshow.slides.length;
		halfLength = Math.floor(length / 2);

		if (missingStartTimes) {
			NoHands.addError('Missing Start Times: ' + missingStartTimes);
		}

		if (missingImageURLs) {
			NoHands.addError('Missing Images: ' + missingImageURLs);
		}

	};

	var onDataError = function onDataError(err) {
		console.error(err);
	};

	var pixelGif = '../images/pixel.gif';

	var displaySlide = function displaySlide(index) {

		if (!Slideshow || !Slideshow.slides) {
			return;
		}

		if (index >= Slideshow.slides.length) {
			return;
		}

		var slide = Slideshow.slides[index];

		if (currentSlide && (currentSlide === slide || currentSlide.image.filename === slide.image.filename)) {
			return;
		}

		currentSlide = slide;

		var	holder = $('#image-holder'),
			image = $('<img/>'),
			currentlyShowingImages = holder.find('img'),
			to;

		var show = function () {
			clearTimeout(to);
			image.css('opacity', 1);

			$('#credit').html(Utils.getImageCreditHTML(slide.image.credit));

			if (slide.caption.text) {
				$('#caption').css('opacity', 1).html(slide.caption.text);
			} else {
				$('#caption').css('opacity', 0).html('');
			}
			currentlyShowingImages.css('opacity', 0);
			setTimeout(function () {
				currentlyShowingImages.remove();
			}, 1000);
		};

		var setBroken = function () {
			image.addClass('broken').attr('src', pixelGif);
		};

		to = setTimeout(show, 0);

		if (slide.image.filename) {
			image.on('load', function () {
				currentlyShowingImages.css({'opacity': 0});
			});
			image.on('error', setBroken);
			image.attr('src', NoHands.getImageUrl(slide.image.filename, Slideshow));
		} else {
			setBroken();
		}

		image.css({'opacity': 1});
		holder.prepend(image);
	};


	var playAtCurrentTime = function playAtCurrentTime() {
		
		if (!length || !currentSlide) {
			return;
		}

		if (currentSlide.ms === currentAudioTime) {
			return;
		}

		var indx = cachedIndex,
			i = cachedIndex,
			x = 0,
			slides = Slideshow.slides,
			bestAvailable = Infinity;

		// TODO: change this to a binary/ternary search tree
		// this loop assume that the slides array is sorted with
		// earliest first (and no time specified [Infinity]) at the end
		while (i < length && slides[i].ms <= currentAudioTime) {
			x = currentAudioTime - slides[i].ms;
			if (x > 0 && Math.min(bestAvailable, x) === x) {
				bestAvailable = x;
				indx = i;
			}
			i++;
		}

		displaySlide(indx);
		cachedIndex = indx;
		return indx;
	};

	var onReady = function onReady() {
		var interval;

		var slideshowId = 'slideshow',
			audioFilename,
			mp3,
			ogg;

		if (Slideshow.options['audio.filename']) {
			audioFilename = NoHands.getAudioUrl('filename', Slideshow);
			mp3 = audioFilename + '.mp3';
			ogg = audioFilename + '.oga';
		} else {
			mp3 = NoHands.getAudioUrl('mp3', Slideshow);
			ogg = NoHands.getAudioUrl('oga', Slideshow);
		}

		var audioBar = new AudioBar({
			elementId: slideshowId,
			mp3: mp3,
			ogg: ogg,
			onPlay: function (time) {
				cachedIndex = 0;
				currentAudioTime = time;
				playAtCurrentTime();
				if (!interval) {
					interval = setInterval(playAtCurrentTime, 300);
				}
			},
			onStop: function () {
				clearInterval(interval);
				interval = null;
			},
			onTimeUpdate: function (currentTime) {
				currentAudioTime = currentTime;
			},
			onEnded: function() {

			}
		});

		displaySlide(0);
		audioBar.stageReady();
	};


	NoHands.init({
		onData: onData,
		onFail: onDataError,
		ready: onReady
	});

})(this, jQuery);