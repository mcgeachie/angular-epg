'use strict';

describe('Controller: FindTvAndMoviesCtrl', function () {
    var Recommendation, FindTvAndMoviesCtrl,
        scope;

    // load the controller's module
    beforeEach(function () {
        Recommendation = {query: jasmine.createSpy().andReturn('recs')}
        module('fangApp', function($provide) {
            $provide.value('Recommendation', Recommendation);
        });
        inject(function ($controller) {
            scope = {};
            FindTvAndMoviesCtrl = $controller('FindTvAndMoviesCtrl', {
                $scope: scope
            });
        });
    });

    it('should query for recommendations', function () {
        expect(scope.recommendations).toBe('recs');
        expect(Recommendation.query).toHaveBeenCalledWith({sessionId: 0});
    });
});