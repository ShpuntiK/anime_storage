(function () {
    'use strict';

    describe('directives', function () {

        beforeEach(module('main'));

        describe('navbar-active', function () {
            var $location, $rootScope,
                htmlTabs, htmlNavbar, element;

            beforeEach(inject(function (_$location_, _$compile_, _$rootScope_) {
                $location = _$location_;
                $rootScope = _$rootScope_;

                htmlTabs = '<li><a href="#/tab1">tab1</a></li>' +
                    '<li><a href="#/tab2">tab2</a></li>';
                htmlNavbar = '<ul navbar-active>' + htmlTabs + '</ul>';
                element = _$compile_(htmlNavbar)($rootScope);

                expect(element.html()).toEqual(htmlTabs);
            }));

            it('go to tab1', function () {
                var htmlTabsWithActive = '<li class="active"><a href="#/tab1">tab1</a></li>' +
                    '<li class=""><a href="#/tab2">tab2</a></li>';

                $location.path('/tab1');
                $rootScope.$digest();

                expect(element.html()).toEqual(htmlTabsWithActive);
            });

            it('go to tab2', function () {
                var htmlTabsWithActive = '<li class=""><a href="#/tab1">tab1</a></li>' +
                    '<li class="active"><a href="#/tab2">tab2</a></li>';

                $location.path('/tab2');
                $rootScope.$digest();

                expect(element.html()).toEqual(htmlTabsWithActive);
            });

            it('go to otherwise', function () {
                var htmlTabsWithActive = '<li class=""><a href="#/tab1">tab1</a></li>' +
                    '<li class=""><a href="#/tab2">tab2</a></li>';

                $location.path('/otherwise');
                $rootScope.$digest();

                expect(element.html()).toEqual(htmlTabsWithActive);
            });

        });

        describe('field-validation', function () {
            var formElement, inputElement, field;

            beforeEach(inject(function (_$compile_, _$rootScope_) {
                var $rootScope = _$rootScope_,
                    formHtml = '<form name="testForm" novalidate>' +
                        '<input type="url" name="testField" ng-model="testField" required field-validation>' +
                        '<button type="submit">Submit</button></form>';

                formElement = _$compile_(formHtml)($rootScope);
                inputElement = formElement.find('input');

                field = $rootScope.testForm.testField;

                $rootScope.$digest();

                expect(inputElement.hasClass('has-error')).toBeFalsy();
            }));

            describe('validate on touch event', function () {

                it('valid', function () {
                    field.$setViewValue('http://test.com');

                    inputElement.triggerHandler('blur');

                    expect(inputElement.hasClass('has-error')).toBeFalsy();
                });

                it('required not valid', function () {
                    inputElement.triggerHandler('blur');

                    expect(inputElement.hasClass('has-error')).toBeTruthy();
                });

                it('url not valid', function () {
                    field.$setViewValue('test');

                    inputElement.triggerHandler('blur');

                    expect(inputElement.hasClass('has-error')).toBeTruthy();
                });

            });

        });

    });
})();