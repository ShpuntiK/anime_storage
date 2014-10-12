(function () {
    'use strict';

    angular
        .module('main')
        .factory('Tag', Tag);

    Tag.$inject = [
        '$resource',
        '$q',
        '$filter'
    ];

    function Tag($resource, $q, $filter) {
        this.autocomplete = function (tags, query) {
            var deferred = $q.defer(),
                filteredTags = $filter('filter')(tags, {name: query});

            deferred.resolve(filteredTags);

            return deferred.promise;
        };

        this.resource = $resource('api/tag');

        return this;
    }
})();