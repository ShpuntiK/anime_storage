(function () {
    'use strict';

    angular
        .module('main')
        .directive('navbarActive', [
            '$location',
            navbarActive
        ]);

    function navbarActive($location) {
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                scope.$watch(function () {
                    return $location.path();
                }, function (value) {
                    var regexp = new RegExp('^' + value + '$');

                    angular.forEach(element.children(), function (li) {
                        var link = li.lastChild.hash.replace('#', ''),
                            isMatched = regexp.test(link);

                        li.className = isMatched ? 'active' : '';
                    });
                });
            }
        }
    }
})();