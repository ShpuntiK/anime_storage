'use strict';

//TODO: 1) add validation
//TODO: 2) add spinner, while data is loading
angular.module('main').controller('AddController', [
    '$scope',
    'Anime',
function (
    $scope,
    Anime
) {
    $scope.anime = {};

    $scope.addForm = {
        isShown: false,
        alert: null,

        hideAlert: function() {
            this.alert = null;
        },
        toggle: function () {
            this.alert = null;
            this.isShown = !this.isShown;
        },
        submit: function () {
            var self = this, newAnime;

            newAnime = new Anime($scope.anime);

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
}]);