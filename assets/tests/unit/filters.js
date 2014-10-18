'use strict';

describe('filters', function () {

    beforeEach(module('main'));

    describe('range', function () {
        var filter;

        beforeEach(inject(function ($filter) {
            filter = $filter('range');
        }));

        it('work', function () {
            expect(filter).toBeDefined();
        });


        describe('without to', function () {

            it('from = 0', function () {
                expect(filter([], 0)).toEqual([]);
            });

            it('from = 3', function () {
                var expectedResult = [0, 1, 2];

                expect(filter([], 3)).toEqual(expectedResult);
            });

        });

        describe('with to', function () {

            it('from = 0 to = 0', function () {
                expect(filter([], 0)).toEqual([]);
            });

            it('from = 0 to = 3', function () {
                var expectedResult = [0, 1, 2];

                expect(filter([], 0, 3)).toEqual(expectedResult);
            });

            it('from = 2 to = 5', function () {
                var expectedResult = [2, 3, 4];

                expect(filter([], 2, 5)).toEqual(expectedResult);
            });

            it('from = 5 to = 2', function () {
                expect(filter([], 5, 2)).toEqual([]);
            });

        });

    });

});