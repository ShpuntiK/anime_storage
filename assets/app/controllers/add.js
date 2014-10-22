(function () {
    'use strict';

    angular
        .module('main')
        .controller('AddController', AddController);

    function AddController(Anime, Tag) {
        var vm = this;
        vm.existedTags = Tag.resource.query();
        vm.anime = {
            links: [
                {name: null, url: null}
            ]
        };
        vm.alert = null;
        vm.addAnime = addAnime;
        vm.addLinkField = addLinkField;
        vm.removeLinkField = removeLinkField;
        vm.hideAlert = hideAlert;
        vm.filterTags = filterTags;

        function hideAlert() {
            vm.alert = null;
        }

        function addLinkField() {
            vm.anime.links.push({name: null, url: null});
        }

        function removeLinkField(index) {
            vm.anime.links.splice(index, 1);
        }

        function addAnime() {
            var newAnime = new Anime(vm.anime);

            newAnime.$save(function (res) {
                vm.anime = {
                    links: [{name: null, url: null}]
                };
                vm.existedTags = Tag.resource.query();

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