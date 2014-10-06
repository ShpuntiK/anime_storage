(function () {
    'use strict';

    angular
        .module('main')
        .controller('DetailController', DetailController);

    DetailController.$inject = [
        '$routeParams',
        '$location',
        '$modal',
        'Anime'
    ];

    function DetailController($routeParams, $location, $modal, Anime) {
        var vm = this;
        vm.anime = {};
        vm.deleteAnimeModal = null;
        vm.deleteAnime = deleteAnime;
        vm.deleteAnimeConfirm = deleteAnimeConfirm;
        vm.editForm = {
            isShown: false,
            alert: null,

            hideAlert: function () {
                this.alert = null;
            },
            toggle: function () {
                this.hideAlert();
                this.isShown = !this.isShown;
            },
            submit: function () {
                var self = this;

                vm.anime.$update(function (res) {
                    self.alert = {
                        type: 'success',
                        msg: 'Anime was updated!'
                    };
                }, function (err) {
                    self.alert = {
                        type: 'danger',
                        msg: err.data.detail
                    };
                });
            }
        };

        getAnime();

        function getAnime() {
            Anime.get({id: $routeParams.animeId}, function (res) {
                vm.anime = res;
            }, function (err) {
                alert(err.data.detail);
            });
        }

        function deleteAnime() {
            vm.deleteAnimeModal = $modal
                .open({
                    templateUrl: 'static/js/app/views/modals/delete.html',
                    controller: 'ModalController',
                    size: 'sm'
                })
                .result.then(function () {
                    vm.deleteAnimeConfirm();
                });
        }

        function deleteAnimeConfirm() {
            vm.anime.$delete(function (res) {
                $location.path('/catalog');
            }, function (err) {
                alert('Cannot delete anime: ' + err);
            });
        }
    }
})();