(function () {
    'use strict';

    angular
        .module('main', [
            'ngRoute',
            'ngResource',
            'ngAnimate',
            'ngMessages',
            'ui.bootstrap',
            'angular-loading-bar',
            'ngTagsInput'
        ])
        .config(config);

    function config($httpProvider, tagsInputConfigProvider) {
        $httpProvider.defaults.xsrfCookieName = 'csrftoken';
        $httpProvider.defaults.xsrfHeaderName = 'X-CSRFToken';

        $httpProvider.interceptors.push('httpInterceptor');

        tagsInputConfigProvider.setDefaults('tagsInput', {
            placeholder: '',
            replaceSpacesWithDashes: false
        });
    }
})();
