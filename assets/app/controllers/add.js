(function () {
    'use strict';

    //TODO: 1) add validation
    //TODO: 2) add tests
    //TODO: 3) add animate after loading
    angular
        .module('main')
        .controller('AddController', AddController);

    function AddController(Anime, Tag) {
        var vm = this;
        vm.existedTags = Tag.resource.query();
        vm.anime = {};
        vm.alert = null;
        vm.addAnime = addAnime;
        vm.hideAlert = hideAlert;
        vm.filterTags = filterTags;

        function hideAlert(){
            vm.alert = null;
        }

        function addAnime() {
            var newAnime = new Anime(vm.anime);

            newAnime.$save(function (res) {
                vm.anime = {};
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