'use strict';

angular.module('main').directive('rating', function () {
    return {
        restrict: 'E',
        scope: {
            rating: '@value',
            maxRating: '@maxValue'
        },
        templateUrl: 'static/js/app/views/rating.html'
    }
});