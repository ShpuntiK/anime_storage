'use strict';

angular.module('main').controller('ModalController', [
    '$scope',
    '$modalInstance',
function(
    $scope,
    $modalInstance
){
    $scope.cancel = function(){
        $modalInstance.dismiss();
    };

    $scope.confirm = function(){
        $modalInstance.close();
    };
}]);