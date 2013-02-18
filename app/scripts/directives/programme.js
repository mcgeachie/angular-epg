'use strict';

angular.module('epgDirectives', ['epgFilters'])
    .directive('programme', function () {
        return {
            template: '<a href="#" class="epg-programme" style="width: {{programme.m[1] | durationInPixels}}; left: {{programme.s | startTimeInPixels}}" data-ng-class="{short: programme.m[1] <= 900}">{{programme.t}}</a>',
            restrict: 'E',
            replace: true
        };
    });

