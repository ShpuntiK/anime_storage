(function () {
    'use strict';

    angular
        .module('main')
        .directive('navbarActive', navbarActive);

    function navbarActive($location) {
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                scope.$watch(function () {
                    return $location.path();
                }, function (value) {
                    var regexp = new RegExp('^' + value + '$');

                    [].forEach.call(element.children(), function (li) {
                        var link = li.lastChild.hash.replace('#', ''),
                            isMatched = regexp.test(link);

                        li.className = isMatched ? 'active' : '';
                    });
                });
            }
        };
    }
})();