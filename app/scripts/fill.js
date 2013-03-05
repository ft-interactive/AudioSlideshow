(function () {

    'use strict';

    var applyFill = function (obj, property, methods) {
        var method;
        var noop = function () {
            return function () {};
        };
        var length = methods.length;
        var prop = (obj[property] = obj[property] || {});
        while (length--) {
            method = methods[length];

            if (method instanceof Array) {
                method = method[0];
                noop = method[1];
            }

            // Only stub undefined methods.
            if (!prop[method]) {
                prop[method] = noop;
            }
        }
    };

    applyFill(window, 'console', [
        'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
        'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
        'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
        'timeStamp', 'trace', 'warn'
    ]);

    applyFill(window, 'Raven', [
        'captureException',
        'setUser',
        'captureMessage',
        ['context', function (fn) { fn(); return fn; }],
        ['wrap', function (fn) { return fn;  }]
    ]);

    applyFill(window, 'analytics', [
        'timing'
    ]);
    
}());