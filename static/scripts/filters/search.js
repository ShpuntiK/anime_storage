(function () {
    'use strict';

    angular
        .module('main')
        .filter('search', search);

    function search($filter) {
        return function (arr, filter) {
            var filteredArr = arr;

            if (filter) {
                if (filter.name) {
                    filteredArr = $filter('filter')(filteredArr, filter.name);
                }

                if (filter.rating) {
                    filteredArr = $filter('filter')(filteredArr, function (item) {
                        if (item.rating === filter.rating) {
                            return true;
                        }
                    });
                }

                if(filter.yearFrom) {
                    filteredArr = $filter('filter')(filteredArr, function (item) {
                        if (item.year >= filter.yearFrom) {
                            return true;
                        }
                    })
                }

                if(filter.yearTo) {
                    filteredArr = $filter('filter')(filteredArr, function (item) {
                        if (item.year <= filter.yearTo) {
                            return true;
                        }
                    })
                }
            }

            return filteredArr;
        };
    }
})();