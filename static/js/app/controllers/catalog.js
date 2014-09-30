'use strict';

angular.module('main').controller('CatalogController', [
    '$scope',
    'Anime',
function (
    $scope,
    Anime
) {
    $scope.animes = [];

    function splitArrayOnParts(arr, partSize) {
        var splittedArray = [];

        for(var i = 0, length = arr.length; i < length; i += partSize){
            splittedArray.push(arr.slice(i, i + partSize));
        }

        return splittedArray;
    }

    Anime.query(function(res){
        var animes = res;

        $scope.animeRows = splitArrayOnParts(animes, 3);
    }, function(err){
        alert(err.data.detail);
    });
}]);