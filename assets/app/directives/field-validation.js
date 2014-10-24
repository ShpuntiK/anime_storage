(function () {
    'use strict';

    angular
        .module('main')
        .directive('fieldValidation', fieldValidation);

    function fieldValidation() {
        return {
            restrict: 'A',
            require: '^form',
            link: link
        };

        function link(scope, element, attrs, formController) {
            var field = formController[attrs.name];

            scope.$watch(function () {
                return (formController.$$parentForm.$submitted || formController.$submitted || field.$touched) &&
                    field.$invalid;
            }, function (invalid) {
                element.toggleClass('has-error', invalid);
            });
        }
    }
})();
