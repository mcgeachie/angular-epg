'use strict';

angular.module('recommendationEngine', ['ngResource'])
	.factory('Recommendation', ['$resource', function($resource) {
    	return $resource('api/recs/recommendations/:sessionId', {}, {
    		query: {method:'GET', params:{sessionId: 'piraterob'}, isArray:false}
  		});
	}]);
