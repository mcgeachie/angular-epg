'use strict';

fangApp.controller('TvGuideCtrl', ['$scope', '$http', function($scope, $http) {
    $http.get('/api/channel/index/4101-1').success(function (data) {
        $scope.channels = data.init.channels;
        $http.get('/api/programme/channel/2002,2006,6000,1621,1801,4061,4066,4053,3810,2304/2013-02-18/2.json').success(function (data) {
            $scope.listings = data.listings;
        });
    });

    $scope.hours = _.map(_.range(24), function (hour) {
        return new Date(0, 0, 0, hour);
    });

    $scope.oddOrEven = function (index) {
        return index % 2 === 0 ? 'odd' : 'even';
    }

}]);
