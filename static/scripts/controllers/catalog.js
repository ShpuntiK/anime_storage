(function () {
    'use strict';

    angular
        .module('main')
        .controller('CatalogController', CatalogController);

    function CatalogController($log, Anime) {
        var vm = this;
        vm.animeRows = [];

        getAnimes();

        function getAnimes() {
            Anime.query(function (res) {
                vm.animeRows = splitArrayOnParts(res, 3);
            }, function (err) {
                $log.error(err);
            });
        }

        function splitArrayOnParts(arr, partSize) {
            var splittedArray = [];

            for (var i = 0, length = arr.length; i < length; i += partSize) {
                splittedArray.push(arr.slice(i, i + partSize));
            }

            return splittedArray;
        }
    }
})();