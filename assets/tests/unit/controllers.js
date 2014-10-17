'use strict';

describe('Controllers', function () {

    beforeEach(function () {
        jasmine.addMatchers({
            toEqualData: function () {
                return {
                    compare: function (actual, expected) {
                        return {
                            pass: angular.equals(actual, expected)
                        };
                    }
                };
            }
        });
    });

    beforeEach(module('main'));

    describe('AddController', function () {
        var ctrl, $httpBackend;

        beforeEach(inject(function (_$httpBackend_, $controller) {
            $httpBackend = _$httpBackend_;
            $httpBackend
                .whenGET('api/tag')
                .respond([
                    {name: 'tag1'},
                    {name: 'tag2'}
                ]);

            ctrl = $controller('AddController');
        }));

        it('work', function () {
            expect(ctrl).toBeDefined();
        });

        it('hideAlert', function () {
            expect(ctrl.alert).toBeNull();

            ctrl.alert = 'test data';
            expect(ctrl.alert).not.toBeNull();

            ctrl.hideAlert();
            expect(ctrl.alert).toBeNull();
        });

        describe('addAnime', function () {

            beforeEach(function () {
                expect(ctrl.anime).toEqual({});
                expect(ctrl.alert).toBeNull();
            });

            it('success response', function () {
                var expectedResult = {
                    name: 'test name',
                    rating: 5
                };

                ctrl.anime = expectedResult;
                ctrl.addAnime();

                $httpBackend
                    .expectPOST('api/anime', expectedResult)
                    .respond(201, expectedResult);

                expect(ctrl.anime).toEqual(expectedResult);

                $httpBackend.flush();

                expect(ctrl.anime).toEqual({});
                expect(ctrl.alert).not.toBeNull();
                expect(ctrl.alert.type).toEqual('success');
            });

            it('error response', function () {
                ctrl.addAnime();

                $httpBackend
                    .expectPOST('api/anime')
                    .respond(400, {detail: 'fail'});

                $httpBackend.flush();

                expect(ctrl.anime).toEqual({});
                expect(ctrl.alert).not.toBeNull();
                expect(ctrl.alert.type).toEqual('danger');
            });

        });

        it('existedTags', function () {
            expect(ctrl.existedTags).toEqual([]);

            $httpBackend.flush();

            expect(ctrl.existedTags.length).toBeGreaterThan(0);
        });

        describe('filterTags', function () {

            beforeEach(function () {
                $httpBackend.flush();

                expect(ctrl.existedTags.length).toBeGreaterThan(0);
            });

            it('with empty query', function () {
                var filteredTags = ctrl.filterTags('nothing');

                expect(filteredTags.$$state.value).toEqualData([]);
            });

            it('with not existing tags', function () {
                var filteredTags = ctrl.filterTags('nothing');

                expect(filteredTags.$$state.value).toEqualData([]);
            });

            it('with existing tags', function () {
                var expectedResult = [
                    {name: 'tag1'},
                    {name: 'tag2'}
                ];

                var filteredTags = ctrl.filterTags('tag');

                expect(filteredTags.$$state.value).toEqualData(expectedResult);
            });

        });
    });

    describe('CatalogController', function () {
        var ctrl, $httpBackend;

        beforeEach(inject(function (_$httpBackend_, $controller) {
            $httpBackend = _$httpBackend_;
            ctrl = $controller('CatalogController');
        }));

        it('work', function () {
            expect(ctrl).toBeDefined();
        });

        describe('getAnimes', function () {

            beforeEach(function () {
                expect(ctrl.animeRows).toEqual([]);
            });

            it('with empty array', function () {
                $httpBackend
                    .expectGET('api/anime')
                    .respond([]);

                $httpBackend.flush();

                expect(ctrl.animeRows).toEqual([]);
            });

            it('with one element', function () {
                var expectedResult = [
                    {name: 'anime1'}
                ];

                $httpBackend
                    .expectGET('api/anime')
                    .respond(expectedResult);

                $httpBackend.flush();

                expect(ctrl.animeRows).toEqualData([expectedResult]);
            });

            it('with three elements', function () {
                var expectedResult = [
                    {name: 'anime1'},
                    {name: 'anime2'},
                    {name: 'anime3'}
                ];

                $httpBackend
                    .expectGET('api/anime')
                    .respond(expectedResult);

                $httpBackend.flush();

                expect(ctrl.animeRows).toEqualData([expectedResult]);
            });

            it('with five elements', function () {
                var expectedResult = [
                    {name: 'anime1'},
                    {name: 'anime2'},
                    {name: 'anime3'},
                    {name: 'anime4'},
                    {name: 'anime5'},
                ];

                $httpBackend
                    .expectGET('api/anime')
                    .respond(expectedResult);

                $httpBackend.flush();

                expect(ctrl.animeRows).toEqualData([
                    [
                        expectedResult[0],
                        expectedResult[1],
                        expectedResult[2]
                    ],
                    [
                        expectedResult[3],
                        expectedResult[4]
                    ]
                ]);
            });

        });
    });

});