(function () {
    'use strict';

    angular
        .module('main')
        .config(router);

    function router($routeProvider) {
        $routeProvider
            .when('/catalog', {
                templateUrl: '/static/scripts/views/catalog.html',
                controller: 'CatalogController',
                controllerAs: 'vm'
            })
            .when('/add', {
                templateUrl: '/static/scripts/views/add.html',
                controller: 'AddController',
                controllerAs: 'vm'
            })
            .when('/detail/:animeId', {
                templateUrl: '/static/scripts/views/detail.html',
                controller: 'DetailController',
                controllerAs: 'vm'
            })
            .otherwise({
                redirectTo: '/catalog'
            });
    }
})();