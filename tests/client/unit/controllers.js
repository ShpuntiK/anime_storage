(function () {
    'use strict';

    describe('controllers', function () {

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
                var initAnime = {
                    rating: 3,
                    links: [{}]
                }, form;

                beforeEach(function () {
                    expect(ctrl.anime).toEqual(initAnime);
                    expect(ctrl.alert).toBeNull();

                    form = {
                        $valid: true,
                        $setPristine: jasmine.createSpy('$setPristine'),
                        $setUntouched: jasmine.createSpy('$setUntouched')
                    };
                });

                describe('form is valid', function () {

                    it('success response', function () {
                        var expectedResult = {
                            name: 'test name',
                            rating: 5,
                            links: [{
                                name: 'test link',
                                url: 'http://test.com'
                            }]
                        };

                        ctrl.anime = expectedResult;
                        ctrl.addAnime(form);

                        $httpBackend
                            .expectPOST('api/anime', expectedResult)
                            .respond(201, expectedResult);

                        expect(ctrl.anime).toEqual(expectedResult);

                        $httpBackend.flush();

                        expect(form.$setPristine).toHaveBeenCalled();
                        expect(form.$setUntouched).toHaveBeenCalled();
                        expect(ctrl.anime).toEqual(initAnime);
                        expect(ctrl.alert).not.toBeNull();
                        expect(ctrl.alert.type).toEqual('success');
                    });

                    it('error response', function () {
                        ctrl.addAnime(form);

                        $httpBackend
                            .expectPOST('api/anime')
                            .respond(400, {detail: 'fail'});

                        $httpBackend.flush();

                        expect(form.$setPristine).not.toHaveBeenCalled();
                        expect(form.$setUntouched).not.toHaveBeenCalled();
                        expect(ctrl.anime).toEqual(initAnime);
                        expect(ctrl.alert).not.toBeNull();
                        expect(ctrl.alert.type).toEqual('danger');
                    });

                });

                it('form is invalid', function () {
                    var expectedResult = {
                        name: 'test name',
                        rating: 5,
                        links: [{
                            name: 'test link',
                            url: 'http://test.com'
                        }]
                    };

                    form.$valid = false;

                    ctrl.anime = expectedResult;
                    ctrl.addAnime(form);

                    $httpBackend.flush();

                    expect(form.$setPristine).not.toHaveBeenCalled();
                    expect(form.$setUntouched).not.toHaveBeenCalled();
                    expect(ctrl.anime).toEqual(expectedResult);
                    expect(ctrl.alert).toBeNull();
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

            describe('linkField', function(){

                beforeEach(function(){
                    expect(ctrl.anime.links).toEqual([{}]);
                });

                it('addLinkField', function(){
                    ctrl.addLinkField();

                    expect(ctrl.anime.links).toEqual([{}, {}]);
                });

                it('removeLinkField', function(){
                    ctrl.removeLinkField();

                    expect(ctrl.anime.links).toEqual([]);
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
                        {name: 'anime5'}
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

        describe('DetailController', function () {
            var animeFromResponse = {
                    name: 'test',
                    rating: 5,
                    links: [{
                        name: 'test link 1',
                        url: 'http://test1.com'
                    }]
                },
                ctrl, $httpBackend, $location;

            beforeEach(inject(function (_$httpBackend_, _$location_, $controller) {
                $httpBackend = _$httpBackend_;

                $httpBackend
                    .whenGET('api/anime')
                    .respond(animeFromResponse);

                $httpBackend
                    .whenGET('api/tag')
                    .respond([
                        {name: 'tag1'},
                        {name: 'tag2'}
                    ]);

                $location = _$location_;

                ctrl = $controller('DetailController');
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

            it('toggleForm', function () {
                $httpBackend.flush();

                ctrl.alert = 'test data';

                expect(ctrl.alert).not.toBeNull();
                expect(ctrl.formIsShown).toBeFalsy();
                expect(ctrl.anime).toEqualData(animeFromResponse);

                ctrl.anime = {
                    name: 'new name',
                    rating: 1
                };

                ctrl.toggleForm();

                expect(ctrl.alert).toBeNull();
                expect(ctrl.formIsShown).toBeTruthy();
                expect(ctrl.anime).toEqualData(animeFromResponse);
            });

            describe('editAnime', function () {
                var expectedResult = {
                    name: 'new name',
                    rating: 1,
                    links: [{
                        name: 'test link 2',
                        url: 'http://test2.com'
                    }]
                }, form = {
                    $valid: true
                };

                beforeEach(function () {
                    $httpBackend.flush();

                    expect(ctrl.anime).toEqualData(animeFromResponse);
                    expect(ctrl.alert).toBeNull();

                    ctrl.anime.name = expectedResult.name;
                    ctrl.anime.rating = expectedResult.rating;
                    ctrl.anime.links = expectedResult.links;
                });

                describe('form is valid', function () {

                    it('success response', function () {
                        $httpBackend
                            .expectPUT('api/anime', expectedResult)
                            .respond(200, expectedResult);

                        ctrl.editAnime(form);

                        expect(ctrl.anime).toEqualData(expectedResult);

                        $httpBackend.flush();

                        expect(ctrl.anime).toEqualData(expectedResult);
                        expect(ctrl.alert).not.toBeNull();
                        expect(ctrl.alert.type).toEqual('success');
                    });

                    it('error response', function () {
                        $httpBackend
                            .expectPUT('api/anime', expectedResult)
                            .respond(400, {detail: 'fail'});

                        ctrl.editAnime(form);

                        expect(ctrl.anime).toEqualData(expectedResult);

                        $httpBackend.flush();

                        expect(ctrl.anime).toEqualData(expectedResult);
                        expect(ctrl.alert).not.toBeNull();
                        expect(ctrl.alert.type).toEqual('danger');
                    });
                });

                it('form is invalid', function () {
                    form.$valid = false;

                    ctrl.editAnime(form);

                    expect(ctrl.anime).toEqualData(expectedResult);

                    expect(ctrl.alert).toBeNull();
                });

            });

            it('deleteAnime', function () {
                expect(ctrl.deleteAnimeModal).toBeNull();

                ctrl.deleteAnime();

                expect(ctrl.deleteAnime).not.toBeNull();
            });

            describe('deleteAnimeConfirm', function () {
                beforeEach(function () {
                    $httpBackend.flush();

                    expect(ctrl.anime).toEqualData(animeFromResponse);
                });

                it('success response', function () {
                    $httpBackend
                        .expectDELETE('api/anime')
                        .respond(200);

                    ctrl.deleteAnimeConfirm();

                    $httpBackend.flush();

                    expect($location.path()).toEqual('/catalog');
                });

                it('error response', function () {
                    $httpBackend
                        .expectDELETE('api/anime')
                        .respond(500, {detail: 'fail'});

                    ctrl.deleteAnimeConfirm();

                    $httpBackend.flush();

                    expect($location.path()).not.toEqual('/catalog');
                });

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

            describe('linkField', function () {

                beforeEach(function () {
                    $httpBackend.flush();

                    expect(ctrl.anime.links).toEqual([{
                        name: 'test link 1',
                        url: 'http://test1.com'
                    }]);
                });

                it('addLinkField', function () {
                    ctrl.addLinkField();

                    expect(ctrl.anime.links).toEqual([{
                        name: 'test link 1',
                        url: 'http://test1.com'
                    }, {}]);
                });

                it('removeLinkField', function () {
                    ctrl.removeLinkField();

                    expect(ctrl.anime.links).toEqual([]);
                });

            });

        });

        describe('ModalController', function () {
            var ctrl, modalInstance;

            beforeEach(inject(function ($controller) {
                modalInstance = jasmine.createSpyObj('modalInstance', ['close', 'dismiss']);

                ctrl = $controller('ModalController', {
                    $modalInstance: modalInstance
                });
            }));

            it('work', function () {
                expect(ctrl).toBeDefined();
            });

            it('dismiss', function () {
                ctrl.cancel();

                expect(modalInstance.dismiss).toHaveBeenCalled();
            });

            it('confirm', function () {
                ctrl.confirm();

                expect(modalInstance.close).toHaveBeenCalled();
            });

        });

    });
})();