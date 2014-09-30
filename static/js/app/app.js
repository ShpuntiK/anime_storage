'use strict';

angular.module('main', [
    'ngRoute',
    'ngResource',
    'validation',
    'validation.rule'
])
.config(['$httpProvider', function($httpProvider) {
    $httpProvider.defaults.xsrfCookieName = 'csrftoken';
    $httpProvider.defaults.xsrfHeaderName = 'X-CSRFToken';
}]);