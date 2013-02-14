'use strict';

angular.module('recommendationEngine', ['ngResource'])
	.factory('Recommendation', ['$resource', function($resource) {
    	return $resource('/api/1.0/personalised/101/epg/session/:sessionId?c=6', {}, {
    		query: {method:'GET', params:{sessionId: '0'}, isArray:true}
  		});
	}]);
