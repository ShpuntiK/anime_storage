'use strict';

angular.module('main').controller('DetailController', [
    '$scope',
    '$routeParams',
    '$location',
    '$modal',
    'Anime',
function (
    $scope,
    $routeParams,
    $location,
    $modal,
    Anime
) {
    $scope.anime = {};
    $scope.deleteAnimeModal = null;

    $scope.editForm = {
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
            var self = this;

            $scope.anime.$update(function (res) {
                self.alert = {
                    type: 'success',
                    msg: 'Anime was updated!'
                };
            }, function (err) {
                self.alert = {
                    type: 'danger',
                    msg: err.data.detail
                };
            });
        }
    };

    Anime.get({id: $routeParams.animeId}, function (res) {
        $scope.anime = res;
    }, function (err) {
        alert(err.data.detail);
    });

    $scope.deleteAnime = function() {
        $scope.deleteAnimeModal = $modal
        .open({
            templateUrl: 'static/js/app/views/modals/delete.html',
            controller: 'ModalController',
            size: 'sm'
        })
        .result.then(function (selectedItem) {
            $scope.deleteAnimeConfirm();
        });
    };

    $scope.deleteAnimeConfirm = function () {
        $scope.anime.$delete(function (res) {
            $location.path('/catalog');
        }, function (err) {
            alert('Can not delete anime: ' + err);
        });
    };
}]);