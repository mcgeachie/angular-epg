'use strict';

fangApp.controller('TvGuideCtrl', ['$scope', '$http', '$filter', function($scope, $http, $filter) {

    var chunkUrl = function(chunkNumber, channelsInView) {
        var today = $filter('date')(new Date(), 'yyyy-MM-dd');
        return '/api/programme/channel/'+ channelsInView.join(',') +'/' + today + '/' + chunkNumber + '.json';
    };

    $http.get('/api/channel/index/4101-1').success(function(data) {
        $scope.channels = data.init.channels;
        $scope.channelNumbers = _.map($scope.channels, function(channel) {
            return channel.c[0];
        });
        console.log('channelNumbers', $scope.channelNumbers);
        $scope.$broadcast('epg:channelsLoaded');
    });

    $scope.chunksInView = [];

    $scope.hours = _.map(_.range(24), function(hour) {
        return new Date(0, 0, 0, hour);
    });

    $scope.channelPosition = function(channel) {
        console.log(channel, typeof channel, parseInt(channel), _.indexOf($scope.channelNumbers, parseInt(channel)));
        return (_.indexOf($scope.channelNumbers, parseInt(channel)) * 65) + 'px';
    };

    $scope.allProgrammesInChannels = {};

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

    $scope.findChannelsInView = function(chunkNumbersInView) {
        var channelsInView = [];
        _.each(_.range(chunkNumbersInView.y[0], chunkNumbersInView.y[1] + 1), function(y) {
            _.each(_.range(y * 10, (y + 1) * 10), function(channelIndex) {
                var channel = $scope.channels[channelIndex];
                if (channel) {
                    channelsInView.push(channel.c[0])
                }
            });
        });
        return channelsInView;
    };

    $scope.populateChunksInView = function(chunkNumbersInView) {
        _.each(_.range(chunkNumbersInView.x[0], chunkNumbersInView.x[1] + 1), function(x) {
            if ($scope.chunksInView[x] === undefined) {
                console.log('requesting chunk', x);
                var channelsInView = $scope.findChannelsInView(chunkNumbersInView);
                $http.get(chunkUrl(x, channelsInView)).success(function(data) {
                    console.log('got back', x, data.listings);
                    $scope.chunksInView[x] = data.listings;
                    $scope.allProgrammesInChannels = $scope.allProgrammes();
                });
            } else {
                console.log('already got chunk', x);
            }
        });
    };

    $scope.removeChunksNotInView = function(chunkNumbersInView) {
        for (var index in $scope.chunksInView) {
            if (index < chunkNumbersInView.x[0] || index > chunkNumbersInView.x[1]) {
                console.log('removing chunk '+index);
                $scope.chunksInView[index] = undefined;
            }
        }
    };

    $scope.$on('epg:chunksChanged', function(event, chunkNumbersInView) {
        console.log('it changed!', arguments);
        $scope.removeChunksNotInView(chunkNumbersInView);
        $scope.populateChunksInView(chunkNumbersInView);
    });

}]);
