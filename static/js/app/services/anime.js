(function () {
    'use strict';

    angular
        .module('main')
        .factory('Anime', Anime);

    Anime.$inject = ['$resource'];

    function Anime($resource) {
        return $resource('api/anime/:id', {id: '@id'}, {
            update: {
                method: 'PUT'
            }
        });
    }
})();