(function () {
    'use strict';

    angular
        .module('main', [
            'ngRoute',
            'ngResource',
            'ngAnimate',
            'validation',
            'validation.rule',
            'ui.bootstrap',
            'angular-loading-bar'
        ])
        .config(['$httpProvider', function ($httpProvider) {
            $httpProvider.defaults.xsrfCookieName = 'csrftoken';
            $httpProvider.defaults.xsrfHeaderName = 'X-CSRFToken';

            $httpProvider.interceptors.push('httpInterceptor');
        }]);
})();
