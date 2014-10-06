(function () {
    'use strict';

    angular
        .module('main')
        .config(['$routeProvider', router]);

    function router($routeProvider) {
        $routeProvider
            .when('/catalog', {
                templateUrl: 'static/js/app/views/catalog.html',
                controller: 'CatalogController',
                controllerAs: 'vm'
            })
            .when('/add', {
                templateUrl: 'static/js/app/views/add.html',
                controller: 'AddController',
                controllerAs: 'vm'
            })
            .when('/detail/:animeId', {
                templateUrl: 'static/js/app/views/detail.html',
                controller: 'DetailController',
                controllerAs: 'vm'
            })
            .otherwise({
                redirectTo: '/catalog'
            });
    }
})();