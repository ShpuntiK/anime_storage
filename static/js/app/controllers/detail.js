'use strict';

angular.module('main').controller('DetailController', [
    '$scope',
    '$routeParams',
    'Anime',
function (
    $scope,
    $routeParams,
    Anime
) {
    $scope.anime = {};

    $scope.editForm = {
        isShown: false,
        alert: null,

        toggle: function () {
            this.alert = null;
            this.isShown = !this.isShown;
        }
    };

    Anime.get({id: $routeParams.animeId}, function (res) {
        $scope.anime = res;
    }, function (err) {
        alert(err.data.detail);
    });

    $scope.editAnime = function () {
        $scope.anime.$update(function (res) {
            $scope.editForm.alert = {
                type: 'success',
                title: 'Cool!',
                msg: 'Anime was updated!'
            };
        }, function (err) {
            $scope.editForm.alert = {
                type: 'danger',
                title: 'Error!',
                msg: err.data.detail
            };
        });
    };

//TODO: add delete with modal
}]);