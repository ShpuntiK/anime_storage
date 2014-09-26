'use strict';

angular.module('main').controller('CatalogController', ['$scope', function ($scope) {
    $scope.animes = [
        {
            name: 'test1',
            rating: 5
        },
        {
            name: 'test2',
            rating: 4
        },
        {
            name: 'test3',
            rating: 3
        },
        {
            name: 'test4',
            rating: 5
        },
        {
            name: 'test5',
            rating: 3
        },
    ];
}]);