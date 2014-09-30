'use strict';

angular.module('main').factory('Anime', ['$resource', function($resource){
    return $resource('api/anime/:id', {id: '@id'}, {
        update: {
            method: 'PUT'
        }
    });
}]);