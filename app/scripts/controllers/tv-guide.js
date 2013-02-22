'use strict';

fangApp.controller('TvGuideCtrl', ['$scope', '$http', '$filter', function($scope, $http, $filter) {

    var chunkUrl = function(chunkNumber) {
        var today = $filter('date')(new Date(), 'yyyy-MM-dd');
        return '/api/programme/channel/2002,2006,6000,1621,1801,4061,4066,4053,3810,2304,3809,4056,4080,4074,2061,2018,6532,6533,6534,1833/' + today + '/' + chunkNumber + '.json';
    };

    $http.get('/api/channel/index/4101-1').success(function(data) {
        $scope.channels = data.init.channels;
    });

    $scope.chunksInView = [];

    $scope.hours = _.map(_.range(24), function(hour) {
        return new Date(0, 0, 0, hour);
    });

    $scope.allProgrammes = function() {
        var programmes = {};
        for (var i in $scope.chunksInView) {
            var chunk = $scope.chunksInView[i];
            for (var channel in chunk) {
                if (programmes[channel] === undefined) {
                    programmes[channel] = chunk[channel];
                } else {
                    programmes[channel] = programmes[channel].concat(chunk[channel]);
                }
            }
        }
        console.log('flattened listings...',programmes);
        return programmes;
    };

    $scope.$on('epg:chunksChanged', function(event, chunksInView) {
        console.log('it changed!', event.name, chunksInView.x, chunksInView.y);
        _.each(_.range(chunksInView.x[0], chunksInView.x[1] + 1), function(x) {
            if ($scope.chunksInView[x] === undefined) {
                console.log('requesting chunk', x);
                $http.get(chunkUrl(x)).success(function(data) {
                    console.log('got back', x, data.listings);
                    $scope.chunksInView[x] = data.listings;
                });
            } else {
                console.log('already got chunk', x);
            }
        });
    });

}]);
