(function () {
    'use strict';

    angular
        .module('main')
        .controller('ModalController', [
            '$scope',
            '$modalInstance',
            ModalController
        ]);

    function ModalController($scope, $modalInstance) {
        $scope.cancel = function () {
            $modalInstance.dismiss();
        };

        $scope.confirm = function () {
            $modalInstance.close();
        };
    }
})();