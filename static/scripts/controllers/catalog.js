(function () {
    'use strict';

    angular
        .module('main')
        .controller('CatalogController', CatalogController);

    function CatalogController($log, Anime) {
        var vm = this;
        vm.animes = [];

        getAnimes();

        function getAnimes() {
            Anime.query(function (res) {
                vm.animes = res;
            }, function (err) {
                $log.error(err);
            });
        }
    }
})();