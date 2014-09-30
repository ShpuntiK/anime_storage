angular.module('main').directive('alert', function(){
    return {
        restrict: 'E',
        scope: {
            type: '@',
            title: '@',
            msg: '@',
            ngShow: '='
        },
        templateUrl: 'static/js/app/views/alert.html',
        link: function(scope, element, attrs){
            scope.hide = function(){
                scope.ngShow = false;
            };
        }
    }
});