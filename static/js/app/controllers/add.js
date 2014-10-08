(function () {
    'use strict';

    //TODO: 1) add validation
    //TODO: 2) add tests
    //TODO: 3) add animate after loading
    angular
        .module('main')
        .controller('AddController', AddController);

    AddController.$inject = [
        'Anime'
    ];

    function AddController(Anime) {
        var vm = this;
        vm.anime = {};
        vm.form = {
            isShown: false,
            alert: null,

            hideAlert: function () {
                this.alert = null;
            },
            toggle: function () {
                this.alert = null;
                this.isShown = !this.isShown;
            },
            submit: function () {
                var self = this,
                    newAnime = new Anime(vm.anime);

                newAnime.$save(function (res) {
                    self.alert = {
                        type: 'success',
                        msg: 'New anime was added!'
                    };
                }, function (err) {
                    self.alert = {
                        type: 'danger',
                        msg: err.data.detail
                    };
                });
            }
        };
    }
})();