'use strict';

var fangApp = angular.module('fangApp', ['recommendationEngine', 'epgFilters', 'epgDirectives']);
fangApp.config(['$routeProvider', function ($routeProvider) {

    $routeProvider
        .when('/tv-guide', {
            templateUrl:'views/tv-guide.html',
            controller:'TvGuideCtrl',
            view:'tab'
        })
        .otherwise({
            redirectTo:'/tv-guide'
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
