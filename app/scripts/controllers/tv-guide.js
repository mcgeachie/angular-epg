'use strict';

fangApp.controller('TvGuideCtrl', ['$scope', '$http', function($scope, $http) {
    $http.get('/api/channel/index/4101-1').success(function (data) {
        $scope.channels = data.init.channels;
        $http.get('/api/programme/channel/2002,2006,6000,1621,1801,4061,4066,4053,3810,2304,3809,4056,4080,4074,2061,2018,6532,6533,6534,1833,2002/2013-02-19/2.json').success(function (data) {
            $scope.listings = data.listings;
        });
    });

    $scope.hours = _.map(_.range(24), function (hour) {
        return new Date(0, 0, 0, hour);
    });

}]);
