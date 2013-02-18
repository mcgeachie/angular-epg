'use strict';

fangApp.directive('programme', function () {
    return {
        template:'<a href="#" class="epg-programme" style="width: {{programme.m[1] | durationInPixels}}; left: {{programme.s | startTimeInPixels}}" data-ng-class="">{{programme.t}}</a>',
        restrict:'E',
        replace:true
    };
});

