(function () {
    'use strict';

    angular
        .module('main')
        .controller('DetailController', DetailController);

    //TODO: tags order
    function DetailController($routeParams, $location, $modal, Anime, Tag) {
        var vm = this,
            savedAnime = {};

        vm.existedTags = Tag.resource.query();
        vm.anime = {};
        vm.deleteAnimeModal = null;
        vm.alert = null;
        vm.editAnime = editAnime;
        vm.deleteAnime = deleteAnime;
        vm.deleteAnimeConfirm = deleteAnimeConfirm;
        vm.filterTags = filterTags;
        vm.hideAlert = hideAlert;
        vm.toggleForm = toggleForm;

        getAnime();

        function hideAlert() {
            vm.alert = null;
        }

        function toggleForm() {
            vm.hideAlert();
            vm.formIsShown = !vm.formIsShown;
            vm.anime = angular.copy(savedAnime);
        }

        function filterTags(query) {
            return Tag.autocomplete(vm.existedTags, query);
        }

        function editAnime() {
            vm.anime.$update(function (anime) {
                savedAnime = angular.copy(anime);
                vm.alert = {
                    type: 'success',
                    msg: 'Anime was updated!'
                };
            }, function (err) {
                vm.alert = {
                    type: 'danger',
                    msg: err.data.detail
                };
            });
        }

        function getAnime() {
            Anime.get({id: $routeParams.animeId}, function (anime) {
                vm.anime = anime;
                savedAnime = angular.copy(anime);
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