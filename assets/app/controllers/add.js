(function () {
    'use strict';

    angular
        .module('main')
        .controller('AddController', AddController);

    function AddController(Anime, Tag) {
        var vm = this;
        vm.existedTags = [];
        vm.anime = {};
        vm.alert = null;
        vm.addAnime = addAnime;
        vm.addLinkField = addLinkField;
        vm.removeLinkField = removeLinkField;
        vm.hideAlert = hideAlert;
        vm.filterTags = filterTags;

        init();

        function init() {
            vm.anime = {
                rating: 3,
                links: [{}]
            };

            vm.existedTags = Tag.resource.query();
        }

        function hideAlert() {
            vm.alert = null;
        }

        function addLinkField() {
            vm.anime.links.push({});
        }

        function removeLinkField(index) {
            vm.anime.links.splice(index, 1);
        }

        function addAnime(animeForm) {
            var newAnime = new Anime(vm.anime);

            if (!animeForm.$valid) {
                return;
            }

            newAnime.$save(function (res) {
                init();

                animeForm.$setPristine();
                animeForm.$setUntouched();

                vm.alert = {
                    type: 'success',
                    msg: 'New anime was added!'
                };
            }, function (err) {
                vm.alert = {
                    type: 'danger',
                    msg: err.data.detail
                };
            });
        }

        function filterTags(query) {
            return Tag.autocomplete(vm.existedTags, query);
        }
    }
})();