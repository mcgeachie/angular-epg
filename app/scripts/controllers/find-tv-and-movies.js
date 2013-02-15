'use strict';

fangApp.controller('FindTvAndMoviesCtrl', ['$scope', 'Recommendation', function($scope, Recommendation) {

    $scope.message = 'Find TV and Movies';
    $scope.recommendations = Recommendation.query({session: 0});
    

}]);

