//angular.module('programDataService', ['ngResource']).
//    factory('programDataService', function($resource) {
//        var programDataService = $resource('/uptime', { },
//            {
//                'get' : { method: 'GET', params: { format: '.json' } , isArray : false }
//            }
//        )
//
//
//        programDataService.loadUptime = function(cb) {
//            return programDataService.get();
//        }
//
//        return programDataService;
//    });