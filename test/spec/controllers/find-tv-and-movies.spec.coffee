'use strict'

describe 'Controller: FindTvAndMoviesCtrl', ->
    Recommendation = null
    scope = null

    beforeEach ->
        scope = {}
        Recommendation = query: jasmine.createSpy().andReturn('recs')
        module 'fangApp', ($provide) ->
            $provide.value 'Recommendation', Recommendation
            return
        inject ($controller) ->
            $controller 'FindTvAndMoviesCtrl', $scope: scope

    it 'should query for recommendations', ->
        expect(scope.recommendations).toBe 'recs'
        expect(Recommendation.query).toHaveBeenCalledWith sessionId: 0
