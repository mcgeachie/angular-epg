'use strict';

var fangApp = angular.module('fangApp', [])
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
        .otherwise({
            redirectTo:'/'
        });
} ]);

fangApp.run(['$route', function ($route) {
    // this allows us to embed the view inside an include. See https://github.com/angular/angular.js/issues/1213
    $route.reload();
} ]);
