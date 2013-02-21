'use strict';

angular.module('epgDirectives', ['epgFilters'])
    .directive('dragScrollable', function() {
        return function(scope, element) {
            element.dragscrollable({
                dragSelector: '.epg-grid, .epg-time'
            });
        };
    })
    .directive('epgProgramme', ['$filter', function($filter) {
    return {
        template: '<a href="#" class="epg-programme" data-ng-class="{short: programme.m[1] <= 900}">{{programme.t}}</a>',
        restrict: 'E',
        replace: true,
        link: function(scope, element) {
            element.css('width', $filter('durationInPixels')(scope.programme.m[1]))
                .css('left', $filter('startTimeInPixels')(scope.programme.s));
        }
    };
}]);

