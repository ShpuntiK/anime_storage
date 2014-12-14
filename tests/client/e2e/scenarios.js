(function () {
    'use strict';

    describe('main app', function () {

        it('redirect to /catalog', function () {
            browser.get('/');
            browser
                .getLocationAbsUrl()
                .then(function (url) {
                    console.log(url);
                    expect(url).toEqual('/catalog');
                });
        });

        describe('catalog', function () {

            beforeEach(function () {
                browser.get('#/catalog');

                var tabs = element.all(by.css('.navbar-nav > li'));

                expect(tabs.get(0).getAttribute('class')).toEqual('active');
            });

            it('rows contain >= 0 and <= 3 cols', function () {
                var rows = element.all(by.css('.row'));

                rows.each(function (row) {
                    var columnCount = row.all(by.css('.col-md-4')).count();

                    expect(columnCount).toBeGreaterThan(-1);
                    expect(columnCount).toBeLessThan(4);
                });
            });

        });

        describe('add', function () {

            beforeEach(function () {
                browser.get('#/add');

                var tabs = element.all(by.css('.navbar-nav > li'));

                expect(tabs.get(1).getAttribute('class')).toEqual('active');
            });

            it('empty form', function () {
                var formFields = element.all(by.css('.form-control'));

                formFields.each(function (field) {
                    expect(field.getText()).toEqual('');
                });

                expect(element(by.css('.alert')).getAttribute('class')).toMatch('ng-hide');
            });

        });

    });

})();