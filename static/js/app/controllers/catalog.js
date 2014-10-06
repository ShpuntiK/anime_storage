(function () {
    'use strict';

    angular
        .module('main')
        .controller('CatalogController', CatalogController);

    CatalogController.$inject = [
        'Anime'
    ];

    function CatalogController(Anime) {
        var vm = this;
        vm.animes = [];
        vm.animeRows = [];

        getAnimes();

        function getAnimes() {
            Anime.query(function (res) {
                var animes = res;

                vm.animeRows = splitArrayOnParts(animes, 3);
            }, function (err) {
                alert(err.data.detail);
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