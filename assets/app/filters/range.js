(function () {
    'use strict';

    angular
        .module('main')
        .filter('range', range);

    function range() {
        return function (arr, from, to) {
            // if provide 1 parameter, like range:10, then from = 0, to = 9
            if (to === undefined) {
                to = from;
                from = 0;
            }

            for (var i = from; i < to; i++) {
                arr.push(i);
            }

            return arr;
        }
    }
})();