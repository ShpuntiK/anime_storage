(function () {
    'use strict';

    angular
        .module('main')
        .controller('CatalogController', CatalogController);

    function CatalogController($log, Anime) {
        var vm = this;
        vm.animes = [];
        vm.search = {};
        vm.cancelFilter = cancelFilter;

        getAnimes();

        function getAnimes() {
            Anime.query(function (res) {
                vm.animes = res;
            }, function (err) {
                $log.error(err);
            });
        }

        function cancelFilter() {
            vm.search = {};
        }
    }
})();