(function () {
    'use strict';

    angular
        .module('main')
        .controller('ModalController', ModalController);

    function ModalController($modalInstance) {
        var vm = this;

        vm.cancel = function () {
            $modalInstance.dismiss();
        };

        vm.confirm = function () {
            $modalInstance.close();
        };
    }
})();