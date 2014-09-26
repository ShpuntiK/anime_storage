'use strict';

angular.module('main').config(['$routeProvider', function ($routeProvider) {
    $routeProvider
    .when('/catalog', {
        templateUrl: 'static/js/app/views/catalog.html',
        controller: 'CatalogController'
    })
    .when('/add', {
        templateUrl: 'static/js/app/views/add.html',
          controller: 'AddController'
    })
    .otherwise({
        redirectTo: '/catalog'
    });
}]);