(function(){
    'use strict';

    angular
        .module('main')
        .factory('Tag', Tag);

    Tag.$inject = ['$resource'];

    function Tag($resource){
        return $resource('api/tag/:id', {id: '@id'});
    }

})();