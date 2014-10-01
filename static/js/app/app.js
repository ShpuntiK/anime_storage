'use strict';

angular.module('main', [
    'ngRoute',
    'ngResource',
    'validation',
    'validation.rule',
    'ui.bootstrap'
])
.config(['$httpProvider', function($httpProvider) {
    $httpProvider.defaults.xsrfCookieName = 'csrftoken';
    $httpProvider.defaults.xsrfHeaderName = 'X-CSRFToken';

    $httpProvider.interceptors.push('httpInterceptor');
}]);