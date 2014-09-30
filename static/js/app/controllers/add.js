'use strict';

//TODO: 1) add validation
//TODO: 2) add spinner, while data is loading
angular.module('main').controller('AddController', [
    '$scope',
function (
    $scope
) {
    $scope.anime = {};

    $scope.addForm = {
        isShown: false,
        alert: null,

        toggle: function () {
            this.alert = null;
            this.isShown = !this.isShown;
        }
    };

    $scope.addAnime = function () {
        $scope.anime.$save(function (res) {
            $scope.addForm.alert = {
                type: 'success',
                title: 'Cool!',
                msg: 'New anime was added!'
            };
        }, function (err) {
            $scope.addForm.alert = {
                type: 'danger',
                title: 'Error!',
                msg: err.data.detail
            };
        });
    };
}]);