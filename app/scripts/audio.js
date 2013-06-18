(function (window, $) {

	'use strict';

	var AudioBar = window.AudioBar = function (options) {

		var stageSelector = '#' + options.elementId,

            controlsId = options.elementId + '_controls',

            audioId = options.elementId + '_audio',

            $stage = $(stageSelector),

            audioLength = 0,

            controlsHTML = '<div id="' + controlsId + '" class="controls">' +
                '<div class="play-pause">' +
                    '<p class="play btn-state"><i class="icon-play icon-large"></i></p>' +
                    '<p class="pause btn-state"><i class="icon-pause icon-large"></i></p>' +
                    '<p class="loading btn-state"><i class="icon-refresh icon-large"></i></p>' +
                    '<p class="error btn-state"><i class="icon-exclamation-sign icon-large"></i></p>' +
                '</div>' +
                '<div class="scrubber-container"><div class="scrubber">' +
                    '<div class="progress"></div>' +
                    '<div class="loaded"></div>' +
                '</div></div>' +
                '<div class="time">' +
                    '<em class="played">0:00</em> / <strong class="duration">3:00</strong>' +
                '</div>' +
                '<div class="error-message"></div>' +
            '</div>',

            audioContainerHTML = '<div id="' + audioId + '"></div>',

            $controls = $(controlsHTML),

            $audio = $(audioContainerHTML),

            controlsTimeout;

        var containerClass = 'explainer-container';
        var containerId = 'exp-container';

        if ($.type(options.size) === 'string') {
            if (options.size.toLowerCase() === 'narrow') {
                containerClass += ' narrow';
            }
        }

        var $container = $stage.wrap('<div class="' + containerClass + '" id="' + containerId + '"/>').parents('.' + containerClass);

        $controls.insertAfter($stage);

        $audio.insertAfter($controls);
        console.log('inserted Audio');
        var supplied = [], media = {};

        if (options.mp3) {
            supplied.push('mp3');
            media.mp3 = options.mp3;
        }

        if (options.oga) {
            supplied.push('oga');
            media.oga = options.oga;
        }

        supplied = supplied.join(',');


        // HTML and Flash players have different behaviours (and depending on if the audio is cached).
        // THerefore we need to rund this on the following events: progress, canplay, loadstart
        function setAudioDuration(evt) {
            audioLength = evt.jPlayer.status.duration;
        }

        function mouseEventToSeconds(evt) {
            return getMouseOffset(evt).x * audioLength / $scrubber.width();
        }

        function playStage(evt) {
            // console.log(evt.type, evt);
            var currentTime = evt.jPlayer.status ? evt.jPlayer.status.currentTime : 0,
                milliseconds = secondsToMilliseconds(currentTime);

            options.onPlay(milliseconds);
        }

        function stopStage() {
            options.onStop();
        }

        $audio.jPlayer({
            ready: function ready() {
                $audio.jPlayer('setMedia', media);

                // Setup a click handler on the audio scrubber bar
                // to work out where to jump the stage to. Not needed on HTML audio!
                var p = $audio.data('jPlayer');
                if (!p.flash.active) {
                    return;
                }

                $controls.find('.loaded, .progress').on('click', function (clickEvent) {
                    if (!audioLength) {
                        return;
                    }
                    var secs = mouseEventToSeconds(clickEvent);
                    if (p.status.paused) {
                        p.play(secs);
                    }
                });
            },
            swfPath: AudioBar.swf,
            solution: 'html, flash',
            supplied: supplied,
            preload: 'auto',
            wmode: 'window',
            cssSelectorAncestor: '#' + controlsId,
            cssSelector: {
                play: '.play',
                pause: '.pause',
                stop: '.stop',
                seekBar: '.loaded',
                playBar: '.progress',
                currentTime: '.played',
                duration: '.duration'
            },
            errorAlerts: false,
            warningAlerts: false,
            play: playStage,
            seeked: playStage, /* WARNING this doesn't fire when flash is used to play the audio */
            pause: stopStage,
            ended: function ended(evt) {
                console.log(evt.type, evt);
                options.onEnded();
            },
            progress: setAudioDuration,
            canplay: setAudioDuration,
            loadstart: setAudioDuration,
            timeupdate: function timeupdate(evt) {
                options.onTimeUpdate(Math.round(evt.jPlayer.status.currentTime * 1000));
            }
        });

        var $bars = $controls.find('.progress, .loaded'),
            $scrubber = $controls.find('.scrubber');

        $controls.on('mousemove', '.loaded, .progress', function (evt) {
            var time = '';
            if (audioLength) {
                time = $.jPlayer.convertTime(mouseEventToSeconds(evt)).toString().replace(/^0|/, '');
            }

            $bars.attr('title',  time);
        });



        return {
            audio: $audio,
            container: $container,
            stageReady: function () {
                $controls.css('visibility', 'visible');
                $stage.addClass('cursor-pointer');
            },
            stop: function () {
                $audio.jPlayer('stop');
            },
            play: function () {
                $audio.jPlayer('play');
            },
            pause: function () {
                $audio.jPlayer('pause');
            },
            toggle: function () {
                var p = $audio.data('jPlayer'),
                    status = p.status;

                if (status.currentTime === 0 || status.paused) {
                    $audio.jPlayer('play');
                } else if (!status.paused) {
                    $audio.jPlayer('pause');
                }
            },
            showControls: function showControls() {
                $container.removeClass('controls-off');
            },
            hideControls: function hideControls () {
                console.log($audio.data('jPlayer').status.paused);
                if (!$audio.data('jPlayer').status.paused) {
                    controlsTimeout = setTimeout(function() {
                        $container.addClass('controls-off');
                    },2000);
                } else {
                    clearTimeout(controlsTimeout);
                }
            },
            toggleControls: function toggleControls() {
                clearTimeout(controlsTimeout);
                if ($container.is('.controls-off')) {
                    this.showControls();
                } else {
                    this.hideControls();
                }
            }
        };

    };

    window.AudioBar.swf = 'components/JPlayer/jquery.jplayer/Jplayer.swf';

    // Private helper functions
    function getMouseOffset(evt) {

        var result = { x: evt.offsetX, y: evt.offsetY };

        if (!evt.offsetX) {
            // FireFox Fix
            var off = $(evt.currentTarget).offset(),
                origEvt = evt.originalEvent;

            result.x = origEvt.pageX - off.left;
            result.y = origEvt.pageY - off.top;
        }

        return result;
    }

    function secondsToMilliseconds(secs) {
        return Math.round(secs * 1000);
    }

})(this, jQuery);