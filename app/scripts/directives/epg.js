'use strict';

var epgDirectives = angular.module('epgDirectives', ['epgFilters']);

epgDirectives.constant('chunkHeight', 65 * 10);
epgDirectives.constant('chunkWidth', 250 * 6);

epgDirectives.directive('epg', function() {
    return {
        controller: ['$scope', '$element', 'chunkWidth', 'chunkHeight', function($scope, $element, chunkWidth, chunkHeight) {
            $scope.updateChunksInView = function() {
                var minX = Math.floor($element.scrollLeft() / chunkWidth);
                var maxX = Math.ceil(($element.width() + $element.scrollLeft()) / chunkWidth);
                var minY = Math.floor($element.scrollTop() / chunkHeight);
                var maxY = Math.ceil(($element.height() + $element.scrollTop()) / chunkHeight);
                $scope.chunks = {
                    x: [minX, maxX],
                    y: [minY, maxY]
                };
            };
            $scope.onChunkChange = function() {
                $scope.$emit('epg:chunksChanged', $scope.chunks);
            };

            $scope.$on('epg:channelsLoaded', function() {
                $scope.updateChunksInView();
                $scope.$watch('chunks', function() { console.log('chunks updated', arguments); $scope.onChunkChange(); }, true);
            });
        }],
        link: function(scope, element) {
            element.dragscrollable({
                dragSelector: '.epg-grid, .epg-time'
            });
            element.on('scroll', function() {
                scope.$apply(function() {
                    scope.updateChunksInView();
                });
            });
        }
    };
});

epgDirectives.directive('epgProgramme', ['$filter', function($filter) {
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

