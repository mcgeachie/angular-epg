'use strict';

var fangApp = angular.module('fangApp', ['recommendationEngine']);
fangApp.config(['$routeProvider', function ($routeProvider) {

    $routeProvider
        .when('/', {
            templateUrl:'views/today.html',
            controller:'TodayCtrl',
            view:'tab'
        })
        .when('/tv-guide', {
            templateUrl:'views/tv-guide.html',
            controller:'TvGuideCtrl',
            view:'tab'
        })
        .when('/find-tv-and-movies', {
            templateUrl:'views/find-tv-and-movies.html',
            controller:'FindTvAndMoviesCtrl',
            view:'tab'
        })
        .when('/sky-channels', {
            templateUrl:'views/sky-channels.html',
            controller:'SkyChannelsCtrl',
            view:'tab'
        })
        .when('/ways-to-watch', {
            templateUrl:'views/ways-to-watch.html',
            controller:'WaysToWatchCtrl',
            view:'tab'
        })
        .otherwise({
            redirectTo:'/'
        });
} ]);

fangApp.run(['$route', '$rootScope', function ($route, $rootScope) {
    // this allows us to embed the view inside an include. See https://github.com/angular/angular.js/issues/1213
    $route.reload();
    // Set the current controller
    $rootScope.$on('$routeChangeSuccess', function(ev,data) {
     if (data.$route && data.$route.controller)
         $rootScope.controller = data.$route.controller;
     })
} ]);
