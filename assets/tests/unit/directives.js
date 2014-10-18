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

    });
})();