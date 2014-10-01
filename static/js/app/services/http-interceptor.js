'use strict';

angular.module('main').factory('httpInterceptor', ['$q', function($q){
    return {
        responseError: function (rejection) {
            var errFields = Object.keys(rejection);

            if (!rejection.data.detail) {
                if (errFields.length > 0) {
                    rejection.data.detail = 'Form not valid!';
                }
                else {
                    rejection.data.detail = 'Something went wrong...';
                }
            }

            return $q.reject(rejection);
        }
    };
}]);