'use strict';

fangApp.controller('FindTvAndMoviesCtrl', ['$scope', '$http', function ($scope, $http) {

    $scope.message = 'Find TV and Movies';

    $http.get('/api/recs/recommendations/piraterob').success(function (data) {
        $scope.recommendations = data.recommendations;
    });

}]);

