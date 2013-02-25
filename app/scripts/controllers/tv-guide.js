'use strict';

fangApp.controller('TvGuideCtrl', ['$scope', '$http', '$filter', function($scope, $http, $filter) {

    var chunkUrl = function(x, y) {
        var today = $filter('date')(new Date(), 'yyyy-MM-dd');
        var channels = $scope.getChannelGroup(y);
        return '/api/programme/channel/' + channels.join(',') + '/' + today + '/' + x + '.json';
    };

    $http.get('/api/channel/index/4101-1').success(function(data) {
        $scope.channels = data.init.channels;
        $scope.channelIds = _.map($scope.channels, function(channel) {
            return channel.c[0];
        });
        $scope.$broadcast('epg:channelsLoaded');
    });

    $scope.chunksInView = [];

    $scope.hours = _.map(_.range(24), function(hour) {
        return new Date(0, 0, 0, hour);
    });

    $scope.allProgrammesInChannels = [];

    $scope.allProgrammes = function() {
        var programmes = [];
        for (var x in $scope.chunksInView) {
            for (var y in $scope.chunksInView[x]) {
                var chunk = $scope.chunksInView[x][y];
                for (var channel in chunk) {
                    for (var j in chunk[channel]) {
                        var programme = chunk[channel][j];
                        programme.cid = parseInt(channel);
                        programmes.push(programme);
                    }
                }
            }
        }
        return programmes;
    };

    $scope.getChannelGroup = function(y) {
        var startIndex = y * 10,
            endIndex = startIndex + 10;
        return $scope.channelIds.slice(startIndex, endIndex);
    };

    $scope.populateChunksInView = function(chunkNumbersInView) {
        _.each(_.range(chunkNumbersInView.x[0], chunkNumbersInView.x[1] + 1), function(x) {
            _.each(_.range(chunkNumbersInView.y[0], chunkNumbersInView.y[1] + 1), function(y) {

                // ensure at least an empty array in chunksInView[x]
                if ($scope.chunksInView[x] == undefined) {
                    $scope.chunksInView[x] = [];
                }

                if ($scope.chunksInView[x][y] == undefined) {
                    $http.get(chunkUrl(x, y)).success(function(data) {
                        console.log('got back', x, y, data.listings);
                        $scope.chunksInView[x][y] = data.listings;
                        $scope.allProgrammesInChannels = $scope.allProgrammes();
                    });
                }
            });
        });
    };

    $scope.removeChunksNotInView = function(chunkNumbersInView) {
        for (var x in $scope.chunksInView) {
            for (var y in $scope.chunksInView[x]) {
                if ((x < chunkNumbersInView.x[0] || x > chunkNumbersInView.x[1]) || (y < chunkNumbersInView.y[0] || y > chunkNumbersInView.y[1])) {
                    console.log('removing chunk', x, y);
                    $scope.chunksInView[x][y] = undefined;
                }
            }
        }
    };

    $scope.$on('epg:chunksChanged', function(event, chunkNumbersInView) {
        console.log('it changed!', arguments);
        $scope.removeChunksNotInView(chunkNumbersInView);
        $scope.populateChunksInView(chunkNumbersInView);
    });

}
])
;
