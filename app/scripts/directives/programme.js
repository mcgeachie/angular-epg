'use strict';

angular.module('epgDirectives', ['epgFilters'])
    .directive('programme', function () {
        return {
            template: '<a href="#" class="epg-programme" style="width: {{programme.m[1] | durationInPixels}}; left: {{programme.s | startTimeInPixels}}" data-ng-class="">{{programme.t}}</a>',
            restrict: 'E',
            replace: true
        };
    });

